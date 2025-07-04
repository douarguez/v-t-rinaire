// ✅ Page : FacturesParClient.vue
<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-6">Clients ayant des factures</h2>

    <v-data-table
      :items="clientsAvecFactures"
      :headers="headers"
      item-value="id"
      class="elevation-1"
    >
      <template #item.actions="{ item }">
        <v-btn icon color="primary" @click="voirFactures(item.id)">
          <v-icon>mdi-file-document-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClientStore } from '@/stores/useClientStore'
import { useFactureStore } from '@/stores/useFactureStore'

const clientStore = useClientStore()
const factureStore = useFactureStore()
const router = useRouter()

const clients = computed(() => clientStore.clients)
const factures = computed(() => factureStore.factures)

const clientsAvecFactures = computed(() => {
  const idsFactures = new Set(factures.value.map(f => f.clientId))
  return clients.value.filter(c => idsFactures.has(c.id))
})

const headers = [
  { text: 'Nom', value: 'nom' },
  { text: 'Prénom', value: 'prenom' },
  { text: 'Actions', value: 'actions', sortable: false },
]

function voirFactures(clientId) {
  router.push({ name: 'FacturesClient', params: { id: clientId } })
}
</script>