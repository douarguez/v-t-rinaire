import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInterventionStore = defineStore('intervention', () => {
  const evenements = ref([])

  function ajouter(evenement) {
    evenements.value.push(evenement)
  }

  function modifier(id, data) {
    const index = evenements.value.findIndex(e => e.id === id)
    if (index !== -1) {
      evenements.value[index] = { ...evenements.value[index], ...data }
    }
  }

  function supprimer(id) {
    evenements.value = evenements.value.filter(e => e.id !== id)
  }

  function charger(initialData) {
    evenements.value = Array.isArray(initialData) ? [...initialData] : []
  }

  return { evenements, ajouter, modifier, supprimer, charger }
})
