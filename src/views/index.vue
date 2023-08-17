<template>
  <main>
    <!-- S: Header -->
    <header class="jumbotron">
      <div class="container text-center">
        <h1 class="display-4">Vaccination Platform</h1>
      </div>
    </header>
    <!-- E: Header -->

    <div class="container">
      <div class="alert alert-danger text-center" v-if="failLogin.message">
        {{ failLogin.message }}
      </div>
      <div class="alert alert-success text-center" v-if="success">
        {{ success }}
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form class="card card-default" @submit.prevent="store()">
            <div class="card-header">
              <h4 class="mb-0">Login</h4>
            </div>
            <div class="card-body">
              <div class="form-group row align-items-center">
                <div class="col-4 text-right">ID Card Number</div>
                <div class="col-8">
                  <input
                    type="text"
                    class="form-control"
                    v-model="credentials.id_card_number"
                  />
                </div>
              </div>
              <div class="form-group row align-items-center">
                <div class="col-4 text-right">Password</div>
                <div class="col-8">
                  <input
                    type="password"
                    class="form-control"
                    v-model="credentials.password"
                  />
                </div>
              </div>
              <div class="form-group row align-items-center mt-4">
                <div class="col-4"></div>
                <div class="col-8">
                  <button class="btn btn-primary">Login</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { BASE_URL } from "../components/base_url.vue";
export default {
  data() {
    return {
      credentials: {
        id_card_number: "",
        password: "",
      },
      router: useRouter(),
      failLogin: [],
      success: localStorage.getItem("success"),
    };
  },
  mounted() {
    localStorage.removeItem("success");
  },
  methods: {
    async store() {
      await axios
        .post(`${BASE_URL}/v1/auth/login`, this.credentials)
        .then((result) => {
          localStorage.setItem("token", result.data.token.plainTextToken);
          localStorage.setItem("regional", result.data.regional.district);
          localStorage.setItem("society_name", result.data.name);
        })
        .then(() => {
          this.router
            .push({
              name: "dashboard.index",
            })
            .then(() => {
              window.location.reload();
            });
        })
        .catch((err) => {
          this.failLogin = err.response.data;
        });
    },
  },
};
</script>
