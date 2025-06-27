import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimalStore = defineStore('animalStore', () => {
  const animals = ref([
    { id: 1, name: 'Bella', species: 'Chien', typeId: 1, owner: 'Mme Saidi' }
  ])

  const types = ref([
    { id: 1, nom: 'Chien' },
    { id: 2, nom: 'Chat' }
  ])

  function addAnimal(animal) {
    animal.id = Date.now()
    animals.value.push(animal)
  }

  function updateAnimal(updated) {
    const index = animals.value.findIndex(a => a.id === updated.id)
    if (index !== -1) animals.value[index] = updated
  }

  function addType(newType) {
    newType.id = Date.now()
    types.value.push(newType)
  }

  return { animals, types, addAnimal, updateAnimal, addType }
})
