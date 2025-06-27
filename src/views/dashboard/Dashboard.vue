<template>
  <div class="container-fluid">
    <!-- Message de bienvenue -->
    <h2 class="mb-4"> Bonjour docteur Ahmad </h2>

    <!-- Statistiques principales -->
    <div class="row mb-4">
      <div class="col-md-4" v-for="(card, index) in stats" :key="card.title">
        <CCard :class="card.color">
          <CCardBody class="text-center text-white">
            <h5>{{ card.title }}</h5>
            <h2>{{ card.value }}</h2>
          </CCardBody>
        </CCard>
      </div>
    </div>

    <!-- Planification + Revenus -->
    <div class="row">
      <!-- Bloc rendez-vous -->
      <div class="col-md-6">
        <CCard class="mb-4">
          <CCardHeader class="bg-info text-white">
            Rendez-vous d’aujourd’hui
          </CCardHeader>
          <CCardBody class="bg-light">
            <ul class="list-group">
              <li
                class="list-group-item d-flex align-items-center"
                v-for="rdv in appointments"
                :key="rdv.time"
              >
                🐾&nbsp; <strong class="me-2">{{ rdv.time }}</strong>
                — {{ rdv.petName }} ({{ rdv.owner }})
              </li>
            </ul>
          </CCardBody>
        </CCard>
      </div>

      <!-- Bloc revenu -->
      <div class="col-md-6">
        <CCard class="mb-4">
          <CCardHeader class="bg-primary text-white">
            Revenu total
          </CCardHeader>
          <CCardBody class="text-center bg-light">
            <h1 class="text-primary display-4">{{ revenue }} DT</h1>
            <p class="text-muted">Aujourd’hui</p>
          </CCardBody>
        </CCard>
      </div>
    </div>
  </div>
  <CCard class="mb-4">
  <CCardBody>
    <DashboardChart />
  </CCardBody>
</CCard>
<CCard class="mb-4">
  <CCardHeader class="bg-success text-white">
    Revenu mensuel (DT)
  </CCardHeader>
  <CCardBody class="bg-light">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Mois</th>
          <th>Consultations</th>
          <th>Médicaments</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in monthlyRevenue" :key="line.month">
          <td>{{ line.month }}</td>
          <td>{{ line.consultations }}</td>
          <td>{{ line.medicaments }}</td>
          <td><strong>{{ line.total }}</strong></td>
        </tr>
      </tbody>
    </table>
  </CCardBody>
</CCard>
</template>

<script setup>


import DashboardChart from '@/components/DashboardChart.vue'

import { ref } from 'vue'

// Cartes de statistiques principales
const stats = ref([
  { title: 'Animaux enregistrés', value: 120, color: 'bg-success' },
  { title: 'Médicaments en stock faible', value: 3, color: 'bg-warning' },
  { title: 'Factures non payées', value: 5, color: 'bg-danger' },
])

// Rendez-vous simulés du jour
const appointments = ref([
  { time: '09:00', petName: 'Bella', owner: 'Mme Saidi' },
  { time: '10:15', petName: 'Max', owner: 'Mr Kacem' },
  { time: '14:00', petName: 'Simo', owner: 'Mme Lilia' },
])

// Revenu simulé
const revenue = ref(1100)

//revenue simulé
const monthlyRevenue = ref([
  { month: 'Janvier', consultations: 750, medicaments: 320, total: 1070 },
  { month: 'Février', consultations: 690, medicaments: 280, total: 970 },
  { month: 'Mars', consultations: 820, medicaments: 390, total: 1210 },
  { month: 'Avril', consultations: 910, medicaments: 410, total: 1320 },
  { month: 'Mai', consultations: 1050, medicaments: 460, total: 1510 },
])
</script>