// stores/useTypeInterventionStore.js
import { defineStore } from 'pinia'

export const useTypeInterventionStore = defineStore('typeIntervention', {
  state: () => ({
    types: [
      { id: 1, nom: 'Vaccination', couleur: '#74c69d', duree: '00:20', traitement: false },
      { id: 2, nom: 'Consultation', couleur: '#f59e0b', duree: '00:30', traitement: true }
    ]
  }),
  getters: {
    getByNom: (state) => (nom) => state.types.find(t => t.nom === nom)
  },

  actions: {
    ajouter(type) { this.types.push(type) },
    modifier(id, data) {
      const index = this.types.findIndex(t => t.id === id)
      if (index !== -1) this.types[index] = { ...this.types[index], ...data }
    },
    supprimer(id) {
      this.types = this.types.filter(t => t.id !== id)
    }
  }
})
