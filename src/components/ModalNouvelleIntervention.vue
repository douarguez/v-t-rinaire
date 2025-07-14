<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useAnimalStore } from '@/stores/useAnimalStore'
import { useClientStore } from '@/stores/useClientStore'
import { useTypeInterventionStore } from '@/stores/useTypeInterventionStore'
import { useInterventionStore } from '@/stores/useInterventionStore'

const props = defineProps({
  dateInitiale: String,
  intervention: Object
})
const emit = defineEmits(['close'])

const clientId = ref('')
const animalId = ref('')
const typeNom = ref('')
const dateISO = ref('')
const duree = ref(30)
const ajouterTraitement = ref(false)
const envoyerNotification = ref(false)
const alerteTraitement = ref(false)
const animalObligatoire = ref(true)

const animalStore = useAnimalStore()
const clientStore = useClientStore()
const typeStore = useTypeInterventionStore()
const interventionStore = useInterventionStore()

const animauxDuClient = computed(() => animalStore.getByClientId(clientId.value))

onMounted(() => {
  if (props.intervention) {
    const i = props.intervention
    const animal = animalStore.getById(i.animalId)
    clientId.value = animal?.clientId || ''
    animalId.value = animal?.id || ''
    typeNom.value = i.type || ''
    dateISO.value = i.start ? i.start.slice(0, 16) : ''
    duree.value = i.start && i.end ? (new Date(i.end) - new Date(i.start)) / 60000 : 30
    ajouterTraitement.value = !!i.traitement
    envoyerNotification.value = !!i.rappel
  } else if (props.dateInitiale) {
    const localDate = new Date(new Date(props.dateInitiale).getTime() - new Date().getTimezoneOffset() * 60000)
    dateISO.value = localDate.toISOString().slice(0, 16)
  }
})

watch(typeNom, (val) => {
  const t = typeStore.getByNom(val)
  if (t) {
    duree.value = t.duree
    envoyerNotification.value = val.toLowerCase().includes('vaccin')
    ajouterTraitement.value = val.toLowerCase().includes('chirurg')
    animalObligatoire.value = !val.toLowerCase().includes('terrain')
  }
})

watch(animalId, (val) => {
  const a = animalStore.getById(val)
  alerteTraitement.value = a?.traitements?.length > 0
})

watch(clientId, () => {
  animalId.value = ''
})

function valider() {
  if (!typeNom.value || !dateISO.value || (animalObligatoire.value && !animalId.value)) return

  const start = new Date(dateISO.value)
  const end = new Date(start.getTime() + duree.value * 60000)
  const type = typeStore.getByNom(typeNom.value)
  const animal = animalStore.getById(animalId.value)

  const data = {
    id: props.intervention?.id || Date.now(),
    typeId: type?.id || null,
    title: type?.icone + ' ' + (animal ? animal.nom : 'Intervention') + ' – ' + type?.nom,
    start: start.toISOString(),
    end: end.toISOString(),
    allDay: false,
    animalId: animal?.id || null,
    type: type?.nom || '',
    color: type?.couleur || '#cccccc',
    icone: type?.icone || '',
    traitement: ajouterTraitement.value,
    rappel: envoyerNotification.value
  }

  if (props.intervention) {
    interventionStore.modifier(data.id, data)
  } else {
    interventionStore.ajouter(data)
  }

  emit('close')
}
</script>
