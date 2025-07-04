<template>
  <div v-if="animal" class="fiche-page">
    <h2>Fiche médicale de {{ animal.nom }}</h2>

    <!-- Identité -->
    <section class="bloc">
      <h3>Identité</h3>
      <ul>
        <li><strong>Nom :</strong> {{ animal.nom }}</li>
        <li><strong>Espèce :</strong> {{ animal.espece }}</li>
        <li><strong>Race :</strong> {{ animal.breed }}</li>
        <li><strong>Âge :</strong> {{ animal.age }} ans</li>
        <li><strong>Sexe :</strong> {{ animal.sexe }}</li>
        <li><strong>Propriétaire :</strong> {{ client?.prenom }} {{ client?.nom }}</li>
      </ul>
    </section>

    <!-- Interventions -->
    <section class="bloc">
      <h3>🩺 Interventions</h3>
      <ul v-if="fiche.interventions?.length">
        <li v-for="i in fiche.interventions" :key="i.id">
          <strong>{{ formatDate(i.date) }}</strong> — {{ i.type }}<br />
          <small>{{ i.observations }}</small>
        </li>
      </ul>
      <p v-else>Aucune intervention enregistrée.</p>
    </section>

    <!-- Traitements -->
    <section class="bloc">
      <h3>💊 Traitements actifs</h3>
      <ul v-if="fiche.traitements?.length">
        <li v-for="t in fiche.traitements" :key="t.id">
          <strong>{{ t.type }}</strong> — {{ t.posologie }} pendant {{ t.duree }} jours<br />
          <small>Début : {{ formatDate(t.debut) }} — {{ t.actif ? '🟢 Actif' : '🔘 Terminé' }}</small>
        </li>
      </ul>
      <p v-else>Aucun traitement actif.</p>
    </section>

    <!-- Rappels -->
    <section class="bloc">
      <h3>📬 Rappels vaccinaux</h3>
      <ul v-if="fiche.rappels?.length">
        <li v-for="r in fiche.rappels" :key="r.type">
          {{ r.type }} — prochain : {{ formatDate(r.prochain) }}
          <span v-if="r.rappelAutomatique">🔔</span>
        </li>
      </ul>
      <p v-else>Aucun rappel programmé.</p>
    </section>

    <!-- Notes -->
    <section class="bloc">
      <h3>📝 Notes cliniques</h3>
      <p><strong>Comportement :</strong> {{ fiche.notes?.comportement || '—' }}</p>
      <p><strong>Allergies :</strong> {{ fiche.notes?.allergies?.join(', ') || '—' }}</p>
      <p><strong>Recommandations :</strong> {{ fiche.notes?.recommandations || '—' }}</p>
    </section>

    <!-- Documents -->
    <section class="bloc">
      <h3>📁 Documents médicaux</h3>
      <ul v-if="fiche.documents?.length">
        <li v-for="doc in fiche.documents" :key="doc.url">
          {{ doc.type }} — {{ formatDate(doc.date) }}
          <a :href="doc.url" target="_blank">🔗 Ouvrir</a>
        </li>
      </ul>
      <p v-else>Aucun document ajouté.</p>
    </section>
  </div>

  <div v-else>
    <h2>⚠️ Aucun animal trouvé avec l’identifiant : {{ animalId }}</h2>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAnimalStore } from '@/stores/useAnimalStore'
import { useClientStore } from '@/stores/useClientStore'

const route = useRoute()
const animalId = Number(route.params.animalId) // ✅ Cohérent avec la route

const { animals } = useAnimalStore()
const { clients } = useClientStore()

const animal = computed(() => animals.find(a => a.id === animalId))
const fiche = computed(() => animal.value?.ficheMedicale || {})
const client = computed(() => clients.find(c => c.id === animal.value?.clientId))

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR')
}
</script>

<style scoped>
.fiche-page {
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}
.bloc {
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}
.bloc h3 {
  font-size: 18px;
  margin-bottom: 0.8rem;
  color: #495057;
}
ul {
  padding-left: 1rem;
}
li {
  margin-bottom: 0.6rem;
}
a {
  margin-left: 10px;
  color: #007bff;
  font-size: 14px;
}
</style>
