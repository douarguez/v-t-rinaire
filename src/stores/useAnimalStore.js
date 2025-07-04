// src/stores/useAnimalStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimalStore = defineStore('animal', () => {
  const animals = ref([
{
  id: 101,
  nom: 'Médor',
  age: 5,
  sexe: 'Mâle',
  espece: 'Chien',
  breed: 'Berger Allemand',
  quantite: 1,
  clientId: 1,
  ficheMedicale: {
    interventions: [],
    traitements: [],
    rappels: [],
    notes: {
      comportement: '',
      allergies: [],
      recommandations: ''
    },
    documents: []
  }
}

])

  const types = ref([])

  // ➕ Ajouter un animal
  function addAnimal(animal) {
    if (!animal.clientId) {
      alert("⚠️ L'animal doit être lié à un client (clientId manquant).")
      return
    }
    animal.id = Date.now()
    animal.ficheMedicale = {
      interventions: [],
      traitements: [],
      rappels: [],
      notes: {
        comportement: '',
        allergies: [],
        recommandations: ''
      },
      documents: []
    }
    animals.value.push(animal)
  }

  // 📝 Modifier
  function updateAnimal(animal) {
    const index = animals.value.findIndex(a => a.id === animal.id)
    if (index !== -1) {
      animals.value[index] = { ...animal }
    }
  }

  // ❌ Supprimer un animal
  function deleteAnimal(id) {
    animals.value = animals.value.filter(a => a.id !== id)
  }

  // ❌ Supprimer tous les animaux d’un client
  function deleteAnimalsByClient(clientId) {
    animals.value = animals.value.filter(a => a.clientId !== clientId)
  }

  // 🎯 Utilitaires
  function getByClientId(clientId) {
    return animals.value.filter(a => String(a.clientId) === String(clientId))
  }

  function getById(id) {
    return animals.value.find(a => a.id === id)
  }

  // 🔧 Type d’animal
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

  return {
    animals,
    types,
    addAnimal,
    updateAnimal,
    deleteAnimal,
    deleteAnimalsByClient,
    addType,
    updateType,
    deleteType,
    getByClientId,
    getById
  }
})
