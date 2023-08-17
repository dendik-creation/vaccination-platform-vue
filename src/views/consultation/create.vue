<template>
  <main>
    <!-- S: Header -->
    <header class="jumbotron">
      <div class="container">
        <h1 class="display-4">Request Consultation</h1>
      </div>
    </header>
    <!-- E: Header -->

    <div class="container">
      <form @submit.prevent="store()">
        <div class="row mb-4">
          <div class="col-md-6">
            <div class="form-group">
              <div class="d-flex align-items-center mb-3">
                <label for="disease-history" class="mr-3 mb-0"
                  >Do you have disease history ?</label
                >
                <select class="form-control-sm" id="selectHistory">
                  <option value="yes">Yes, I have</option>
                  <option value="no">No</option>
                </select>
              </div>
              <textarea
                id="disease-history"
                v-model="form.disease_history"
                class="form-control"
                cols="30"
                rows="10"
                placeholder="Describe your disease history"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-6">
            <div class="form-group">
              <div class="d-flex align-items-center mb-3">
                <label for="current-symptoms" class="mr-3 mb-0"
                  >Do you have symptoms now ?</label
                >
                <select class="form-control-sm" id="selectSymptoms">
                  <option value="yes">Yes, I have</option>
                  <option value="no">No</option>
                </select>
              </div>
              <textarea
                id="current-symptoms"
                v-model="form.current_symptoms"
                class="form-control"
                cols="30"
                rows="10"
                placeholder="Describe your current symptoms"
              ></textarea>
            </div>
          </div>
        </div>

        <button class="btn btn-primary">Send Request</button>
      </form>
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
import { useRouter } from "vue-router";
import { BASE_URL } from "../../components/base_url.vue";
export default {
  data() {
    return {
      form: {
        disease_history: "",
        current_symptoms: "",
      },
      token: localStorage.getItem("token"),
      router: useRouter(),
    };
  },
  mounted() {
    this.checkForm();
  },
  methods: {
    checkForm() {
      var history = document.getElementById("disease-history");
      var symptoms = document.getElementById("current-symptoms");
      var selectHistory = document.getElementById("selectHistory");
      var selectSymptoms = document.getElementById("selectSymptoms");

      selectHistory.addEventListener("change", () => {
        if (selectHistory.value == "yes") {
          history.style.display = "block";
        }
        if (selectHistory.value == "no") {
          history.style.display = "none";
        }
      });
      selectSymptoms.addEventListener("change", () => {
        if (selectSymptoms.value == "yes") {
          symptoms.style.display = "block";
        }
        if (selectSymptoms.value == "no") {
          symptoms.style.display = "none";
        }
      });
    },
    async store() {
      await axios
        .post(`${BASE_URL}/v1/consultations`, this.form, {
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
        .catch((err) => console.log(err));
    },
  },
};
</script>
