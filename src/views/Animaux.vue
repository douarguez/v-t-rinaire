<template>
  <div class="animals-container">
    <h2>Liste des animaux</h2>

    <button class="btn btn-primary" @click="router.push('/animaux/ajouter')">
      + Ajouter un animal
    </button>

    <table class="animals-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Espèce</th>
          <th>Type</th>
          <th>Propriétaire</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="animal in animals" :key="animal.id">
          <td>{{ animal.name }}</td>
          <td>{{ animal.species }}</td>
          <td>{{ getTypeName(animal.typeId) }}</td>
          <td>{{ animal.owner }}</td>
          <td>
            <button class="btn btn-edit" @click="editAnimal(animal)">Modifier</button>
            <button class="btn btn-delete" @click="deleteAnimal(animal.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <AnimalForm
      v-if="showForm"
      :initial-animal="editingAnimal"
      :types="types"
      @saved="saveAnimal"
      @close="closeForm"
      @add-type="showTypeForm = true"
    />

    <TypeForm
      v-if="showTypeForm"
      @saved="addType"
      @close="showTypeForm = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AnimalForm from '@/components/AnimalForm.vue'
import TypeForm from '@/components/TypeForm.vue'
import { useAnimalStore } from '@/stores/useAnimalStore'
import '@/assets/animals.css'

const router = useRouter()
const store = useAnimalStore()
const { animals, types, addAnimal, updateAnimal, addType } = store

const showForm = ref(false)
const showTypeForm = ref(false)
const editingAnimal = ref(null)

function editAnimal(animal) {
  editingAnimal.value = { ...animal }
  showForm.value = true
}

function deleteAnimal(id) {
  const index = animals.findIndex(a => a.id === id)
  if (index !== -1 && confirm('Supprimer cet animal ?')) {
    animals.splice(index, 1)
  }
}

function saveAnimal(animal) {
  if (animal.id) {
    updateAnimal(animal)
  } else {
    addAnimal(animal)
  }
  closeForm()
}

function closeForm() {
  showForm.value = false
  editingAnimal.value = null
}

function getTypeName(id) {
  const type = types.find(t => t.id === id)
  return type ? type.nom : '-'
}
</script>
