import { defineStore } from 'pinia'

export const useInterventionStore = defineStore('interventionStore', {
  state: () => ({
    interventions: []
  }),
  actions: {
    ajouter(intervention) {
      this.interventions.push(intervention)
    },
    modifier(id, data) {
      const index = this.interventions.findIndex(i => i.id === id)
      if (index !== -1) Object.assign(this.interventions[index], data)
    },
    supprimer(id) {
      this.interventions = this.interventions.filter(i => i.id !== id)
    }
  }
})
