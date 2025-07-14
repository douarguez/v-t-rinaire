<template>
  <div class="page-calendrier">
    <v-sheet class="d-flex align-center" height="54" tile>
      <v-select
        v-model="calendarView"
        :items="viewOptions"
        class="ma-2"
        density="compact"
        label="Vue"
        variant="outlined"
        hide-details
        @update:model-value="updateView"
      />
      <v-select
        v-model="hiddenDays"
        :items="weekdayOptions"
        class="ma-2"
        density="compact"
        label="Jours affichés"
        variant="outlined"
        hide-details
        @update:model-value="updateWeekdays"
      />
      <v-spacer />
      <v-btn text @click="goToToday" class="ma-2">Aujourd’hui</v-btn>
      <v-btn icon @click="prev" class="ma-2"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-btn icon @click="next" class="ma-2"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </v-sheet>

    <v-sheet class="calendar-container">
      <FullCalendar ref="calendar" :options="calendarOptions" />
    </v-sheet>

    <v-dialog v-model="showModal" max-width="520px" persistent>
      <ModalNouvelleIntervention
        :dateInitiale="dateSelectionnee"
        :intervention="interventionSelectionnee"
        @close="fermerModale"
      />
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { useInterventionStore } from '@/stores/useInterventionStore'
import { useTypeInterventionStore } from '@/stores/useTypeInterventionStore'
import ModalNouvelleIntervention from '@/components/ModalNouvelleIntervention.vue'

const calendar = ref(null)
const store = useInterventionStore()
const typeStore = useTypeInterventionStore()

const showModal = ref(false)
const dateSelectionnee = ref('')
const interventionSelectionnee = ref(null)

const calendarView = ref('timeGridWeek')
const viewOptions = [
  { title: 'Mois', value: 'dayGridMonth' },
  { title: 'Semaine', value: 'timeGridWeek' },
  { title: 'Jour', value: 'timeGridDay' }
]

const weekdayOptions = [
  { title: 'Dim - Sam', value: [] },
  { title: 'Lun - Dim', value: [0] },
  { title: 'Lun - Ven', value: [0, 6] },
  { title: 'Lun, Mer, Ven', value: [0, 2, 4, 6] }
]
const hiddenDays = ref([0, 6])

const evenements = computed(() =>
  store.evenements.map(event => {
    const type = typeStore.types.find(t => t.id === event.typeId)
    return {
      ...event,
      title: event.title || type?.nom || 'Intervention',
      backgroundColor: type?.couleur || '#cccccc',
      borderColor: type?.couleur || '#cccccc',
      display: 'block'
    }
  })
)

function ouvrirModale(info) {
  const date = new Date(info.start)
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  dateSelectionnee.value = localDate.toISOString().slice(0, 16)
  interventionSelectionnee.value = null
  showModal.value = true
}

function ouvrirModaleEdition(info) {
  const i = {
    id: info.event.id,
    ...info.event.extendedProps
  }
  dateSelectionnee.value = ''
  interventionSelectionnee.value = i
  showModal.value = true
}

function fermerModale() {
  showModal.value = false
}

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: calendarView.value,
  initialDate: new Date(),
  hiddenDays: hiddenDays.value,
  selectable: true,
  editable: true,
  events: evenements.value,
  headerToolbar: false,
  allDaySlot: false,
  slotMinTime: '06:00:00',
  slotMaxTime: '18:00:00',
  slotDuration: '01:00:00',
  slotLabelInterval: '01:00',
  height: 'auto',
  contentHeight: '600px',
  select: ouvrirModale,
  eventClick: ouvrirModaleEdition,
  eventDrop(info) {
    store.modifier(info.event.id, {
      start: info.event.start.toISOString(),
      end: info.event.end?.toISOString()
    })
  }
})

function updateView() {
  calendar.value?.getApi().changeView(calendarView.value)
}

function updateWeekdays(val) {
  hiddenDays.value = val
  calendar.value?.getApi().setOption('hiddenDays', hiddenDays.value)
}

function goToToday() {
  calendar.value?.getApi().today()
}

function prev() {
  calendar.value?.getApi().prev()
}

function next() {
  calendar.value?.getApi().next()
}

onMounted(() => {
  calendar.value?.getApi().changeView(calendarView.value)
  calendar.value?.getApi().setOption('hiddenDays', hiddenDays.value)
})

watch(calendarView, updateView)
</script>

<style scoped>
.page-calendrier {
  padding: 2rem;
  font-family: 'Inter', sans-serif;
  background-color: #f5f7fa;
}
.calendar-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
:deep(.fc-event) {
  border: none;
  border-radius: 4px;
  font-size: 12px;
  padding: 2px 4px;
  color: #fff;
  text-align: center;
}
:deep(.fc-timegrid-slot-label),
:deep(.fc-col-header-cell),
:deep(.fc-daygrid-day-number) {
  color: #2c3e50;
}
</style>
