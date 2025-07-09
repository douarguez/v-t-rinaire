<template>
  <div class="page-interventions">
    <div class="page-header">
      <h2> Interventions enregistrées</h2>
      <v-btn color="primary" @click="showModal = true">+ Ajouter une intervention</v-btn>
    </div>

    <TableauGenerique
      :colonnes="colonnes"
      :donnees="interventions"
      @ligneClick="handleClickIntervention"
    />

    <ModalNouvelleIntervention
  v-if="showModal"
  title="Ajouter une intervention"
  :fields="fieldsIntervention"
  :owner-id="clientId"
  :owner-name="clientName"
  :initial-values="{ start: selectedDate }"
  @saved="ajouterIntervention"
  @close="showModal = false"
/>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInterventionStore } from '@/stores/useInterventionStore'
import TableauGenerique from '@/components/TableauGenerique.vue'
import ModalNouvelleIntervention from '@/components/ModalNouvelleIntervention.vue'

const showModal = ref(false)
const store = useInterventionStore()
const interventions = computed(() => store.interventions)
const selectedDate = ref(new Date().toISOString().slice(0,16)) // ou selon ton besoin

const colonnes = [
  { key: 'animalId', label: 'Animal' },
  { key: 'type', label: 'Type' },
  { key: 'start', label: 'Date' },
  { key: 'duree', label: 'Durée (min)' },
  { key: 'traitement', label: 'Traitement' },
  { key: 'color', label: 'Couleur' }
]

function ajouterIntervention(i) {
  const nouveau = {
    ...i,
    id: Date.now(),
    duree: Math.round((new Date(i.end) - new Date(i.start)) / 60000),
    traitement: !!i.traitement,
    color: i.color || '#ccc'
  }
  store.addIntervention(nouveau)
  showModal.value = false
}

function handleClickIntervention(i) {
  console.log('Intervention cliquée :', i)
  // Tu peux naviguer vers la fiche ou afficher une modale de détail
}

const fieldsIntervention = [
  { key: 'animalId', label: 'Animal', type: 'number', required: true },
  { key: 'type', label: 'Type', type: 'text', required: true },
  { key: 'start', label: 'Date début', type: 'datetime-local', required: true },
  { key: 'end', label: 'Date fin', type: 'datetime-local', required: true },
  { key: 'traitement', label: 'Traitement effectué', type: 'checkbox' },
  { key: 'color', label: 'Couleur', type: 'color' }
]
</script>

<style scoped>
.page-interventions {
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.3px;
  margin: 0;
}
</style>
