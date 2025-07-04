<script setup>
import { useClientStore } from '@/stores/useClientStore'
import { useRouter } from 'vue-router'

const { clients } = useClientStore()
const router = useRouter()

function voirFactures(client) {
  router.push({ name: 'FacturesClient', params: { id: client.id } })
}
</script>

<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-4">Historique des Factures par Client</h2>

    <v-data-table
      :headers="[
        { text: 'Nom', value: 'nom' },
        { text: 'Prénom', value: 'prenom' },
        { text: 'Email', value: 'email' },
        { text: '', value: 'actions', sortable: false }
      ]"
      :items="clients"
      class="elevation-1"
    >
      <template #item.actions="{ item }">
        <v-btn color="primary" @click="voirFactures(item)">Voir Factures</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>
