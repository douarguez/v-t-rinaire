<template>
  <div class="users-container">
    <h2 class="users-title">Gestion des utilisateurs</h2>
    <button @click="openAddForm" class="btn-primary">
      + Ajouter un utilisateur
    </button>

    <table v-if="users.length" class="users-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Rôle</th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ user.nom }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td class="actions">
            <button @click="editUser(index)" class="btn-edit">Modifier</button>
            <button @click="deleteUser(index)" class="btn-delete">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <UserForm
      v-if="showForm"
      :initial-user="editingUser"
      @close="closeForm"
      @add-user="addOrUpdateUser"
    />
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'

export default {
  components: { UserForm },
  data() {
    return {
      users: [],
      showForm: false,
      editingIndex: null,
      editingUser: null,
    }
  },
  methods: {
    openAddForm() {
      this.editingUser = null
      this.editingIndex = null
      this.showForm = true
    },
    editUser(index) {
      this.editingUser = { ...this.users[index] }
      this.editingIndex = index
      this.showForm = true
    },
    deleteUser(index) {
      if (confirm("Confirmer la suppression ?")) {
        this.users.splice(index, 1)
      }
    },
    addOrUpdateUser(user) {
      if (this.editingIndex !== null) {
        this.users[this.editingIndex] = user
      } else {
        this.users.push(user)
      }
      this.closeForm()
    },
    closeForm() {
      this.showForm = false
      this.editingUser = null
      this.editingIndex = null
    },
  },
}
</script>

<style scoped>
@import '@/assets/users.css';
</style>