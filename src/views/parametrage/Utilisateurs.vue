<template>
  <div class="page-utilisateurs">
    <div class="page-header">
      <h2>Gestion des utilisateurs</h2>
      <button class="btn btn-primary" @click="showModal = true">+ Ajouter un utilisateur</button>
    </div>

    <TableauGenerique
      :colonnes="colonnes"
      :donnees="[...utilisateurs]"
      @row-click="allerVersDroits"
      @clicDroit="ouvrirMenuContextuel"
      @delete="supprimer"
      @edit="modifier"
    />

    <ModalFormulaireGenerique
  v-if="showModal"
  :title="formUtilisateur ? 'Modifier utilisateur' : 'Ajouter un utilisateur'"
  :fields="fields"
  :initial-values="formUtilisateur"
  @saved="sauver"
  @close="fermerModale"
/>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import TableauGenerique from '@/components/TableauGenerique.vue'
import ModalFormulaireGenerique from '@/components/ModalFormulaireGenerique.vue'

const { utilisateurs, addUser, deleteUser } = useUserStore()
const router = useRouter()
const showModal = ref(false)

const roles = ['Admin', 'Vétérinaire', 'Assistante']

const colonnes = [
  { key: 'nom', label: 'Nom' },
  { key: 'email', label: 'Email' },
  { key: 'telephone', label: 'Téléphone' },
  { key: 'role', label: 'Rôle' }
]

const fields = [
  { key: 'nom', label: 'Nom complet', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'text', required: true },
  { key: 'telephone', label: 'Téléphone', type: 'text' },
  { key: 'role', label: 'Rôle', type: 'select', options: roles, required: true },
  { key: 'password', label: 'Mot de passe', type: 'text', required: true }
]
const formUtilisateur = ref(null)

const showContext = ref(false)
const contextPosition = ref({ x: 0, y: 0 })
const utilisateurActif = ref(null)

function ouvrirMenuContextuel({ event, ligne }) {
  utilisateurActif.value = ligne
  contextPosition.value = { x: event.clientX, y: event.clientY }
  showContext.value = true
}



function sauver(utilisateur) {
  if (formUtilisateur.value) {
    // MODIFIER
    const index = utilisateurs.value.findIndex(u => u.id === formUtilisateur.value.id)
    if (index !== -1) {
      utilisateurs.value[index] = { ...utilisateur, id: formUtilisateur.value.id }
    }
  } else {
    // AJOUTER
    addUser(utilisateur)
  }

  formUtilisateur.value = null
  showModal.value = false
}

function fermerModale() {
  showModal.value = false
  formUtilisateur.value = null
}



function supprimer(id) {
  deleteUser(id)
}

function allerVersDroits(user) {
  router.push(`/utilisateurs/${user.id}/droits`)
}

function modifier(utilisateur) {
  formUtilisateur.value = { ...utilisateur }
  showModal.value = true
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
