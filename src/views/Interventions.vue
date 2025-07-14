<template>
  <div class="page-interventions">
    <div class="page-header">
      <h2> Interventions enregistrées</h2>
      <v-btn color="primary" @click="ouvrirAjout">+ Ajouter une intervention</v-btn>
    </div>

    <TableauGenerique
      :colonnes="colonnes"
      :donnees="tableData"
      @edit="ouvrirEdition"
      @delete="supprimerIntervention"
    />

    <ModalNouvelleIntervention
      v-if="showModal"
      :intervention="interventionSelectionnee"
      :dateInitiale="selectedDate"
      @saved="sauvegarderIntervention"
      @close="fermerModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useInterventionStore } from '@/stores/useInterventionStore'
import { useAnimalStore } from '@/stores/useAnimalStore'
import { useClientStore } from '@/stores/useClientStore'
import { useTypeInterventionStore } from '@/stores/useTypeInterventionStore'
import TableauGenerique from '@/components/TableauGenerique.vue'
import ModalNouvelleIntervention from '@/components/ModalNouvelleIntervention.vue'

const store = useInterventionStore()
const animalStore = useAnimalStore()
const clientStore = useClientStore()
const typeStore = useTypeInterventionStore()

const showModal = ref(false)
const interventionSelectionnee = ref(null)
const selectedDate = ref(new Date().toISOString().slice(0, 16))

const colonnes = [
  { key: 'clientNom', label: 'Client' },
  { key: 'animalNom', label: 'Animal' },
  { key: 'typeNom', label: 'Intervention' },
  { key: 'start', label: 'Date & heure' },
  { key: 'duree', label: 'Durée (min)' },
  { key: 'actions', label: 'Actions' }
]

const tableData = computed(() =>
  store.evenements.map(i => {
    const a = animalStore.getById(i.animalId)
    const c = a ? clientStore.getById(a.clientId) : null
    const t = typeStore.types.find(t => t.id === i.typeId)

    const startDate = i.start ? new Date(i.start) : null
    const endDate = i.end ? new Date(i.end) : null
    const duration = startDate && endDate
      ? Math.round((endDate - startDate) / 60000)
      : '—'

    return {
      ...i,
      clientNom: c ? `${c.nom} ${c.prenom}` : '—',
      animalNom: a ? a.nom : '—',
      typeNom: t ? t.nom : i.type || '—',
      start: startDate ? startDate.toLocaleString() : '—',
      duree: duration
    }
  })
)

function ouvrirAjout() {
  interventionSelectionnee.value = null
  selectedDate.value = new Date().toISOString().slice(0, 16)
  showModal.value = true
}

function ouvrirEdition(i) {
  interventionSelectionnee.value = { ...i }
  selectedDate.value = ''
  showModal.value = true
}

function fermerModal() {
  interventionSelectionnee.value = null
  showModal.value = false
}

function sauvegarderIntervention(data) {
  if (data?.id && store.evenements.find(i => i.id === data.id)) {
    store.modifier(data.id, data)
  } else {
    store.ajouter({ ...data, id: Date.now() })
  }
  fermerModal()
}

function supprimerIntervention(id) {
  store.supprimer(id)
}
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
