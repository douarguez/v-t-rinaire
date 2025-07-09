<template>
  <div class="page-animaux">
    <div class="page-header">
      <h2>{{ total }} animaux enregistrés</h2>
      <v-btn color="primary" @click="showModal = true">+ Ajouter un animal</v-btn>
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

    <v-table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Âge</th>
          <th>Sexe</th>
          <th>Espèce</th>
          <th>Race</th>
          <th>Quantité</th>
          <th>Client</th>
        </tr>
      </thead>
      <tbody>
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
      </tbody>
    </v-table>

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
    clientNom: clients.find(c => c.id === a.clientId)?.prenom + ' ' + clients.find(c => c.id === a.clientId)?.nom || 'Inconnu'
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