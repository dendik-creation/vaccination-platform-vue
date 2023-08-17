<template>
  <main>
    <!-- S: Header -->
    <header class="jumbotron">
      <div class="container">
        <h1 class="display-4">Dashboard</h1>
      </div>
    </header>
    <!-- E: Header -->

    <div class="container">
      <div class="alert alert-success text-center mb-5" v-if="success">
        {{ success }}
      </div>
      <!-- S: Consultation Section -->
      <section class="consultation-section mb-5">
        <div class="section-header mb-3">
          <h4 class="section-title text-muted">My Consultation</h4>
        </div>
        <div class="row">
          <!-- S: Link to Request Consultation -->
          <div class="col-md-4" v-if="consulStatus == ''">
            <div class="card card-default">
              <div class="card-header">
                <h5 class="mb-0">Consultation</h5>
              </div>
              <div class="card-body">
                <router-link :to="{ name: 'consultation.create' }"
                  >+ Request Consultation</router-link
                >
              </div>
            </div>
          </div>
          <!-- E: Link to Request Consultation -->

          <!-- S: Society Consultation Box (Pending) -->
          <div class="col-md-4" v-else>
            <div class="card card-default">
              <div class="card-header border-0">
                <h5 class="mb-0">Consultation</h5>
              </div>
              <div class="card-body p-0">
                <table class="table table-striped mb-0">
                  <tr>
                    <th>Status</th>
                    <td v-if="consultation.status">
                      <span
                        :class="{
                          badge: true,
                          'badge-info': consultation.status == 'pending',
                          'badge-success': consultation.status == 'accepted',
                          'badge-danger': consultation.status == 'declined',
                        }"
                        >{{ consultation.status }}</span
                      >
                    </td>
                    <td v-else class="text-muted">-</td>
                  </tr>
                  <tr>
                    <th>Disease History</th>
                    <td class="text-muted" v-if="consultation.disease_history">
                      {{ consultation.disease_history }}
                    </td>
                    <td v-else class="text-muted">-</td>
                  </tr>
                  <tr>
                    <th>Current Symptoms</th>
                    <td class="text-muted" v-if="consultation.current_symptoms">
                      {{ consultation.current_symptoms }}
                    </td>
                    <td v-else class="text-muted">-</td>
                  </tr>
                  <tr>
                    <th>Doctor Name</th>
                    <td class="text-muted" v-if="consultation.doctor">
                      {{ consultation.doctor.name }}
                    </td>
                    <td v-else class="text-muted">-</td>
                  </tr>
                  <tr>
                    <th>Doctor Notes</th>
                    <td class="text-muted" v-if="consultation.doctor_notes">
                      {{ consultation.doctor_notes }}
                    </td>
                    <td v-else class="text-muted">-</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <!-- E: Society Consultation Box (Pending) -->
        </div>
      </section>
      <!-- E: Consultation Section -->

      <!-- S: List Vaccination Section -->
      <section class="consultation-section mb-5">
        <div class="section-header mb-3">
          <h4 class="section-title text-muted">My Vaccinations</h4>
        </div>
        <div class="section-body">
          <div class="row mb-4">
            <!-- S: First Vaccination info -->
            <div class="col-md-12" v-if="consulStatus != 'accepted'">
              <div class="alert alert-warning">
                Your consultation must be approved by doctor to get the vaccine.
              </div>
            </div>
            <!-- E: First Vaccination info -->

            <!-- S: Link to Register First Vaccination -->
            <div class="col-md-4" v-if="vac1 == ''">
              <div class="card card-default">
                <div class="card-header border-0">
                  <h5 class="mb-0">First Vaccination</h5>
                </div>
                <div class="card-body">
                  <router-link :to="{ name: 'vaccination-spot.index' }"
                    >+ Register Vaccination</router-link
                  >
                </div>
              </div>
            </div>
            <!-- E: Link to Register First Vaccination -->

            <!-- S: First Vaccination Box (Registered) -->
            <div class="col-md-4" v-else>
              <div class="card card-default">
                <div class="card-header border-0">
                  <h5 class="mb-0">First Vaccination</h5>
                </div>
                <div class="card-body p-0">
                  <table class="table table-striped mb-0">
                    <tr>
                      <th>Status</th>
                      <td class="text-muted">
                        <span
                          :class="{
                            badge: true,
                            'badge-info': vaccination.first.status == 'pending',
                            'badge-success': vaccination.first.status == 'Done',
                            'badge-danger':
                              vaccination.first.status == 'declined',
                          }"
                          v-if="vaccination.first.status"
                          >Vaccinated</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td class="text-muted">
                        {{ vaccination.first.vaccination_date }}
                      </td>
                    </tr>
                    <tr>
                      <th>Spot</th>
                      <td class="text-muted">
                        {{ vaccination.first.spot.name }}
                      </td>
                    </tr>
                    <tr>
                      <th>Vaccine</th>
                      <td class="text-muted" v-if="vaccination.first.vaccine">
                        {{ vaccination.first.vaccine.name }}
                      </td>
                      <td v-else>-</td>
                    </tr>
                    <tr>
                      <th>Vaccinator</th>
                      <td
                        class="text-muted"
                        v-if="vaccination.first.vaccinator"
                      >
                        {{ vaccination.first.vaccinator.name }}
                      </td>
                      <td v-else>-</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <!-- S: First Vaccination Box (Registered) -->

            <!-- S: Link to Register First Vaccination -->
            <div class="col-md-4" v-if="vac2 == ''">
              <div class="card card-default">
                <div class="card-header border-0">
                  <h5 class="mb-0">Second Vaccination</h5>
                </div>
                <div class="card-body">
                  <router-link :to="{ name: 'vaccination-spot.index' }"
                    >+ Register Vaccination</router-link
                  >
                </div>
              </div>
            </div>
            <!-- E: Link to Register First Vaccination -->

            <!-- S: First Vaccination Box (Registered) -->
            <div class="col-md-4" v-else>
              <div class="card card-default">
                <div class="card-header border-0">
                  <h5 class="mb-0">Second Vaccination</h5>
                </div>
                <div class="card-body p-0">
                  <table class="table table-striped mb-0">
                    <tr>
                      <th>Status</th>
                      <td class="text-muted">
                        <span
                          :class="{
                            badge: true,
                            'badge-info':
                              vaccination.second.status == 'pending',
                            'badge-success':
                              vaccination.second.status == 'Done',
                            'badge-danger':
                              vaccination.second.status == 'declined',
                          }"
                          v-if="vaccination.second.status"
                          >Vaccinated</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <th>Date</th>
                      <td class="text-muted">
                        {{ vaccination.second.vaccination_date }}
                      </td>
                    </tr>
                    <tr>
                      <th>Spot</th>
                      <td class="text-muted">
                        {{ vaccination.second.spot.name }}
                      </td>
                    </tr>
                    <tr>
                      <th>Vaccine</th>
                      <td class="text-muted" v-if="vaccination.second.vaccine">
                        {{ vaccination.second.vaccine.name }}
                      </td>
                      <td v-else>-</td>
                    </tr>
                    <tr>
                      <th>Vaccinator</th>
                      <td
                        class="text-muted"
                        v-if="vaccination.second.vaccinator"
                      >
                        {{ vaccination.second.vaccinator.name }}
                      </td>
                      <td v-else>-</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <!-- S: First Vaccination Box (Registered) -->
          </div>
        </div>
      </section>
      <!-- E: List Vaccination Section -->
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
import { ref } from "vue";
export default {
  data() {
    return {
      consultation: ref([]),
      consulStatus: [],
      vaccination: [],
      vac1: [],
      vac2: [],
      token: localStorage.getItem("token"),
      success: localStorage.getItem("success"),
    };
  },
  mounted() {
    this.myConsultation();
    this.myVaccination();
    localStorage.removeItem("success");
  },
  methods: {
    async myConsultation() {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/consultations",
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      this.consultation = response.data.data.consultation;
      this.consulStatus = response.data.data.consultation.status;
    },
    async myVaccination() {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/vaccinations",
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      this.vaccination = response.data.vaccinations;
      this.vac1 = response.data.vaccinations.first.status;
      this.vac2 = response.data.vaccinations.second.status;
    },
  },
};
</script>
