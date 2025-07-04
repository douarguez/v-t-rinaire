<template>
  <v-simple-table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.value">{{ header.text }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.numero">
        <td>{{ item.numero }}</td>
        <td>{{ item.client }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.total }} TND</td>
        <td>{{ item.statut }}</td>
        <td>
          <v-btn small color="primary" @click="$emit('action-clicked', 'details', item)">
            Détails
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script setup>
defineProps({
  headers: Array,
  items: Array,
})
</script>
