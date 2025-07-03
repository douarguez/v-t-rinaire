<template>
  <div class="page-calendrier">
    <FullCalendar :options="calendarOptions" />
    
    <ModalNouvelleIntervention
      v-if="showModal"
      :date-initiale="dateSelectionnee"
      :intervention="interventionSelectionnee"
      @close="fermerModale"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import ModalNouvelleIntervention from '@/components/ModalNouvelleIntervention.vue'
import { useInterventionStore } from '@/stores/useInterventionStore'

const store = useInterventionStore()

const showModal = ref(false)
const dateSelectionnee = ref('')
const interventionSelectionnee = ref(null)

const evenements = computed(() => store.interventions)

function ouvrirModale(info) {
  const date = new Date(info.date)
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  dateSelectionnee.value = localDate.toISOString().slice(0, 16)
  interventionSelectionnee.value = null
  showModal.value = true
}

function ouvrirModaleEdition(info) {
  const i = info.event.extendedProps
  i.id = info.event.id
  dateSelectionnee.value = ''
  interventionSelectionnee.value = i
  showModal.value = true
}

function fermerModale() {
  showModal.value = false
}

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'timeGridWeek',
  events: evenements.value,
  editable: true,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridDay,timeGridWeek,dayGridMonth'
  },
  dateClick: ouvrirModale,
  eventClick: ouvrirModaleEdition,
  eventDrop(info) {
    store.modifier(info.event.id, {
      start: info.event.start.toISOString(),
      end: info.event.end?.toISOString()
    })
  }
}))
</script>

<style scoped>
.page-calendrier {
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
}
</style>
