<template>
  <div class="form-container">
    <h3>Ajouter un type</h3>
    <form @submit.prevent="submit">
      <input v-model="type.nom" placeholder="Nom du type" class="form-input" required />
      <input v-model="type.categorie" placeholder="Catégorie" class="form-input" />
      <textarea v-model="type.description" placeholder="Description" class="form-input" />
      <div class="form-actions">
        <button class="btn btn-primary" type="submit">Ajouter</button>
        <button class="btn btn-cancel" type="button" @click="$emit('close')">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const emit = defineEmits(['saved', 'close'])

const type = reactive({
  nom: '',
  categorie: '',
  description: ''
})

function submit() {
  emit('saved', { ...type })
}
</script>
