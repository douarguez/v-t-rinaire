<template>
  <v-container class="pa-6 background-page">
    <div class="page-header">
      <h2 class="text-h5 font-weight-medium">{{ total }} dossiers médicaux</h2>
      <v-btn color="primary" @click="ouvrirAjout" prepend-icon="mdi-plus">
        Ajouter un dossier
      </v-btn>
    </div>

    <div v-if="dossiers.length === 0" class="no-data">
      Aucun dossier médical défini. Ajoutez-en un !
    </div>

    <v-data-table
      v-else
      :headers="headers"
      :items="dossiers"
      :items-per-page="10"
      class="elevation-0 table-soft"
      :no-data-text="'Aucun dossier défini'"
    >
      <!-- Nom du patient -->
      <template #item.nom="{ item }">
        <span>{{ item.nom || '-' }}</span>
      </template>

      <!-- Date de naissance -->
      <template #item.date_naissance="{ item }">
        <span>{{ formatDate(item.date_naissance) }}</span>
      </template>

      <!-- Dernière consultation -->
      <template #item.derniere_consultation="{ item }">
        <span>{{ formatDate(item.derniere_consultation) || '-' }}</span>
      </template>

      <!-- Statut -->
      <template #item.statut="{ item }">
        <v-chip :color="item.statut === 'Actif' ? 'success' : 'warning'" variant="tonal" size="small">
          {{ item.statut || '-' }}
        </v-chip>
      </template>

      <!-- Allergies -->
      <template #item.allergies="{ item }">
        <span>{{ item.allergies || '-' }}</span>
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

    <v-dialog v-model="showDrawer" width="450">
      <v-card>
        <v-card-title>{{ modeEdition ? 'Modifier' : 'Ajouter' }} un dossier</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="sauvegarder">
            <v-text-field v-model="form.nom" label="Nom du patient" required />
            <v-text-field
              v-model="form.date_naissance"
              label="Date de naissance"
              type="date"
              required
            />
            <v-text-field
              v-model="form.derniere_consultation"
              label="Dernière consultation"
              type="date"
            />
            <v-select
              v-model="form.statut"
              :items="['Actif', 'Inactif']"
              label="Statut"
              required
            />
            <v-textarea v-model="form.allergies" label="Allergies" auto-grow />
            <v-textarea v-model="form.notes" label="Notes médicales" auto-grow />

            <v-btn type="submit" color="primary" class="mt-4">Valider</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMedicalRecordStore } from '@/stores/useMedicalRecordStore'

const store = useMedicalRecordStore()
const dossiers = store.dossiers

const total = computed(() => dossiers.length)

const headers = [
  { title: 'Nom du patient', value: 'nom' },
  { title: 'Date de naissance', value: 'date_naissance' },
  { title: 'Dernière consultation', value: 'derniere_consultation' },
  { title: 'Statut', value: 'statut', sortable: false },
  { title: 'Allergies', value: 'allergies' },
  { title: 'Actions', value: 'actions', sortable: false }
]

const showDrawer = ref(false)
const modeEdition = ref(false)
const form = ref({
  id: null,
  nom: '',
  date_naissance: '',
  derniere_consultation: '',
  statut: 'Actif',
  allergies: '',
  notes: ''
})

function ouvrirAjout() {
  form.value = {
    id: null,
    nom: '',
    date_naissance: '',
    derniere_consultation: '',
    statut: 'Actif',
    allergies: '',
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

function formatDate(date) {
  if (!date) return null
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
}
</script>

<style scoped>
.background-page {
  background-color: #f5f7fa;
  min-height: 100vh;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
h2 {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.3px;
  margin: 0;
}
.no-data {
  color: #666;
  text-align: center;
  padding: 1rem;
}
.table-soft {
  font-size: 14px;
  border-radius: 12px;
}
</style>