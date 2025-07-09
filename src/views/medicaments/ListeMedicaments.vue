<template>
  <v-container class="pa-6 background-page">
    <div class="header">
      <h2 class="text-h5 font-weight-medium text-title">💊 Liste des Médicaments</h2>
      <v-btn color="primary" @click="ouvrirAjout" prepend-icon="mdi-plus">Ajouter</v-btn>
    </div>

    <!-- Filtres -->
    <v-row class="mb-6" dense>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="Rechercher un médicament"
          variant="outlined"
          density="compact"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="selectedStatus"
          :items="statusOptions"
          label="Filtrer par statut de stock"
          variant="outlined"
          density="compact"
          clearable
        />
      </v-col>
    </v-row>

    <!-- Tableau -->
    <v-data-table
      :headers="headers"
      :items="medicamentsEnrichis"
      :items-per-page="10"
      class="elevation-0 table-soft"
      :no-data-text="'Aucun médicament trouvé'"
    >
      <template #item.status="{ item }">
        <v-chip :color="getStatusColor(item)" variant="tonal" size="small">
          {{ item.status }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <v-btn variant="tonal" size="small" color="primary" class="me-2">
          COMMANDER
        </v-btn>
        <v-btn icon variant="text" color="primary" @click="ouvrirEdition(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon variant="text" color="error" @click="ouvrirSuppression(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- Formulaire -->
    <ModalFormulaireMedicaments
      v-if="showDrawer"
      :title="modeEdition ? 'Modifier un médicament' : 'Ajouter un médicament'"
      :fields="formFields"
      :initialValues="selectedMedicament"
      @saved="sauvegarderMedicament"
      @close="fermerDrawer"
    />

    <!-- Suppression -->
    <SuppressionPopup
      v-if="showPopup"
      :nom="selectedMedicament.nom"
      @confirm="confirmerSuppression"
      @close="showPopup = false"
    />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import ModalFormulaireMedicaments from '@/components/ModalFormulaireMedicaments.vue'
import SuppressionPopup from '@/components/SuppressionPopup.vue'

const medicaments = ref([
  {
    id: 1,
    nom: 'Paracétamol',
    quantite: 10,
    seuil: 5,
    prix_achat: 0.5,
    prix_vente: 1.2,
    expiration: '2025-10-01'
  },
  {
    id: 2,
    nom: 'Ibuprofène',
    quantite: 4,
    seuil: 6,
    prix_achat: 1.0,
    prix_vente: 2.2,
    expiration: '2024-11-01'
  }
])

const headers = [
  { title: 'Nom', value: 'nom' },
  { title: 'Quantité', value: 'quantite' },
  { title: 'Seuil', value: 'seuil' },
  { title: 'Prix Achat', value: 'prix_achat' },
  { title: 'Prix Vente', value: 'prix_vente' },
  { title: 'Expiration', value: 'expiration' },
  { title: 'Statut de stock', value: 'status', sortable: false },
  { title: '', value: 'actions', sortable: false },
]

const formFields = [
  { key: 'nom', label: 'Nom du médicament', type: 'text', required: true },
  { key: 'quantite', label: 'Quantité', type: 'number', required: true },
  { key: 'seuil', label: 'Seuil d\'alerte', type: 'number', required: true },
  { key: 'prix_achat', label: 'Prix d\'achat', type: 'number', required: true },
  { key: 'prix_vente', label: 'Prix de vente', type: 'number', required: true },
  { key: 'expiration', label: 'Date d\'expiration', type: 'text', required: true }
]

const search = ref('')
const selectedStatus = ref(null)
const statusOptions = ['Critique', 'À surveiller', 'OK']

function getStatusText(item) {
  if (item.quantite < item.seuil) return 'Critique'
  if (item.quantite <= item.seuil + 5) return 'À surveiller'
  return 'OK'
}

function getStatusColor(item) {
  if (item.quantite < item.seuil) return 'error'
  if (item.quantite <= item.seuil + 5) return 'warning'
  return 'success'
}

const filteredMedicaments = computed(() =>
  medicaments.value.filter(m => {
    const matchNom = m.nom.toLowerCase().includes(search.value.toLowerCase())
    const matchStatus = selectedStatus.value
      ? getStatusText(m) === selectedStatus.value
      : true
    return matchNom && matchStatus
  })
)

const medicamentsEnrichis = computed(() =>
  filteredMedicaments.value.map(medoc => ({
    ...medoc,
    status: getStatusText(medoc)
  }))
)

const showDrawer = ref(false)
const showPopup = ref(false)
const modeEdition = ref(false)
const selectedMedicament = ref({})

function ouvrirAjout() {
  selectedMedicament.value = {}
  modeEdition.value = false
  showDrawer.value = true
}

function ouvrirEdition(medoc) {
  selectedMedicament.value = { ...medoc }
  modeEdition.value = true
  showDrawer.value = true
}

function sauvegarderMedicament(data) {
  if (modeEdition.value) {
    const index = medicaments.value.findIndex(m => m.id === data.id)
    if (index !== -1) medicaments.value[index] = { ...data }
  } else {
    medicaments.value.push({ ...data, id: Date.now() })
  }
  showDrawer.value = false
}

function fermerDrawer() {
  showDrawer.value = false
}

function ouvrirSuppression(medoc) {
  selectedMedicament.value = { ...medoc }
  showPopup.value = true
}

function confirmerSuppression() {
  medicaments.value = medicaments.value.filter(m => m.id !== selectedMedicament.value.id)
  showPopup.value = false
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
.text-title {
  color: #2c3e50;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.v-data-table tbody tr:hover {
  background-color: #f0f4f8;
}
.v-data-table th {
  font-size: 14px;
  font-weight: 500;
  color: #2c3e50;
  padding: 12px;
  border-bottom: 1px solid #dfe6e9;
}
</style>
