<template>
  <div v-if="animal" class="fiche-page">
    <h2 class="text-h5 font-weight-medium mb-6">🐾 Fiche médicale de {{ animal.nom }}</h2>

    <!-- Bloc Identité -->
    <v-card class="bloc">
      <div class="bloc-header">
        <h3 class="bloc-titre">🐾 Animal</h3>
        <v-btn icon size="small" @click="editSection('identite')"><v-icon>mdi-pencil</v-icon></v-btn>
      </div>
      <ul>
        <li><strong>Nom :</strong> {{ animal.nom }}</li>
        <li><strong>Espèce :</strong> {{ animal.espece }}</li>
        <li><strong>Race :</strong> {{ animal.race || animal.breed }}</li>
        <li><strong>Sexe :</strong> {{ animal.sexe }}</li>
        <li><strong>Date de naissance :</strong> {{ formatDate(animal.naissance) }}</li>
        <li><strong>Poids :</strong> {{ animal.poids }} kg</li>
        <li><strong>Identifiant :</strong> Puce n° {{ animal.identifiant || '—' }}</li>
      </ul>
    </v-card>

    <!-- Propriétaire -->
    <v-card class="bloc">
      <div class="bloc-header">
        <h3 class="bloc-titre">👤 Propriétaire</h3>
        <v-btn icon size="small" @click="editSection('proprietaire')"><v-icon>mdi-pencil</v-icon></v-btn>
      </div>
      <ul v-if="client">
        <li><strong>Nom :</strong> {{ client.nom }} {{ client.prenom }}</li>
        <li><strong>Téléphone :</strong> {{ client.telephone }}</li>
        <li><strong>Email :</strong> {{ client.email }}</li>
      </ul>
      <p v-else class="text-grey">Aucun propriétaire enregistré.</p>
    </v-card>

    <!-- Antécédents -->
    <v-card class="bloc">
      <div class="bloc-header">
        <h3 class="bloc-titre">🩺 Antécédents</h3>
        <v-btn icon size="small" @click="editSection('antecedents')"><v-icon>mdi-pencil</v-icon></v-btn>
      </div>
      <ul v-if="fiche.antecedents?.length">
        <li v-for="a in fiche.antecedents" :key="a">{{ a }}</li>
      </ul>
      <p v-else class="text-grey">Aucun antécédent enregistré.</p>
    </v-card>

    <!-- Vaccins -->
    <v-card class="bloc">
      <div class="bloc-header">
        <h3 class="bloc-titre">💉 Vaccins</h3>
        <v-btn icon size="small" @click="editSection('vaccins')"><v-icon>mdi-pencil</v-icon></v-btn>
      </div>
      <ul v-if="fiche.vaccins?.length">
        <li v-for="v in fiche.vaccins" :key="v.type">
          {{ v.type }} : {{ formatDate(v.date) }} — Rappel : {{ formatDate(v.rappel) }}
        </li>
      </ul>
      <p v-else class="text-grey">Aucun vaccin enregistré.</p>
    </v-card>

    <!-- Traitements -->
    <v-card class="bloc">
      <div class="bloc-header">
        <h3 class="bloc-titre">💊 Traitements en cours</h3>
        <v-btn icon size="small" @click="editSection('traitements')"><v-icon>mdi-pencil</v-icon></v-btn>
      </div>
      <ul v-if="fiche.traitements?.length">
        <li v-for="t in fiche.traitements" :key="t.id">
          {{ t.nom }} — Dernière prise : {{ formatDate(t.dateDernierePrise) }}
        </li>
      </ul>
      <p v-else class="text-grey">Aucun traitement actif.</p>
    </v-card>

    <!-- Dernière consultation -->
    <v-card class="bloc" v-if="fiche.derniereConsultation">
      <div class="bloc-header">
        <h3 class="bloc-titre">📅 Dernière consultation</h3>
      </div>
      <p>{{ formatDate(fiche.derniereConsultation.date) }} : {{ fiche.derniereConsultation.objet }}</p>
    </v-card>

    <!-- Historique -->
    <v-card class="bloc">
      <div class="bloc-header">
        <h3 class="bloc-titre">📖 Historique des interventions</h3>
        <v-btn icon size="small" @click="editSection('interventions')"><v-icon>mdi-pencil</v-icon></v-btn>
      </div>
      <ul v-if="fiche.interventions?.length">
        <li v-for="i in fiche.interventions" :key="i.id">
          <strong>{{ formatDate(i.date) }}</strong> — {{ i.type }}<br />
          <small>{{ i.observations || '—' }}</small>
        </li>
      </ul>
      <p v-else class="text-grey">Aucune intervention enregistrée.</p>
    </v-card>

    <!-- Modale édition future -->
    <!-- <ModalEditionFiche
      v-if="sectionEnEdition"
      :section="sectionEnEdition"
      :data="fiche.value[sectionEnEdition]"
      @close="fermerEdition"
      @save="sauvegarderSection"
    /> -->
  </div>

  <div v-else>
    <h2 class="text-warning">⚠️ Aucun animal trouvé avec l’identifiant : {{ animalId }}</h2>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useAnimalStore } from '@/stores/useAnimalStore'
import { useClientStore } from '@/stores/useClientStore'

const route = useRoute()
const animalId = Number(route.params.animalId)

const { animals, modifier } = useAnimalStore()
const { clients } = useClientStore()

const animal = computed(() => animals.find(a => a.id === animalId))
const fiche = computed(() => animal.value?.ficheMedicale || {})
const client = computed(() => clients.find(c => c.id === animal.value?.clientId))

function formatDate(dateStr) {
  return dateStr ? new Date(dateStr).toLocaleDateString('fr-FR') : '—'
}

const sectionEnEdition = ref(null)
function editSection(section) {
  sectionEnEdition.value = section
}
</script>

<style scoped>
.fiche-page {
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}
.bloc {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 1.5rem;
}
.bloc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bloc-titre {
  font-size: 18px;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}
ul {
  padding-left: 0.5rem;
}
li {
  margin-bottom: 0.6rem;
}
.text-grey {
  color: #7f8c8d;
}
.text-warning {
  color: #f39c12;
}
</style>
