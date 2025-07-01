<template>
  <div class="modal-overlay">
    <div class="modal">
      <h3>Ajouter un type d’animal</h3>
      <form @submit.prevent="soumettre">
        <div class="form-group">
          <label>Nom :</label>
          <input v-model="nom" class="form-control" required />
        </div>
        <div class="modal-actions">
          <button type="submit" class="btn btn-primary">Enregistrer</button>
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineEmits(['saved', 'close'])

const nom = ref('')

function soumettre() {
  if (nom.value.trim()) {
    emit('saved', { nom: nom.value.trim() })
    nom.value = ''
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
}
</style>
