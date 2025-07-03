<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-card">
      <h2 class="modal-title">
        {{ intervention ? 'Modifier intervention' : 'Nouvelle intervention' }}
      </h2>

      <form @submit.prevent="valider" class="modal-form">
        <!-- Client -->
        <label>
          Client :
          <select v-model="clientId" class="input" required>
            <option disabled value="">Choisir un client</option>
            <option v-for="c in clientStore.clients" :key="c.id" :value="c.id">
              {{ c.nom }} {{ c.prenom }}
            </option>
          </select>
        </label>

        <!-- Animal du client -->
        <label>
          Animal :
          <select v-model="animalId" :required="animalObligatoire" class="input">
            <option disabled value="">Choisir un animal</option>
            <option v-for="a in animauxDuClient" :key="a.id" :value="a.id">
              {{ a.nom }} ({{ a.espece }})
            </option>
          </select>
        </label>

        <div v-if="animauxDuClient.length === 0 && clientId" class="alert">
          ⚠️ Ce client n’a pas encore d’animal enregistré.
        </div>

        <!-- Type -->
        <label>
          Type d’intervention :
          <select v-model="typeNom" class="input" required>
            <option disabled value="">Type</option>
            <option v-for="t in typeStore.types" :key="t.id" :value="t.nom">
              {{ t.icone }} {{ t.nom }}
            </option>
          </select>
        </label>

        <!-- Date et durée -->
        <label>
          Date :
          <input type="datetime-local" v-model="dateISO" class="input" required />
        </label>

        <label>
          Durée (min) :
          <input type="number" v-model.number="duree" class="input" min="5" step="5" />
        </label>

        <!-- Options -->
        <label>
          <input type="checkbox" v-model="ajouterTraitement" />
          Ajouter traitement associé
        </label>
        <label>
          <input type="checkbox" v-model="envoyerNotification" />
          Envoyer une notification
        </label>

        <div v-if="alerteTraitement" class="alert">
          ⚠️ Cet animal est sous traitement actif.
        </div>

        <!-- Actions -->
        <div class="actions">
          <button type="button" class="btn btn-cancel" @click="$emit('close')">Annuler</button>
          <button type="submit" class="btn btn-confirm">Valider</button>
        </div>
      </form>
    </div>
  </div>
</template>

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

const animalStore = useAnimalStore()
const clientStore = useClientStore()
const typeStore = useTypeInterventionStore()
const interventionStore = useInterventionStore()

const clientId = ref('')
const animalId = ref('')
const typeNom = ref('')
const dateISO = ref('')
const duree = ref(30)
const ajouterTraitement = ref(false)
const envoyerNotification = ref(false)
const alerteTraitement = ref(false)
const animalObligatoire = ref(true)

const animauxDuClient = computed(() =>
  animalStore.getByClientId(clientId.value)
)

onMounted(() => {
  if (props.intervention) {
    const i = props.intervention
    const animal = animalStore.getById(i.animalId)
    clientId.value = animal?.clientId || ''
    animalId.value = animal?.id || ''
    typeNom.value = i.type
    dateISO.value = i.start.slice(0, 16)
    duree.value = (new Date(i.end) - new Date(i.start)) / 60000
    ajouterTraitement.value = i.traitement
    envoyerNotification.value = i.rappel
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
    title: type.icone + ' ' + (animal ? animal.nom : 'Intervention') + ' – ' + type.nom,
    start: start.toISOString(),
    end: end.toISOString(),
    allDay: false,
    animalId: animal?.id || null,
    type: type.nom,
    couleur: type.couleur,
    icone: type.icone,
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

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}
.modal-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 420px;
  max-width: 90vw;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
}
.modal-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1.2rem;
  text-align: center;
  color: #333;
}
.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.input {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #dfe3e8;
  background-color: #f8f9fa;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
}
.alert {
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 8px 12px;
  font-size: 13px;
  border-radius: 6px;
  color: #856404;
}
.actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 1rem;
}
.btn {
  flex: 1;
  padding: 10px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  border: none;
}
.btn-confirm {
  background-color: #7a9cc6;
  color: white;
}
.btn-cancel {
  background-color: #f0f0f0;
  color: #555;
}
</style>
