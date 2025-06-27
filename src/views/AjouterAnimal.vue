<template>
  <div class="animals-container">
    <h2>Ajouter un animal</h2>

    <AnimalForm
      :types="types"
      @saved="handleSaved"
      @cancel="goBack"
      @add-type="showTypeForm = true"
    />

    <TypeForm
      v-if="showTypeForm"
      @saved="handleNewType"
      @close="showTypeForm = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AnimalForm from '@/components/AnimalForm.vue'
import TypeForm from '@/components/TypeForm.vue'
import { useAnimalStore } from '@/stores/useAnimalStore'
import '@/assets/animals.css'

const router = useRouter()
const store = useAnimalStore()
const { types, addAnimal, addType } = store

const showTypeForm = ref(false)

function handleSaved(animal) {
  addAnimal(animal)
  router.push('/animaux')
}

function handleNewType(type) {
  addType(type)
  showTypeForm.value = false
}

function goBack() {
  router.push('/animaux')
}
</script>
