<template>
  <div class="page-utilisateurs" @click="showContext = false">
    <div class="page-header">
      <h2>Gestion des utilisateurs</h2>
      <button class="btn btn-primary" @click="ajouterUtilisateur">+ Ajouter un utilisateur</button>
    </div>

    <TableauGenerique
      :colonnes="colonnes"
      :donnees="[...utilisateurs]"
      @row-click="ouvrirDroits"
      @clicDroit="ouvrirMenuContextuel"
     

    />

    <ModalFormulaireGenerique
      v-if="showModal"
      :title="formUtilisateur ? 'Modifier utilisateur' : 'Ajouter un utilisateur'"
      :fields="fields"
      :initial-values="formUtilisateur"
      @saved="sauver"
      @close="fermerModale"
    />
    <ModalDroitsAcces
      v-if="showDroits"
      :utilisateur="utilisateurDroits"
      :droits-disponibles="droitsDisponibles"
      :droits-actuels="droitsParUtilisateur[utilisateurDroits?.id] || []"
      @update="updateDroits"
      @close="showDroits = false"
    />


    <div
      v-if="showContext"
      class="context-menu"
      :style="{ top: contextPosition.y + 'px', left: contextPosition.x + 'px' }"
    >
      <button @click="modifier(utilisateurActif); showContext = false">Modifier</button>
      <button @click="supprimer(utilisateurActif.id); showContext = false">Supprimer</button>
    </div>
  </div>
</template>

<script setup>
import ModalDroitsAcces from '@/components/ModalDroitsAcces.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import TableauGenerique from '@/components/TableauGenerique.vue'
import ModalFormulaireGenerique from '@/components/ModalFormulaireGenerique.vue'
import { onMounted } from 'vue'

onMounted(() => {
  if (utilisateurs.value.length === 0) {
    addUser({
      nom: 'Jean Martin',
      email: 'jean.martin@example.com',
      telephone: '0606060606',
      role: 'Assistante',
      password: 'azerty123'
    })
  }
})

const { utilisateurs, addUser, deleteUser } = useUserStore()
const router = useRouter()

const showModal = ref(false)
const showContext = ref(false)
const contextPosition = ref({ x: 0, y: 0 })
const utilisateurActif = ref(null)
const formUtilisateur = ref(null)

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

function ajouterUtilisateur() {
  formUtilisateur.value = null
  showModal.value = true
}

function modifier(utilisateur) {
  formUtilisateur.value = { ...utilisateur }
  showModal.value = true
}

function supprimer(id) {
  deleteUser(id)
}

function sauver(utilisateur) {
  if (formUtilisateur.value) {
    const index = utilisateurs.value.findIndex(u => u.id === formUtilisateur.value.id)
    if (index !== -1) {
      utilisateurs.value[index] = { ...utilisateur, id: formUtilisateur.value.id }
    }
  } else {
    addUser(utilisateur)
  }
  formUtilisateur.value = null
  showModal.value = false
}

function fermerModale() {
  showModal.value = false
  formUtilisateur.value = null
}

function allerVersDroits(user) {
  router.push(`/utilisateurs/${user.id}/droits`)
}

function ouvrirMenuContextuel({ event, ligne }) {
  utilisateurActif.value = ligne
  contextPosition.value = { x: event.clientX, y: event.clientY }
  showContext.value = true
}
const showDroits = ref(false)
const utilisateurDroits = ref(null)

function ouvrirDroits(user) {
  utilisateurDroits.value = user
  showDroits.value = true
}
const droitsDisponibles = ['Voir animaux', 'Gérer utilisateurs', 'Modifier factures']
const droitsParUtilisateur = ref({}) // { [userId]: ['Voir animaux', ...] }

function updateDroits({ id, droits }) {
  droitsParUtilisateur.value[id] = droits
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
.context-menu {
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  border-radius: 4px;
  padding: 0.25rem 0;
  z-index: 9999;
}
.context-menu button {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  background-color: #e6f1ff; /* Bleu très clair */
  color: #003f88; /* Bleu plus foncé pour contraste */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s ease;
}

.context-menu button:hover {
  background-color: #d2e7ff;
}

</style>
