<template>
  <main>
    <!-- S: Header -->
    <header class="jumbotron">
      <div class="container d-flex justify-content-between align-items-center">
        <div>
          <h1 class="display-4" v-if="spot.spot">{{ spot.spot.name }}</h1>
          <span class="text-muted" v-if="spot.spot">{{
            spot.spot.address
          }}</span>
        </div>
        <form @submit.prevent="store()">
          <button class="btn btn-primary">Register Vaccination</button>
        </form>
      </div>
    </header>
    <!-- E: Header -->

    <div class="container">
      <div class="alert alert-danger" v-if="fail">{{ fail.message }}</div>

      <form @change="updateQueue()">
        <div class="row mb-6">
          <div class="col-md-4">
            <div class="form-group">
              <label for="vaccination-date">Set your vaccination date</label>
              <div class="d-flex">
                <input
                  type="date"
                  class="form-control w-100 mr-4"
                  id="vaccination-date"
                  v-model="form.date"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="badge bg-primary text-white mb-3" v-if="form.date">
        Result Queue in {{ form.date }}
      </div>

      <div class="row mb-5" v-if="queue.Queuesession">
        <!-- S: Session 2 -->
        <div
          class="col-md-4"
          v-for="(session, sessionIndex) in queue.Queuesession"
          :key="sessionIndex"
        >
          <div class="card card-default">
            <div class="card-body">
              <div
                class="d-flex align-items-center justify-content-between mb-3"
              >
                <h4>Session {{ sessionIndex + 1 }}</h4>
              </div>
              <div>
                <div class="row">
                  <div
                    class="col-4 mb-4"
                    v-for="(status, index) in session"
                    :key="index"
                  >
                    <div
                      :class="{
                        slot: true || status == 'empty',
                        filled: status == 'filled',
                        'bg-primary text-white': status == 'me',
                      }"
                    >
                      #{{ index + sessionIndex * 5 + 1 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- E: Session 2 -->
      </div>
    </div>
  </main>

  <!-- S: Footer -->
  <footer>
    <div class="container">
      <div class="text-center py-4 text-muted">
        Copyright &copy; 2023 - Web Tech ID
      </div>
    </div>
  </footer>
  <!-- E: Footer -->
</template>

<script>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  data() {
    return {
      spot: [],
      form: {
        date: "",
        spot_id: "",
      },
      route: useRoute(),
      router: useRouter(),
      token: localStorage.getItem("token"),
      fail: "",
      queue: {
        status: [],
        total: 15,
        filled: "",
        myQueue: "",
        Queuesession: [],
      },
    };
  },
  mounted() {
    this.getSpot();
    this.currentDate();
  },
  methods: {
    async getSpot() {
      console.log(this.form.date);
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/spots/${this.route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
          params: this.form,
        }
      );
      this.spot = response.data;
      this.form.spot_id = response.data.spot.id;
      this.queue.filled = response.data.vaccinations_count;
      this.queue.myQueue = this.queue.filled + 1;
      this.generateQueue();
    },
    async store() {
      await axios
        .post("http://127.0.0.1:8000/api/v1/vaccinations", this.form, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          localStorage.setItem("success", response.data.message);
        })
        .then(() => {
          this.router.push({
            name: "dashboard.index",
          });
        })
        .catch((err) => {
          this.fail = err.response.data;
        });
    },
    generateQueue() {
      let sessionCount = Math.ceil(this.queue.total / 5);

      for (let i = 0; i < sessionCount; i++) {
        let session = [];
        for (let j = 0; j < 5; j++) {
          let queueIndex = i * 5 + j;
          if (queueIndex < this.queue.filled) {
            session.push("filled");
          } else if (queueIndex === this.queue.myQueue - 1) {
            session.push("me");
          } else {
            session.push("empty");
          }
        }
        this.queue.Queuesession.push(session);
      }
    },
    updateQueue() {
      this.queue.Queuesession.length = 0;
      this.getSpot();
    },

    currentDate() {
      let currentDate = new Date();
      let year = currentDate.getFullYear().toString();
      let month = String(currentDate.getMonth() + 1).padStart(2, "0");
      let day = String(currentDate.getDate()).padStart(2, "0");
      this.form.date = `${year}-${month}-${day}`;
    },
  },
};
</script>
