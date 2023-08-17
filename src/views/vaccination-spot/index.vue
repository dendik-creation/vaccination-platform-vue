<template>
  <main>
    <!-- S: Header -->
    <header class="jumbotron">
      <div class="container">
        <h1 class="display-4" v-if="vacKe != ''">Second Vaccination</h1>
        <h1 class="display-4" v-else>First Vaccination</h1>
      </div>
    </header>
    <!-- E: Header -->

    <div class="container mb-5">
      <div class="section-header mb-4">
        <h4 class="section-title text-muted font-weight-normal">
          List Vaccination Spots in {{ regional }}
        </h4>
      </div>

      <div class="section-body" v-if="vacKe == ''">
        <article
          :class="{
            spot: true,
            unavailable: spot.serve == 2,
          }"
          v-for="spot in spots"
          :key="spot.id"
        >
          <div class="row">
            <div class="col-5">
              <router-link
                v-if="spot.serve != 2"
                :to="{ name: 'vaccination-spot.show', params: { id: spot.id } }"
              >
                <h5 class="text-primary">{{ spot.name }}</h5>
              </router-link>
              <h5 class="text-primary" v-else>{{ spot.name }}</h5>
              <span class="text-muted">{{ spot.address }}</span>
            </div>
            <div class="col-4">
              <h5>Available vaccines</h5>
              <span
                class="text-muted"
                v-for="vaccine in spot.available_vaccines"
                :key="vaccine.id"
                >{{ vaccine.name }},
              </span>
            </div>
            <div class="col-3">
              <h5>Serve</h5>
              <span class="text-muted" v-if="spot.serve == 1"
                >Only first vaccination</span
              >
              <span class="text-muted" v-if="spot.serve == 2"
                >Only second vaccination</span
              >
              <span class="text-muted" v-if="spot.serve == 3">Both</span>
            </div>
          </div>
        </article>
      </div>
      <div class="section-body" v-else>
        <article
          :class="{
            spot: true,
            unavailable: spot.serve == 1,
          }"
          v-for="spot in spots"
          :key="spot.id"
        >
          <div class="row">
            <div class="col-5">
              <router-link
                v-if="spot.serve != 1"
                :to="{ name: 'vaccination-spot.show', params: { id: spot.id } }"
              >
                <h5 class="text-primary">{{ spot.name }}</h5>
              </router-link>
              <h5 class="text-primary" v-else>{{ spot.name }}</h5>
              <span class="text-muted">{{ spot.address }}</span>
            </div>
            <div class="col-4">
              <h5>Available vaccines</h5>
              <span
                class="text-muted"
                v-for="vaccine in spot.available_vaccines"
                :key="vaccine.id"
                >{{ vaccine.name }},
              </span>
            </div>
            <div class="col-3">
              <h5>Serve</h5>
              <span class="text-muted" v-if="spot.serve == 1"
                >Only first vaccination</span
              >
              <span class="text-muted" v-if="spot.serve == 2"
                >Only second vaccination</span
              >
              <span class="text-muted" v-if="spot.serve == 3">Both</span>
            </div>
          </div>
        </article>
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
import { useRoute } from "vue-router";
import { BASE_URL } from "../../components/base_url.vue";
export default {
  data() {
    return {
      spots: [],
      token: localStorage.getItem("token"),
      route: useRoute(),
      vacKe: [],
      regional: localStorage.getItem("regional"),
    };
  },
  mounted() {
    this.getSpots(), this.getVaccke();
  },
  methods: {
    async getSpots() {
      const response = await axios.get(`${BASE_URL}/v1/spots`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.spots = response.data.spots;
    },
    async getVaccke() {
      const response = await axios.get(`${BASE_URL}/v1/vaccinations`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.vacKe = response.data.vaccinations.first.status;
    },
  },
};
</script>
