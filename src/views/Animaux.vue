<template>
  <div class="page-animaux">
    <div class="page-header">
      <h2>{{ total }} animaux enregistrés</h2>
      <button class="btn btn-primary" @click="showModal = true">+ Ajouter un animal</button>
    </div>

    <div class="filters">
      <input v-model="filtreNom" placeholder="🔎 Filtrer par nom" class="input" />
      <select v-model="filtreEspece" class="input">
        <option value="">Toutes les espèces</option>
        <option v-for="type in typesDisponibles" :key="type">{{ type }}</option>
      </select>
    </div>

    <table class="table-animaux">
      <tr>
        <th>Nom</th><th>Âge</th><th>Sexe</th><th>Espèce</th><th>Race</th><th>Quantité</th><th>Client</th>
      </tr>
      <tr
        v-for="animal in animauxFiltres"
        :key="animal.id"
        @contextmenu.prevent="ouvrirMenu($event, animal)"
      >
        <td>{{ animal.nom }}</td>
        <td>{{ animal.age }}</td>
        <td>{{ animal.sexe }}</td>
        <td>{{ animal.espece }}</td>
        <td>{{ animal.breed }}</td>
        <td>{{ animal.quantite }}</td>
        <td>{{ animal.clientNom }}</td>
      </tr>
    </table>

    <MenuContextuelAnimal
      :visible="menuVisible"
      :x="menuX"
      :y="menuY"
      :animal="animalSelectionne"
      @modifier="ouvrirModale"
      @fiche="router.push(`/fiche-animal/${animalSelectionne.id}`)"
      @supprimer="animalStore.deleteAnimal(animalSelectionne.id)"
    />

    <ModalFormulaireGenerique
      v-if="showModal"
      title="Ajouter un animal"
      :fields="fieldsAnimal"
      @saved="ajouterAnimal"
      @close="showModal = false"
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

const { animals, addAnimal, deleteAnimal, types } = useAnimalStore()
const { clients } = useClientStore()
const router = useRouter()

const showModal = ref(false)
const filtreNom = ref('')
const filtreEspece = ref('')
const animalSelectionne = ref(null)
const menuVisible = ref(false)
const menuX = ref(0)
const menuY = ref(0)

function ouvrirMenu(event, animal) {
  menuX.value = event.clientX
  menuY.value = event.clientY
  animalSelectionne.value = animal
  menuVisible.value = true
}
onMounted(() => window.addEventListener('click', () => (menuVisible.value = false)))

const typesDisponibles = computed(() => types.map(t => t.nom))

const animalsAvecClient = computed(() =>
  animals.map(a => ({
    ...a,
    clientNom: clients.find(c => c.id === a.clientId)?.prenom + ' ' + clients.find(c => c.id === a.clientId)?.nom || '❓'
  }))
)

const animauxFiltres = computed(() =>
  animalsAvecClient.value.filter(a =>
    a.nom.toLowerCase().includes(filtreNom.value.toLowerCase()) &&
    (filtreEspece.value ? a.espece === filtreEspece.value : true)
  )
)

const total = computed(() => animals.length)

const fieldsAnimal = [
  { key: 'nom', label: 'Nom', type: 'text', required: true },
  { key: 'age', label: 'Âge', type: 'number' },
  { key: 'sexe', label: 'Sexe', type: 'select', options: ['Mâle', 'Femelle'], required: true },
  { key: 'espece', label: 'Espèce', type: 'select', options: typesDisponibles.value },
  { key: 'breed', label: 'Race', type: 'text' },
  { key: 'quantite', label: 'Quantité', type: 'number' }
]

function ajouterAnimal(animal) {
  const clientParDefaut = clients[0] || {}
  addAnimal({
    ...animal,
    id: Date.now(),
    clientId: clientParDefaut.id,
    clientNom: clientParDefaut.nom
  })
  showModal.value = false
}

function ouvrirModale() {
  showModal.value = true
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}
.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.input {
  padding: 0.5rem;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ddd;
}
.btn-primary {
  background-color: #7a9cc6;
  color: white;
  padding: 0.45rem 1rem;
  font-size: 13px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.table-animaux {
  width: 100%;
  border-collapse: collapse;
}
.table-animaux th,
.table-animaux td {
  padding: 0.6rem;
  border-bottom: 1px solid #eee;
}
.table-animaux tr:hover {
  background-color: #f9fbff;
}
</style>
