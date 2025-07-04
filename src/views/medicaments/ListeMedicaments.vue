<template>
  <div class="page-container">
    <div class="header">
      <h2>💊 Liste des Médicaments</h2>
      <button class="btn-add" @click="ouvrirAjout">➕ Ajouter</button>
    </div>

    <!-- Tableau générique -->
    <TableauGenerique
      :colonnes="colonnes"
      :donnees="medicaments"
      @edit="ouvrirEdition"
      @delete="ouvrirSuppression"
    />

    <!-- Formulaire drawer -->
    <ModalFormulaireMedicaments
      v-if="showDrawer"
      :title="modeEdition ? 'Modifier un médicament' : 'Ajouter un médicament'"
      :fields="formFields"
      :initialValues="selectedMedicament"
      @saved="sauvegarderMedicament"
      @close="fermerDrawer"
    />

    <!-- Popup de suppression -->
    <SuppressionPopup
      v-if="showPopup"
      :nom="selectedMedicament.nom"
      @confirm="confirmerSuppression"
      @close="showPopup = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TableauGenerique from '@/components/TableauGenerique.vue'
import ModalFormulaireMedicaments from '@/components/ModalFormulaireMedicaments.vue'
import SuppressionPopup from '@/components/SuppressionPopup.vue'

// Champs du formulaire
const formFields = [
  { key: 'nom', label: 'Nom du médicament', type: 'text', required: true },
  { key: 'quantite', label: 'Quantité', type: 'number', required: true },
  { key: 'seuil', label: 'Seuil d\'alerte', type: 'number', required: true },
  { key: 'prix_achat', label: 'Prix d\'achat', type: 'number', required: true },
  { key: 'prix_vente', label: 'Prix de vente', type: 'number', required: true },
  { key: 'expiration', label: 'Date d\'expiration', type: 'text', required: true }
]

// Colonnes du tableau
const colonnes = [
  { key: 'nom', label: 'Nom' },
  { key: 'quantite', label: 'Quantité' },
  { key: 'seuil', label: 'Seuil' },
  { key: 'prix_achat', label: 'Prix Achat' },
  { key: 'prix_vente', label: 'Prix Vente' },
  { key: 'expiration', label: 'Expiration' },
  { key: 'actions', label: 'Actions' }
]

// Données (factices pour test)
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

// États
const showDrawer = ref(false)
const showPopup = ref(false)
const modeEdition = ref(false)
const selectedMedicament = ref({})

// Fonctions
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
.page-container {
  padding: 2rem;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.btn-add {
  background: #0d6efd;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.btn-add:hover {
  background: #084cdf;
}
</style>
