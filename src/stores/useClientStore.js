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
      telephone: '+216 55 123 456',
      interventions: [
        { description: 'Vaccin annuel', montant: 60 },
        { description: 'Consultation fièvre', montant: 60 },
      ]
    },
    {
      id: 2,
      nom: 'Doe',
      prenom: 'John',
      adresse: '123 rue Exemple',
      email: 'john.doe@example.com',
      telephone: '+216 55 987 654',
      interventions: [
        { description: 'Déparasitage', montant: 85 }
      ]
    }
  ])
  function addClient(client) {
    client.id = Date.now()
    client.interventions = client.interventions || []
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
