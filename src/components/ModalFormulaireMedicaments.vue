<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-right">
      <h3>{{ title }}</h3>

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
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">✅ Valider</button>
          <button type="button" class="btn btn-light" @click="$emit('close')">❌ Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  title: String,
  fields: Array,
  initialValues: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['saved', 'close'])

const form = ref({})

watchEffect(() => {
  const base = {}
  props.fields.forEach((f) => {
    base[f.key] = props.initialValues?.[f.key] ?? ''
  })
  form.value = base
})

function handleSubmit() {
  emit('saved', {
    ...form.value,
    id: props.initialValues?.id ?? Date.now()
  })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}
.modal-right {
  width: 400px;
  height: 100%;
  background: #fff;
  padding: 2rem 1.5rem;
  overflow-y: auto;
}
.form-group {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
}
.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
}
.btn-light {
  background-color: #f5f5f5;
}
</style>
