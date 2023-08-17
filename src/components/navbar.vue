<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'dashboard.index' }"
        >Vacination Platform</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link active" href="#" v-if="name">{{ name }}</a>
          </li>
          <li class="nav-item" v-if="token">
            <form @submit.prevent="confirmLogout()">
              <button class="btn btn-danger rounded">Logout</button>
            </form>
          </li>
          <li class="nav-item" v-if="!token">
            <a href="#" class="nav-link active">Login Page</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      router: useRouter(),
      name: localStorage.getItem("society_name"),
      token: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
  methods: {
    confirmLogout() {
      let check = confirm("Logout Now ?");
      if (check) {
        this.logout();
      }
    },
    async logout() {
      await axios
        .post(
          "http://127.0.0.1:8000/api/v1/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((res) => {
          localStorage.setItem("success", res.data.message);
          localStorage.removeItem("society_name");
          localStorage.removeItem("token");
          localStorage.removeItem("regional");
        })
        .then(() => {
          this.router
            .push({
              name: "login.index",
            })
            .then(() => {
              window.location.reload();
            });
        })
        .catch((err) => err.response.data);
    },
  },
};
</script>
