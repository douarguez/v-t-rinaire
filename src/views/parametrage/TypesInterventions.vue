<template>
  <v-container class="pa-6 background-page">
    <h2 class="text-h5 font-weight-medium mb-4">⚙️ Types d'interventions</h2>

    <!-- Bouton ajout -->
    <v-btn color="primary" @click="ouvrirAjout" prepend-icon="mdi-plus" class="mb-4">
      Nouveau type
    </v-btn>

    <!-- Tableau -->
    <v-data-table
      :headers="headers"
      :items="types"
      :items-per-page="10"
      class="elevation-0 table-soft"
      :no-data-text="'Aucun type défini'"
    >
      <!-- Icône -->
      <template #item.icone="{ item }">
        <span>{{ item.icone || '-' }}</span>
      </template>

      <!-- Durée -->
      <template #item.duree="{ item }">
        <span>{{ formatDuree(item.duree) }}</span>
      </template>

      <!-- Groupe -->
      <template #item.groupe="{ item }">
        <span>{{ item.groupe || '-' }}</span>
      </template>

      <!-- Couleur -->
      <template #item.couleur="{ item }">
        <div :style="{ backgroundColor: item.couleur, width: '24px', height: '24px', borderRadius: '50%' }"></div>
      </template>

      <!-- Traitement -->
      <template #item.traitement="{ item }">
        <v-chip :color="item.traitement ? 'success' : 'default'" variant="tonal" size="small">
          {{ item.traitement ? 'Oui' : 'Non' }}
        </v-chip>
      </template>

      <!-- Anesthésie -->
      <template #item.requiert_anesthesie="{ item }">
        <v-chip :color="item.requiert_anesthesie ? 'error' : 'default'" variant="tonal" size="small">
          {{ item.requiert_anesthesie ? 'Oui' : 'Non' }}
        </v-chip>
      </template>

      <!-- Actions -->
      <template #item.actions="{ item }">
        <v-btn icon variant="text" @click="ouvrirEdition(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon variant="text" color="error" @click="supprimer(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Formulaire drawer -->
    <v-dialog v-model="showDrawer" width="450">
      <v-card>
        <v-card-title>{{ modeEdition ? 'Modifier' : 'Ajouter' }} un type</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="sauvegarder">
            <v-text-field v-model="form.nom" label="Nom du type" required />
            <v-text-field v-model="form.icone" label="Icône (emoji)" />
            <v-text-field v-model="form.duree" label="Durée estimée (min)" type="number" />
            <v-color-picker v-model="form.couleur" hide-canvas flat />
            <v-select
              v-model="form.groupe"
              :items="['Préventif', 'Curatif', 'Urgence']"
              label="Groupe"
              required
            />
            <v-switch v-model="form.traitement" label="Requiert traitement ?" />
            <v-switch v-model="form.requiert_anesthesie" label="Requiert anesthésie ?" />
            <v-textarea v-model="form.notes" label="Notes / consignes" auto-grow />

            <v-btn type="submit" color="primary" class="mt-4">Valider</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useTypeInterventionStore } from '@/stores/useTypeInterventionStore'

const store = useTypeInterventionStore()
const types = store.types

const headers = [
  { text: 'Nom', value: 'nom' },
  { text: 'Icône', value: 'icone' },
  { text: 'Durée', value: 'duree' },
  { text: 'Groupe', value: 'groupe' },
  { text: 'Couleur', value: 'couleur', sortable: false },
  { text: 'Traitement ?', value: 'traitement', sortable: false },
  { text: 'Anesthésie ?', value: 'requiert_anesthesie', sortable: false },
  { text: '', value: 'actions', sortable: false }
]

const showDrawer = ref(false)
const modeEdition = ref(false)
const form = ref({
  id: null,
  nom: '',
  icone: '',
  duree: 30,
  couleur: '#74c69d',
  traitement: false,
  groupe: 'Préventif',
  requiert_anesthesie: false,
  notes: ''
})

function ouvrirAjout() {
  form.value = {
    id: null,
    nom: '',
    icone: '',
    duree: 30,
    couleur: '#74c69d',
    traitement: false,
    groupe: 'Préventif',
    requiert_anesthesie: false,
    notes: ''
  }
  modeEdition.value = false
  showDrawer.value = true
}

function ouvrirEdition(item) {
  form.value = { ...item }
  modeEdition.value = true
  showDrawer.value = true
}

function sauvegarder() {
  if (modeEdition.value) {
    store.modifier(form.value.id, form.value)
  } else {
    store.ajouter({ ...form.value, id: Date.now() })
  }
  showDrawer.value = false
}

function supprimer(id) {
  store.supprimer(id)
}

function formatDuree(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h > 0 ? `${h}h` : ''}${m.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.background-page {
  background-color: #f5f7fa;
  min-height: 100vh;
}
.table-soft {
  font-size: 14px;
  border-radius: 12px;
}
</style>
