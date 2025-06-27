<template>
  <div class="animal-detail">
    <h2>Fiche de {{ animal.name }}</h2>
    <p><strong>Espèce :</strong> {{ animal.species }}</p>
    <p><strong>Type :</strong> {{ getTypeName(animal.typeId) }}</p>
    <p><strong>Propriétaire :</strong> {{ animal.owner }}</p>

    <h3>Historique des traitements</h3>
    <ul>
      <li v-for="(traitement, index) in animal.traitements" :key="index">
        📅 {{ traitement.date }} — {{ traitement.nom }} : {{ traitement.description }}
      </li>
    </ul>

    <button class="btn btn-primary" @click="addTraitement()">+ Ajouter un traitement</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const animalId = parseInt(route.params.id)

const types = [
  { id: 1, nom: 'Chien' },
  { id: 2, nom: 'Chat' },
  { id: 3, nom: 'Tortue' },
]

const animal = ref({
  id: animalId,
  name: 'Bella',
  species: 'Golden Retriever',
  typeId: 1,
  owner: 'Mme Saidi',
  traitements: [
    { nom: 'Vaccin rage', description: 'Injection annuelle', date: '2025-04-01' },
    { nom: 'Vermifuge', description: 'Traitement préventif', date: '2025-06-15' },
  ]
})

function getTypeName(id) {
  const type = types.find(t => t.id === id)
  return type ? type.nom : '-'
}

function addTraitement() {
  const nom = prompt('Nom du traitement :')
  const description = prompt('Description :')
  const date = prompt('Date (AAAA-MM-JJ) :')

  if (nom && date) {
    animal.value.traitements.push({ nom, description, date })
  }
}
</script>
