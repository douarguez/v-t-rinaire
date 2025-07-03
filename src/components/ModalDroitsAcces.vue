<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-right">
      <h3>Droits d’accès — {{ utilisateur.nom }}</h3>
      <form @submit.prevent="valider">
        <div v-for="droit in droitsDisponibles" :key="droit" class="checkbox">
          <label>
            <input
              type="checkbox"
              :value="droit"
              v-model="droitsSelectionnes"
            />
            {{ droit }}
          </label>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Valider</button>
          <button type="button" class="btn btn-light" @click="$emit('close')">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  utilisateur: { type: Object, required: true },
  droitsDisponibles: { type: Array, default: () => [] },
  droitsActuels: { type: Array, default: () => [] }
})
const emit = defineEmits(['update', 'close'])

const droitsSelectionnes = ref([])

watch(
  () => props.droitsActuels,
  (val) => {
    droitsSelectionnes.value = [...val]
  },
  { immediate: true }
)

function valider() {
  emit('update', {
    id: props.utilisateur.id,
    droits: droitsSelectionnes.value
  })
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(6px);
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}
.modal-right {
  width: 320px;
  background: white;
  padding: 1.2rem 1.5rem;
  overflow-y: auto;
}
.checkbox {
  margin-bottom: 0.75rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
.btn-light {
  background-color: #f5f5f5;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
</style>
