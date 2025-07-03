<template>
  <div class="page-animaux-client">
    <div class="page-header">
      <h2>Animaux de {{ clientName }}</h2>
      <button class="btn btn-primary" @click="showModal = true">+ Ajouter un animal</button>
    </div>

    <TableauGenerique :colonnes="colonnes" :donnees="[...animauxClient]" />

    <AnimalModalGenerique
      v-if="showModal"
      :title="'Ajouter un animal'"
      :fields="fieldsAnimal"
      :owner-id="clientId"
      :owner-name="clientName"
      @saved="ajouterAnimal"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '@/stores/useClientStore'
import { useAnimalStore } from '@/stores/useAnimalStore'
import TableauGenerique from '@/components/TableauGenerique.vue'
import AnimalModalGenerique from '@/components/ModalFormulaireGenerique.vue'

const route = useRoute()
const clientId = Number(route.params.id)

const { clients } = useClientStore()
const { animals, types, addAnimal } = useAnimalStore()

const client = computed(() => clients.find(c => c.id === clientId))
const clientName = computed(() =>
  client.value ? `${client.value.prenom} ${client.value.nom}` : 'Client'
)

const animauxClient = computed(() =>
  animals.filter(animal => Number(animal.ownerId) === Number(clientId))
)

const colonnes = [
  { key: 'nom', label: 'Nom' },
  { key: 'age', label: 'Âge' },
  { key: 'sexe', label: 'Sexe' },
  { key: 'espece', label: 'Espèce' },
  { key: 'breed', label: 'Race' },
  { key: 'quantite', label: 'Quantité' },
  { key: 'ownerName', label: 'Propriétaire' },
  { key: 'fiche', label: 'Fiche Médicale' }
]

const typesDisponibles = computed(() => types.map(t => t.nom))

const showModal = ref(false)

const fieldsAnimal = [
  { key: 'nom', label: 'Nom', type: 'text', required: true },
  { key: 'age', label: 'Âge', type: 'number' },
  { key: 'sexe', label: 'Sexe', type: 'select', options: ['Mâle', 'Femelle'], required: true },
  { key: 'espece', label: 'Espèce', type: 'select', options: typesDisponibles.value },
  { key: 'breed', label: 'Race', type: 'text' },
  { key: 'quantite', label: 'Quantité', type: 'number' }
]

function ajouterAnimal(animal) {
    const nouveau = {
    ...animal,
    id: Date.now(), // ✅ ID automatique
    clientId: clientId, // ✅ Liaison explicite au client (même si ownerId déjà là)
    fiche: '🔍'
  }
  addAnimal(nouveau)
  showModal.value = false
}

// Optionnel : test d’ajout automatique au chargement
// onMounted(() => {
//   addAnimal({
//     id: Date.now(),
//     nom: 'Test API',
//     age: 4,
//     sexe: 'Mâle',
//     espece: 'Chien',
//     breed: 'Berger',
//     quantite: 1,
//     ownerId: clientId,
//     ownerName: clientName.value,
//     fiche: '🧾'
//   })
// })
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 0.45rem 1rem;
  font-size: 13px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
</style>
