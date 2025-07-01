import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClientStore = defineStore('client', () => {
  const clients = ref([
    // Exemple de données initiales (optionnelles)
    {
      id: 1,
      nom: 'Hamdi',
      prenom: 'Nadia',
      adresse: 'Rue des Jasmins, Monastir',
      email: 'nadia.hamdi@example.com',
      telephone: '+216 55 123 456'
    }
  ])

  // ➕ Ajouter un client
  function addClient(client) {
    client.id = Date.now()
    clients.value.push(client)
  }

  // 📝 Modifier un client existant
  function updateClient(client) {
    const index = clients.value.findIndex(c => c.id === client.id)
    if (index !== -1) {
      clients.value[index] = { ...client }
    }
  }

  // ❌ Supprimer un client
  function deleteClient(id) {
    clients.value = clients.value.filter(c => c.id !== id)
  }

  return {
    clients,
    addClient,
    updateClient,
    deleteClient
  }
})
