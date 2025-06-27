<template>
  <div class="form-container">
    <h3>{{ localAnimal.id ? 'Modifier' : 'Ajouter' }} un animal</h3>
    <form @submit.prevent="submit">
      <input v-model="localAnimal.name" placeholder="Nom" class="form-input" required />
      <input v-model="localAnimal.species" placeholder="Espèce" class="form-input" required />
      <input v-model="localAnimal.owner" placeholder="Propriétaire" class="form-input" required />

      <div class="form-group">
        <label>Type</label>
        <div style="display: flex; gap: 8px">
          <select v-model="localAnimal.typeId" required class="form-input">
            <option disabled value="">Choisir un type</option>
            <option v-for="type in types" :key="type.id" :value="type.id">
              {{ type.nom }}
            </option>
          </select>
          <button class="btn btn-secondary small" type="button" @click="$emit('add-type')">
            ⚙️
          </button>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Valider</button>
        <button type="button" class="btn btn-cancel" @click="$emit('cancel')">Annuler</button>
      </div>

    </form>
  </div>
</template>

<script setup>
import '@/assets/animals.css'
import { reactive, watch } from 'vue'
const props = defineProps({
  initialAnimal: Object,
  types: Array
})
const emit = defineEmits(['saved', 'close', 'add-type'])

const localAnimal = reactive({
  id: null,
  name: '',
  species: '',
  owner: '',
  typeId: ''
})

watch(() => props.initialAnimal, (newVal) => {
  if (newVal) Object.assign(localAnimal, newVal)
})

function submit() {
  emit('saved', { ...localAnimal })
}
</script>
