<template>
  <div class="page-animaux-par-type">
    <h2>Animaux de type "{{ typeActuel?.nom || 'Inconnu' }}"</h2>

    <div v-if="animauxFiltres.length === 0" class="no-data">
      Aucun animal trouvé pour ce type.
    </div>

    <TableauGenerique
      v-else
      :colonnes="colonnes"
      :donnees="animauxFiltres"
    />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAnimalStore } from '@/stores/useAnimalStore'
import { computed } from 'vue'
import TableauGenerique from '@/components/TableauGenerique.vue'

const route = useRoute()
const { animals, types } = useAnimalStore()

const typeId = computed(() => Number(route.params.typeId))
const typeActuel = computed(() => types.find(t => t.id === typeId.value))

const animauxFiltres = computed(() =>
  animals.filter(a => a.espece === typeActuel.value?.nom)
)

const colonnes = [
  { key: 'nom', label: 'Nom' },
  { key: 'age', label: 'Âge' },
  { key: 'sexe', label: 'Sexe' },
  { key: 'espece', label: 'Espèce' },
  { key: 'breed', label: 'Race' },
  { key: 'quantite', label: 'Quantité' },
  { key: 'clientId', label: 'ID Client' }
]
</script>

<style scoped>
.page-animaux-par-type {
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
}
h2 {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.3px;
  margin-bottom: 1rem;
}
.no-data {
  text-align: center;
  padding: 1rem;
  color: #888;
}
</style>
