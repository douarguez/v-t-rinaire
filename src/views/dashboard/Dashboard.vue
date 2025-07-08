<template>
  <v-container fluid class="pa-6 background-page">
    <h2 class="text-h5 font-weight-medium mb-6 text-title">Bienvenue, Dr Ahmad</h2>

    <!-- Cartes de statistiques -->
    <v-row dense>
      <v-col cols="12" md="4" v-for="card in stats" :key="card.title">
        <v-card class="card-soft">
          <h4 class="mb-2 text-subtle font-light">{{ card.title }}</h4>
          <h2 class="text-title font-weight-light">{{ card.value }}</h2>
        </v-card>
      </v-col>
    </v-row>

    <!-- Bloc rendez-vous & revenu -->
    <v-row dense class="mt-6">
      <v-col cols="12" md="6">
        <v-card class="card-soft">
          <h4 class="mb-4 text-title font-weight-medium">Rendez-vous du jour</h4>
          <v-list dense>
            <v-list-item v-for="rdv in appointments" :key="rdv.time">
              <v-list-item-content>
                <v-list-item-title class="text-subtle font-light">
                  {{ rdv.time }} – {{ rdv.petName }} ({{ rdv.owner }})
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="card-soft text-center">
          <h4 class="mb-2 text-title font-weight-medium">Revenu du jour</h4>
          <h1 class="display-2 text-title font-weight-light">{{ revenue }} DT</h1>
          <p class="text-muted text-caption">Consultations et prescriptions</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Graphique -->
    <v-card class="card-soft mt-8">
      <DashboardChart />
    </v-card>

    <!-- Tableau revenu mensuel -->
    <v-card class="card-soft mt-8">
      <h4 class="mb-4 text-title font-weight-medium">Revenu mensuel</h4>
      <v-table>
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
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import DashboardChart from '@/components/DashboardChart.vue'

const stats = ref([
  { title: 'Animaux enregistrés', value: 120 },
  { title: 'Stock faible', value: 3 },
  { title: 'Factures non payées', value: 5 },
])

const appointments = ref([
  { time: '09:00', petName: 'Bella', owner: 'Mme Saidi' },
  { time: '10:15', petName: 'Max', owner: 'Mr Kacem' },
  { time: '14:00', petName: 'Simo', owner: 'Mme Lilia' },
])

const revenue = ref(1100)

const monthlyRevenue = ref([
  { month: 'Janvier', consultations: 750, medicaments: 320, total: 1070 },
  { month: 'Février', consultations: 690, medicaments: 280, total: 970 },
  { month: 'Mars', consultations: 820, medicaments: 390, total: 1210 },
  { month: 'Avril', consultations: 910, medicaments: 410, total: 1320 },
  { month: 'Mai', consultations: 1050, medicaments: 460, total: 1510 },
])
</script>

<style scoped>
.background-page {
  background-color: #f5f7fa;
  min-height: 100vh;
}

.card-soft {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.text-title {
  color: #2c3e50;
}

.text-subtle {
  color: #7f8c8d;
}
</style>
