<template>
  <div>
    <h5 class="mb-3">Répartition des types d’animaux</h5>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Chiens', 'Chats', 'Oiseaux', 'Lapins'],
  datasets: [
    {
      label: 'Nombre',
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
      data: [48, 32, 15, 6],
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<style scoped>
div {
  height: 300px;
}
</style>