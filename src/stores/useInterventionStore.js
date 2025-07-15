// stores/useInterventionStore.js
import { defineStore } from 'pinia'

export const useInterventionStore = defineStore('interventionStore', {
  state: () => ({
    interventions: []
  }),

  actions: {
    chargerInterventions() {
      const data = localStorage.getItem('interventions')
      if (data) {
        this.interventions = JSON.parse(data)
      }
    },

    sauvegarderInterventions() {
      localStorage.setItem('interventions', JSON.stringify(this.interventions))
    },

    ajouter(intervention) {
      this.interventions.push(intervention)
      this.sauvegarderInterventions()
    },

    modifier(id, data) {
      const index = this.interventions.findIndex(i => i.id === id)
      if (index !== -1) {
        Object.assign(this.interventions[index], data)
        this.sauvegarderInterventions()
      }
    },

    supprimer(id) {
      this.interventions = this.interventions.filter(i => i.id !== id)
      this.sauvegarderInterventions()
    },

    chargerDepuisListe(initialData) {
      this.interventions = Array.isArray(initialData) ? [...initialData] : []
    }
  },

  getters: {
    evenements: (state) => {
      return state.interventions.map(i => ({
        id: i.id,
        title: i.title,
        start: i.start,
        end: i.end,
        color: i.color || '#cccccc',
        extendedProps: {
          animalId: i.animalId,
          typeId: i.typeId || i.type,
          icone: i.icone,
          traitement: i.traitement,
          rappel: i.rappel
        }
      }))
   }
  }
})