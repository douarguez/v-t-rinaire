import { defineStore } from 'pinia'

export const useTypeInterventionStore = defineStore('typeInterventionStore', {
  state: () => ({
    types: [
      { id: 1, nom: 'Consultation', duree: 30, icone: '🩺', couleur: '#eaf4ff' },
      { id: 2, nom: 'Vaccination', duree: 15, icone: '💉', couleur: '#ffe6cc' },
      { id: 3, nom: 'Chirurgie', duree: 60, icone: '🔪', couleur: '#fde2e4' }
    ]
  }),
  getters: {
    getByNom: (state) => (nom) => state.types.find(t => t.nom === nom)
  }
})
