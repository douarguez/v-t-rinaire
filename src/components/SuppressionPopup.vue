<template>
  <div class="popup-overlay" @click.self="$emit('close')">
    <div class="popup-box">
      <h3>❗ Confirmation</h3>
      <p>Voulez-vous vraiment supprimer <strong>{{ nom }}</strong> ?</p>
      <div class="actions">
        <button class="btn btn-danger" @click="$emit('confirm')">Oui, supprimer</button>
        <button class="btn btn-cancel" @click="$emit('close')">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ nom: String })
defineEmits(['confirm', 'close'])
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.popup-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-cancel {
  background-color: #f5f5f5;
}
</style>
