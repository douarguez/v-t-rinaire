// src/stores/useClientStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAnimalStore } from './useAnimalStore'

export const useClientStore = defineStore('client', () => {
  const clients = ref([
    {
      id: 1,
      nom: 'Hamdi',
      prenom: 'Nadia',
      adresse: 'Rue des Jasmins, Monastir',
      email: 'nadia.hamdi@example.com',
      telephone: '+216 55 123 456'
    }
  ])

  // ➕ Ajouter
  function addClient(client) {
    client.id = Date.now()
    clients.value.push(client)
  }

  // 📝 Modifier
  function updateClient(client) {
    const index = clients.value.findIndex(c => c.id === client.id)
    if (index !== -1) {
      clients.value[index] = { ...client }
    }
  }

  // ❌ Supprimer + cascade animaux
  function deleteClient(id) {
    const animalStore = useAnimalStore()
    animalStore.deleteAnimalsByClient(id) // Supprimer ses animaux
    clients.value = clients.value.filter(c => c.id !== id)
  }

  return {
    clients,
    addClient,
    updateClient,
    deleteClient
  }
})
