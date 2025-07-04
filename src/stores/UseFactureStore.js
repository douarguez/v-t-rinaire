// src/stores/useFactureStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFactureStore = defineStore('facture', () => {
  const factures = ref([])

  const ajouterFacture = (facture) => {
    factures.value.push({ ...facture })
  }

  return { factures, ajouterFacture }
})
