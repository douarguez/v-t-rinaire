<template>
  <div class="page-animaux">
    <div class="page-header">
      <h2>{{ total }} animaux enregistrés</h2>
    </div>

    <div class="filters">
      <v-text-field
        v-model="filtreNom"
        label="Filtrer par nom"
        variant="outlined"
        density="compact"
        prepend-inner-icon="mdi-magnify"
        class="ma-2"
        hide-details
      />
      <v-select
        v-model="filtreEspece"
        :items="typesDisponibles"
        label="Toutes les espèces"
        variant="outlined"
        density="compact"
        class="ma-2"
        hide-details
      />
    </div>

    <TableauGenerique
      :colonnes="colonnes"
      :donnees="animauxFiltres"
      @clicDroit="ouvrirMenu"
    />

    <MenuContextuelAnimal
      :visible="menuVisible"
      :x="menuX"
      :y="menuY"
      :animal="animalSelectionne"
      @modifier="ouvrirModale"
      @fiche="ouvrirFicheMedicale"
      @supprimer="supprimerAnimal"
    />

    <ModalFormulaireGenerique
      v-if="showModal"
      :title="animalSelectionne ? 'Modifier l’animal' : 'Ajouter un animal'"
      :fields="fieldsAnimal"
      :initial-values="animalSelectionne || {}"
      @saved="enregistrerAnimal"
      @close="fermerModale"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimalStore } from '@/stores/useAnimalStore'
import { useClientStore } from '@/stores/useClientStore'
import ModalFormulaireGenerique from '@/components/ModalFormulaireGenerique.vue'
import MenuContextuelAnimal from '@/components/MenuContextuelAnimal.vue'
import TableauGenerique from '@/components/TableauGenerique.vue'

const { animals, addAnimal, updateAnimal, deleteAnimal, types } = useAnimalStore()
const { clients } = useClientStore()
const router = useRouter()

const showModal = ref(false)
const filtreNom = ref('')
const filtreEspece = ref('')
const animalSelectionne = ref(null)
const menuVisible = ref(false)
const menuX = ref(0)
const menuY = ref(0)

function ouvrirMenu({ event, ligne }) {
  event.preventDefault()
  menuX.value = event.clientX
  menuY.value = event.clientY
  animalSelectionne.value = ligne
  menuVisible.value = true
}

onMounted(() => {
  window.addEventListener('click', () => menuVisible.value = false)
})

const typesDisponibles = computed(() => types.map(t => t.nom))

const animalsAvecClient = computed(() =>
  animals.map(a => {
    const client = clients.find(c => c.id === a.clientId)
    return {
      ...a,
      clientNom: client ? `${client.prenom} ${client.nom}` : 'Inconnu'
    }
  })
)

const animauxFiltres = computed(() =>
  animalsAvecClient.value.filter(a =>
    a.nom?.toLowerCase().includes(filtreNom.value.toLowerCase()) &&
    (filtreEspece.value ? a.espece === filtreEspece.value : true)
  )
)

const total = computed(() => animals.length)

const colonnes = [
  { key: 'nom', label: 'Nom' },
  { key: 'age', label: 'Âge' },
  { key: 'sexe', label: 'Sexe' },
  { key: 'espece', label: 'Espèce' },
  { key: 'breed', label: 'Race' },
  { key: 'quantite', label: 'Quantité' },
  { key: 'clientNom', label: 'Client' }
]

const fieldsAnimal = [
  { key: 'nom', label: 'Nom', type: 'text', required: true },
  { key: 'age', label: 'Âge', type: 'number' },
  { key: 'sexe', label: 'Sexe', type: 'select', options: ['Mâle', 'Femelle'], required: true },
  { key: 'espece', label: 'Espèce', type: 'select', options: typesDisponibles.value },
  { key: 'breed', label: 'Race', type: 'text' },
  { key: 'quantite', label: 'Quantité', type: 'number' }
]

function ouvrirModale() {
  showModal.value = true
}

function fermerModale() {
  showModal.value = false
  animalSelectionne.value = null
}

function enregistrerAnimal(animal) {
  const clientParDefaut = clients[0] || {}

  const data = {
    ...animal,
    clientId: clientParDefaut.id,
    clientNom: clientParDefaut.nom
  }

  if (animalSelectionne.value) {
    updateAnimal({ ...animalSelectionne.value, ...data })
  } else {
    addAnimal({ ...data, id: Date.now() })
  }

  fermerModale()
}

function supprimerAnimal(id) {
  if (!confirm('Confirmer la suppression de cet animal ?')) return
  deleteAnimal(id)
}

function ouvrirFicheMedicale(animal) {
  router.push(`/fiche-animal/${animal.id}`)
}
</script>

<style scoped>
.page-animaux {
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
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
h2 {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.3px;
  margin: 0;
}
</style>
