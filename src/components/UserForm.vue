<template>
  <div class="form-container">
    <h3 class="form-title">
      {{ user.nom ? 'Modifier' : 'Ajouter' }} un utilisateur
    </h3>
    <form @submit.prevent="submitForm" class="form-body">
      <input v-model="user.nom" placeholder="Nom et prénom" class="form-input" required />
      <input v-model="user.email" type="email" placeholder="Email" class="form-input" required />
      <input v-model="user.password" type="password" placeholder="Mot de passe" class="form-input" required />
      <select v-model="user.role" class="form-input" required>
        <option disabled value="">Choisir un rôle</option>
        <option>administrateur</option>
        <option>veterinaire</option>
        <option>assistant</option>
      </select>

      <div class="form-actions">
        <button type="submit" class="btn-confirm">Valider</button>
        <button type="button" @click="$emit('close')" class="btn-cancel">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      user: {
        nom: '',
        email: '',
        password: '',
        role: '',
      },
    }
  },
  watch: {
    initialUser: {
      immediate: true,
      handler(newVal) {
        if (newVal) this.user = { ...newVal }
      },
    },
  },
  methods: {
    submitForm() {
      this.$emit('add-user', this.user)
    },
  },
}
</script>

<style scoped>
@import '@/assets/user-form.css';
</style>