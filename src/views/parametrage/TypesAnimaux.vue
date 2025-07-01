<template>
  <div class="page-types-animaux">
    <div class="page-header">
      <h2>Types d’animaux</h2>
      <button class="btn btn-primary" @click="showModal = true">+ Ajouter un type</button>
    </div>

    <TableauGenerique
      :colonnes="colonnes"
      :donnees="[...types]"
    />

    <AnimalModalGenerique
      v-if="showModal"
      :title="'Ajouter un type d’animal'"
      :fields="fieldsType"
      @saved="ajouterType"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAnimalStore } from '@/stores/useAnimalStore'
import TableauGenerique from '@/components/TableauGenerique.vue'
import AnimalModalGenerique from '@/components/ModalFormulaireGenerique.vue'

const { types, addType } = useAnimalStore()

const colonnes = [
  { key: 'nom', label: 'Nom du type' }
]

const fieldsType = [
  { key: 'nom', label: 'Nom du type', type: 'text', required: true }
]

const showModal = ref(false)

function ajouterType(type) {
  addType(type)
  showModal.value = false
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 0.45rem 1rem;
  font-size: 13px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
</style>
