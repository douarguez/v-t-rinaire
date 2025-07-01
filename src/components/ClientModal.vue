<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-right">
      <h3>Ajouter un client</h3>

      <form @submit.prevent="submit" style="margin-top: 0.5rem;">
        <input v-model="client.nom" placeholder="Nom" required />
        <input v-model="client.prenom" placeholder="Prénom" required />
        <input v-model="client.adresse" placeholder="Adresse" />
        <input v-model="client.email" placeholder="Email" />
        <input v-model="client.telephone" placeholder="Téléphone" />

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Enregistrer</button>
          <button type="button" class="btn btn-light" @click="$emit('close')">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['saved', 'close'])

const client = ref({
  nom: '',
  prenom: '',
  adresse: '',
  email: '',
  telephone: ''
})

function submit() {
  emit('saved', { ...client.value, id: Date.now() })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.modal-right {
 margin-top: 100px;
  width: 380px;
  height: 100%;
  background: white;
  padding: 2rem;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Inter', sans-serif;
  overflow-y: auto;
}

h3 {
  margin: 0 0 1rem 0;
  font-size: 18px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.2rem 0.6rem;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
}

.form-actions {
  display: flex;
  gap: 0.3rem;
  margin-top: 0.3rem;
}

.btn {
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-light {
  background-color: #f5f5f5;
  color: #333;
}
</style>
