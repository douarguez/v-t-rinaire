import { defineStore } from 'pinia'

export const useInterventionStore = defineStore('interventionStore', {
  state: () => ({
    interventions: []
  }),
  getters: {
    evenements: (state) => {
      return state.interventions.map(i => ({
        id: i.id,
        title: i.title,
        start: i.start,
        end: i.end,
        animalId: i.animalId,
        typeId: i.typeId,
        icone: i.icone,
        traitement: i.traitement,
        rappel: i.rappel
      }))
    }
  },
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
