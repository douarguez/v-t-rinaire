<script setup>
import { ref } from 'vue'
import { useClientStore } from '@/stores/useClientStore'
import ModalGeneriqueFacture from '@/components/ModalGeneriqueFacture.vue'
import { genererFacturePDF } from '@/utils/pdf'
import { envoyerFactureEmail } from '@/utils/email'
import { useFactureStore } from '@/stores/useFactureStore'


const clientStore = useClientStore()
const factureStore = useFactureStore()


const showModal = ref(false)
const clientSelectionne = ref(null)
const factureCreee = ref(null)

// Toast control
const showToast = ref(false)
const toastMessage = ref('')

const clients = clientStore.clients

const genererFacture = () => {
  if (!clientSelectionne.value) return

  const total = (clientSelectionne.value.interventions || []).reduce((sum, i) => sum + i.montant, 0)
  factureCreee.value = {
    numero: 'F' + Math.floor(Math.random() * 1000),
    client: clientSelectionne.value.nom + ' ' + clientSelectionne.value.prenom,
    date: new Date().toISOString().split('T')[0],
    total: total.toFixed(5),
    statut: 'En attente'
  }
  showModal.value = true
}

const validerFacture = () => {
  factureCreee.value.statut = 'Payée'

  // ✅ Ajouter dans le store global
  factureStore.ajouterFacture(factureCreee.value)

  showModal.value = false

  // Toast
  toastMessage.value = `Facture ${factureCreee.value.numero} validée avec succès !`
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 3000)
}


const genererPDF = () => genererFacturePDF(factureCreee.value)
const envoyerEmail = () => envoyerFactureEmail(factureCreee.value)
</script>

<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-6">Créer une Facture</h2>

    <v-autocomplete
      v-model="clientSelectionne"
      :items="clients"
      item-title="nom"
      item-value="id"
      label="Sélectionner un client"
      return-object
      class="mb-4"
      clearable
    />

    <v-card v-if="clientSelectionne" class="pa-4 mb-4 elevation-2 rounded-xl">
      <p><strong>Client :</strong> {{ clientSelectionne.nom }} {{ clientSelectionne.prenom }}</p>
      <p><strong>Email :</strong> {{ clientSelectionne.email }}</p>
      <p><strong>Adresse :</strong> {{ clientSelectionne.adresse }}</p>

      <v-divider class="my-2"></v-divider>

      <p class="text-subtitle-1 font-weight-bold mb-2">Interventions :</p>
      <v-simple-table dense>
        <thead>
          <tr>
            <th>Description</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, index) in (clientSelectionne.interventions || [])" :key="index">
            <td>{{ i.description }}</td>
            <td>{{ i.montant }} TND</td>
          </tr>
        </tbody>
      </v-simple-table>

      <v-divider class="my-4" />
      <v-btn color="success" @click="genererFacture">Générer Facture</v-btn>
    </v-card>

    <ModalGeneriqueFacture
      v-model="showModal"
      :title="'Facture générée'"
      :content="factureCreee"
      @valider="validerFacture"
      @pdf="genererPDF"
      @email="envoyerEmail"
    />

    <!-- Toast notification -->
    <v-snackbar v-model="showToast" :timeout="3000" top right>
      {{ toastMessage }}
      <template #action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="showToast = false">
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>
