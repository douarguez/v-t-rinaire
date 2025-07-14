<template>
  <div class="page-types-animaux">
    <div class="page-header">
      <h2>{{ total }} types d’animaux</h2>
      <v-btn color="primary" @click="ouvrirAjout">+ Ajouter un type</v-btn>
      <v-btn v-if="types.length === 0" color="secondary" @click="ajouterTypeTest" class="ml-2">Ajouter un type test</v-btn>
    </div>

    <div v-if="typesAvecUsage.length === 0" class="no-data">
      Aucun type d’animal trouvé. Ajoutez-en un ou cliquez sur "Ajouter un type test" !
    </div>

    <TableauGenerique
      v-else
      :colonnes="colonnes"
      :donnees="typesAvecUsage"
      @edit="ouvrirEdition"
      @delete="supprimerType"
      @ligneClick="naviguerVersAnimauxParType"
    />

    <ModalFormulaireGenerique
      v-if="afficherModal"
      :title="typeSelectionne ? 'Modifier le type' : 'Ajouter un type d’animal'"
      :fields="champsType"
      :initial-values="typeSelectionne || {}"
      @saved="enregistrerType"
      @close="fermerModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimalStore } from '@/stores/useAnimalStore'
import TableauGenerique from '@/components/TableauGenerique.vue'
import ModalFormulaireGenerique from '@/components/ModalFormulaireGenerique.vue'

const router = useRouter()
const { types, animals, addType, updateType, deleteType } = useAnimalStore()

const afficherModal = ref(false)
const typeSelectionne = ref(null)

const total = computed(() => types.length)

const colonnes = [
  { key: 'id', label: 'ID' },
  { key: 'nom', label: 'Nom' },
  { key: 'description', label: 'Description' },
  { key: 'category', label: 'Catégorie' },
  { key: 'status', label: 'Statut', type: 'badge' },
  { key: 'usageCount', label: 'Animaux associés' },
  { key: 'createdAt', label: 'Créé le' },
  { key: 'updatedAt', label: 'Modifié le' },
  { key: 'actions', label: 'Actions' }
]

const champsType = [
  { key: 'nom', label: 'Nom du type', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'text' },
  { key: 'category', label: 'Catégorie', type: 'select', options: ['Mammal', 'Reptile', 'Bird', 'Fish', 'Amphibian'], required: true },
  { key: 'status', label: 'Statut', type: 'select', options: ['Active', 'Archived'], required: true }
]

const typesAvecUsage = computed(() =>
  types.map(type => ({
    ...type,
    usageCount: animals.filter(a => a.espece === type.nom).length,
    createdAt: type.createdAt ? new Date(type.createdAt).toLocaleDateString() : '-',
    updatedAt: type.updatedAt ? new Date(type.updatedAt).toLocaleDateString() : '-'
  }))
)

function ouvrirAjout() {
  typeSelectionne.value = null
  afficherModal.value = true
}

function ouvrirEdition(type) {
  typeSelectionne.value = { ...type }
  afficherModal.value = true
}

function enregistrerType(data) {
  const now = Date.now()
  const payload = {
    ...data,
    id: data.id || now,
    createdAt: data.createdAt || now,
    updatedAt: now
  }
  if (types.find(t => t.id === payload.id)) {
    updateType(payload)
  } else {
    addType(payload)
  }
  fermerModal()
}

function supprimerType(typeId) {
  const type = types.find(t => t.id === typeId)
  const count = animals.filter(a => a.espece === type?.nom).length
  if (count > 0 && !confirm(`Ce type est associé à ${count} animal(aux). Supprimer ?`)) return
  deleteType(typeId)
}

function fermerModal() {
  afficherModal.value = false
  typeSelectionne.value = null
}

function ajouterTypeTest() {
  const now = Date.now()
  addType({
    id: now,
    nom: 'Chien',
    description: 'Mammifère domestique',
    category: 'Mammal',
    status: 'Active',
    createdAt: now,
    updatedAt: now
  })
}

function naviguerVersAnimauxParType(type) {
  if (!type?.id) {
    console.error('ID manquant lors de la navigation vers AnimauxParType:', type)
    return
  }
  router.push({ name: 'AnimauxParType', params: { typeId: type.id } })
}
</script>

<style scoped>
.page-types-animaux {
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
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
.ml-2 {
  margin-left: 0.5rem;
}
</style>
