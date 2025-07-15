<template>
  <div class="page-calendrier">
    <!-- Vuetify-styled controls -->
    <v-sheet class="d-flex align-center" height="54" tile>
      <v-select
        v-model="calendarView"
        :items="viewOptions"
        class="ma-2"
        density="compact"
        label="View Mode"
        variant="outlined"
        hide-details
        @update:model-value="updateView"
      ></v-select>
      <v-select
        v-model="calendarWeekdays"
        :items="weekdayOptions"
        class="ma-2"
        density="compact"
        label="weekdays"
        variant="outlined"
        hide-details
        @update:model-value="updateWeekdays"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn text @click="goToToday" class="ma-2">TODAY</v-btn>
      <v-btn icon @click="prev" class="ma-2"><v-icon>mdi-chevron-left</v-icon></v-btn>
      <v-btn icon @click="next" class="ma-2"><v-icon>mdi-chevron-right</v-icon></v-btn>
    </v-sheet>

    <!-- FullCalendar -->
    <v-sheet class="calendar-container">
      <FullCalendar ref="calendar" :options="calendarOptions" />
    </v-sheet>

    <!-- Modale centrée -->
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
import ModalNouvelleIntervention from '@/components/ModalNouvelleIntervention.vue'

const store = useInterventionStore()
const calendar = ref(null)
const showModal = ref(false)
const dateSelectionnee = ref('')
const interventionSelectionnee = ref(null)

// View mode and weekday options
const calendarView = ref('timeGridWeek')
const viewOptions = [
  { title: 'month', value: 'dayGridMonth' },
  { title: 'week', value: 'timeGridWeek' },
  { title: 'day', value: 'timeGridDay' },
]
const calendarWeekdays = ref([0, 1, 2, 3, 4, 5, 6])
const weekdayOptions = [
  { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
  { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
  { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
  { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
]

// Event colors and titles based on the image
const colors = ['#66BB6A', '#FFCA28', '#42A5F5', '#EF5350'] // Green, Yellow, Blue, Red
const titles = ['Travel', 'Meeting', 'Event', 'Conference']

// Map store events with colors and titles
const evenements = computed(() => {
  return store.evenements.map((event, index) => ({
    ...event,
    title: titles[index % titles.length] || event.title,
    color: colors[index % colors.length],
    display: 'block', // Use block display for time grid events
  }))
})

function ouvrirModale(info) {
  const date = new Date(info.start)
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

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: calendarView.value,
  weekdays: calendarWeekdays.value,
  selectable: true,
  editable: true,
  events: evenements.value,
  headerToolbar: false,
  date: new Date('2025-07-09'), // Today’s date
  allDaySlot: false, // Disable all-day slot for time grid focus
  slotMinTime: '06:00:00', // Match image's 6 AM start
  slotMaxTime: '18:00:00', // Match image's 6 PM end
  slotDuration: '01:00:00', // 1-hour slots
  slotLabelInterval: '01:00', // Labels every hour
  height: 'auto',
  contentHeight: '600px',
  select: ouvrirModale,
  eventClick: ouvrirModaleEdition,
  eventDrop(info) {
    store.modifier(info.event.id, {
      start: info.event.start.toISOString(),
      end: info.event.end?.toISOString(),
    })
  },
})

function updateView() {
  if (calendar.value) {
    calendar.value.getApi().changeView(calendarView.value)
  }
}

function updateWeekdays() {
  if (calendar.value) {
    calendar.value.getApi().setOption('weekdays', calendarWeekdays.value)
  }
}

function goToToday() {
  if (calendar.value) {
    calendar.value.getApi().today()
  }
}

function prev() {
  if (calendar.value) {
    calendar.value.getApi().prev()
  }
}

function next() {
  if (calendar.value) {
    calendar.value.getApi().next()
  }
}

onMounted(() => {
  if (calendar.value) {
    calendar.value.getApi().changeView(calendarView.value)
    calendar.value.getApi().setOption('weekdays', calendarWeekdays.value)
  }
})

watch(calendarView, (newView) => {
  if (calendar.value) {
    calendar.value.getApi().changeView(newView)
  }
})

watch(calendarWeekdays, (newWeekdays) => {
  if (calendar.value) {
    calendar.value.getApi().setOption('weekdays', newWeekdays)
  }
})
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

/* Customize FullCalendar buttons (hidden since we use Vuetify controls) */
:deep(.fc-button) {
  display: none;
}

/* Calendar grid */
:deep(.fc-timegrid) {
  background-color: #fff;
  border: 1px solid #dfe6e9;
}

:deep(.fc-timegrid-slot) {
  border-color: #dfe6e9;
  height: 60px; /* Adjust slot height for better visibility */
}

:deep(.fc-timegrid-slot-label) {
  color: #2c3e50;
  font-size: 12px;
  padding: 5px;
}

/* Day headers */
:deep(.fc-col-header-cell) {
  background-color: #f8fafc;
  color: #2c3e50;
  font-weight: 500;
  font-size: 14px;
  border-right: 1px solid #dfe6e9;
}

/* Events as blocks */
:deep(.fc-event) {
  border: none;
  border-radius: 4px;
  font-size: 12px;
  padding: 2px 4px;
  color: #fff;
  text-align: center;
}

:deep(.fc-event-title) {
  white-space: normal;
  word-break: break-word;
}

/* Month view adjustments */
:deep(.fc-daygrid-day) {
  background-color: #fff;
  border: 1px solid #dfe6e9;
}

:deep(.fc-daygrid-day:hover) {
  background-color: #f0f4f8;
}

:deep(.fc-daygrid-dot-event) {
  margin: 2px;
  border-radius: 50%;
  width: 8px;
  height: 8px;
}

:deep(.fc-daygrid-day-number) {
  color: #2c3e50;
  font-weight: 500;
}

/* Header styling */
:deep(.fc-toolbar-title) {
  font-size: 1.25rem;
  color: #2c3e50;
}
</style>+99