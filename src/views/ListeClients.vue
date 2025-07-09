<template>
  <div class="page-clients">
    <div class="page-header">
      <h2>Liste des clients</h2>
      <v-btn color="primary" @click="showModal = true">+ Ajouter un client</v-btn>
    </div>

    <TableauGenerique
      :colonnes="colonnes"
      :donnees="clients"
      @ligneClick="allerVersAnimaux"
    />

    <ClientModal
      v-if="showModal"
      @saved="ajouterClient"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useClientStore } from '@/stores/useClientStore'
import TableauGenerique from '@/components/TableauGenerique.vue'
import ClientModal from '@/components/ClientModal.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function allerVersAnimaux(client) {
  console.log('Client cliqué :', client)
  // Utilise id ou numero comme identifiant, selon ce qui est disponible
  const clientId = client.id || client.numero
  if (clientId) {
    router.push({ name: 'AnimauxClient', params: { id: clientId } })
  } else {
    console.error('Aucun ID ou numéro trouvé pour le client:', client)
  }
}

const showModal = ref(false)
const { clients, addClient } = useClientStore()

const colonnes = [
  { key: 'nom', label: 'Nom' },
  { key: 'prenom', label: 'Prénom' },
  { key: 'adresse', label: 'Adresse' },
  { key: 'email', label: 'Email' },
  { key: 'telephone', label: 'Téléphone' }
]

function ajouterClient(client) {
  addClient(client)
  showModal.value = false
}
</script>

<style scoped>
.page-clients {
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.3px;
  margin: 0;
}
</style>