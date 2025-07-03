<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-right">
      <h3>{{ title }}</h3>

      <Transition name="slide-fade" appear>
        <form @submit.prevent="handleSubmit" class="form-container">
          <div v-for="field in fields" :key="field.key" class="form-group">
            <label :for="field.key">{{ field.label }}</label>

            <input
              v-if="field.type === 'text' || field.type === 'number'"
              :type="field.type"
              v-model="form[field.key]"
              :id="field.key"
              :required="field.required"
            />
            <select
              v-else-if="field.type === 'select'"
              v-model="form[field.key]"
              :id="field.key"
              :required="field.required"
            >
              <option disabled value="">Choisir...</option>
              <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Valider</button>
            <button type="button" class="btn btn-light" @click="$emit('close')">Annuler</button>
          </div>
        </form>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const emit = defineEmits(['saved', 'close'])
const props = defineProps({
  title: String,
  fields: Array,
  initialValues: { type: Object, default: () => ({}) },
  ownerId: Number,
  ownerName: String
})

const form = ref({})

watchEffect(() => {
  if (props.fields?.length) {
    // ⚠️ Ne pas remplacer form.value, mais le modifier (réactivité préservée)
    props.fields.forEach(field => {
      form.value[field.key] = props.initialValues?.[field.key] ?? ''
    })
  }
})

function handleSubmit() {
  emit('saved', {
    ...form.value,
    ownerId: props.ownerId,
    ownerName: props.ownerName,
    id: props.initialValues?.id ?? Date.now()
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}
.modal-right {
  width: 320px;
  background: white;
  padding: 1.2rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.form-group {
  margin-bottom: 0.9rem;
}
input,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1rem;
}
.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
}
.btn-light {
  background-color: #f5f5f5;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.form-group:first-of-type {
  margin-top: 66px;
}
</style>
