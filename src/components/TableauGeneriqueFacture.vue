<template>
  <v-simple-table v-if="items.length > 0">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.value" class="table-header">
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in items"
        :key="item.id || item.numero"
        @click="handleRowClick(item)"
        :class="{ 'error-row': hasError(item) }"
      >
        <td v-for="header in headers" :key="header.value + (item.id || item.numero)">
          {{ item[header.key] || 'N/A' }}
        </td>
      </tr>
    </tbody>
    <div v-else class="no-data">Aucune donnée disponible</div>
  </v-simple-table>
</template>

<script setup>
defineProps({
  headers: { type: Array, required: true },
  items: { type: Array, required: true },
})

const emit = defineEmits(['ligneClick'])

function handleRowClick(item) {
  emit('ligneClick', item)
}

function hasError(item) {
  // Exemple : marque une ligne en rouge si un champ est manquant ou un statut est "Erreur"
  return !item.id && !item.numero || item.statut === 'Erreur'
}
</script>

<style scoped>
.no-data {
  text-align: center;
  padding: 1rem;
  color: #666;
}

:deep(.v-simple-table) {
  border: 1px solid #eee;
}

:deep(.v-simple-table tr) {
  background-color: #fff; /* Réinitialise la couleur de fond */
}

:deep(.v-simple-table tr:hover) {
  background-color: #f9fbff;
}

.error-row {
  background-color: #ffebee !important; /* Rouge clair pour indiquer une erreur, ajustable */
  color: #c62828; /* Texte rouge pour contraste */
}

.table-header {
  background-color: #f5f5f5; /* En-tête gris clair */
  font-weight: 500;
}
</style>