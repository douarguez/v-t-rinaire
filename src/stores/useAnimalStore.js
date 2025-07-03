// src/stores/useAnimalStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimalStore = defineStore('animal', () => {
  const animals = ref([])
  const types = ref([])

  function addAnimal(animal) {
    if (!animal.clientId) {
      alert("⚠️ L'animal doit être lié à un client (clientId manquant).")
      return
    }
    animal.id = Date.now()
    animals.value.push(animal)
  }

  function updateAnimal(animal) {
    const index = animals.value.findIndex(a => a.id === animal.id)
    if (index !== -1) animals.value[index] = { ...animal }
  }

  function deleteAnimal(id) {
    animals.value = animals.value.filter(a => a.id !== id)
  }

  function addType(type) {
    const exists = types.value.some(t => t.nom.toLowerCase() === type.nom.toLowerCase())
    if (!exists) {
      type.id = Date.now()
      types.value.push(type)
    } else {
      alert('Ce type existe déjà.')
    }
  }

  function updateType(type) {
    const index = types.value.findIndex(t => t.id === type.id)
    if (index !== -1) types.value[index] = { ...type }
  }

  function deleteType(id) {
    types.value = types.value.filter(t => t.id !== id)
  }

  function getByClientId(clientId) {
    return animals.value.filter(a => String(a.clientId) === String(clientId))
  }

  function getById(id) {
    return animals.value.find(a => a.id === id)
  }

  return {
    animals,
    types,
    addAnimal,
    updateAnimal,
    deleteAnimal,
    addType,
    updateType,
    deleteType,
    getByClientId,
    getById
  }
})
