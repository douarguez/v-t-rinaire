


<!-- ✅ Page : FacturesClient.vue -->
<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-6">Historique des factures du client</h2>

    <v-card v-if="client">
      <v-card-title>
        {{ client.nom }} {{ client.prenom }} - {{ client.email }}
      </v-card-title>
    </v-card>

    <v-data-table
      :items="facturesClient"
      :headers="headers"
      class="mt-4"
    >
      <template #item.actions="{ item }">
        <v-btn icon color="blue" @click="imprimerFacture(item)">
          <v-icon>mdi-printer</v-icon>
        </v-btn>
        <v-btn icon color="green" @click="envoyerParEmail(item)">
          <v-icon>mdi-email-send-outline</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/useClientStore'
import { useFactureStore } from '@/stores/useFactureStore'
import { genererFacturePDF } from '@/utils/pdf'
import { envoyerFactureEmail } from '@/utils/email'

const route = useRoute()
const clientStore = useClientStore()
const factureStore = useFactureStore()

const clientId = parseInt(route.params.id)
const client = computed(() => clientStore.clients.find(c => c.id === clientId))
const facturesClient = computed(() =>
  factureStore.factures.filter(f => f.clientId === clientId)
)

const headers = [
  { text: 'Numéro', value: 'numero' },
  { text: 'Date', value: 'date' },
  { text: 'Total', value: 'total' },
  { text: 'Statut', value: 'statut' },
  { text: 'Actions', value: 'actions', sortable: false },
]

function imprimerFacture(facture) {
  genererFacturePDF(facture)
}

function envoyerParEmail(facture) {
  envoyerFactureEmail(facture)
}
</script>
