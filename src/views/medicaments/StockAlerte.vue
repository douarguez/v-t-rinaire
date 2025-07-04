<template>
  <v-app>
    <v-main class="background-full">
      <v-container class="d-flex align-center justify-center fill-container">
        <v-card class="pa-8 card-style" elevation="8" rounded="xl">
          <!-- Titre centré -->
          <div class="text-center mb-6">
            <v-icon size="44" color="success" class="mb-2">mdi-bell-alert-outline</v-icon>
            <h1 class="text-h4 font-weight-bold text-green-darken-4">Alerte de stock</h1>
          </div>

          <!-- Statistiques avec dégradé de vert -->
          <v-row dense class="mb-6">
            <v-col cols="12" sm="6">
              <v-sheet class="pa-4 text-white text-body-1 rounded-lg stat-box" :style="greenGradient1">
                Produits surveillés : <strong>{{ produitsSurveilles.length }}</strong>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="6">
              <v-sheet class="pa-4 text-white text-body-1 rounded-lg stat-box" color="red-darken-2">
                Stock critique : <strong>{{ produitsCritiques.length }}</strong>
              </v-sheet>
            </v-col>
          </v-row>

          <!-- Alerte ou message succès -->
          <v-alert
            v-if="produitsCritiques.length > 0"
            type="warning"
            variant="outlined"
            class="mb-4 text-body-1"
            rounded="md"
          >
            <strong>{{ produitsCritiques.length }}</strong> médicament(s) ont atteint le stock critique.
          </v-alert>

          <v-alert
            v-else
            type="success"
            variant="outlined"
            class="mb-4 text-body-1"
            rounded="md"
          >
            ✅ Tous les médicaments sont disponibles en quantité suffisante.
          </v-alert>

          <!-- Bouton centré -->
          <div class="text-center mt-4">
            <v-btn
              v-if="produitsCritiques.length > 0"
              color="green-darken-2"
              size="large"
              rounded="xl"
              class="text-white px-6"
              prepend-icon="mdi-autorenew"
              @click="dialog = true"
            >
              Renouveler le stock
            </v-btn>
          </div>
        </v-card>
      </v-container>

      <!-- Modal -->
      <v-dialog v-model="dialog" max-width="480" persistent>
        <v-card rounded="xl" class="pa-5">
          <v-card-title class="text-h6 font-weight-bold">
            Confirmer le renouvellement
          </v-card-title>
          <v-card-text>
            Souhaitez-vous vraiment renouveler le stock des médicaments critiques ?
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="dialog = false">Annuler</v-btn>
            <v-btn color="green" variant="flat" @click="confirmerRenouvellement">Confirmer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ✅ Snackbar -->
      <v-snackbar
        v-model="snackbar"
        color="success"
        location="top"
        timeout="3000"
        rounded="lg"
      >
        ✅ Stock renouvelé avec succès.
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const snackbar = ref(false)

const produitsSurveilles = ref([
  { nom: 'Doliprane', quantite: 100, seuil: 50 },
  { nom: 'Paracétamol', quantite: 20, seuil: 30 },
  { nom: 'Ibuprofène', quantite: 60, seuil: 40 },
  { nom: 'Efferalgan', quantite: 15, seuil: 20 },
])

const produitsCritiques = produitsSurveilles.value.filter(p => p.quantite <= p.seuil)

const confirmerRenouvellement = () => {
  dialog.value = false
  snackbar.value = true
}

// 🎨 Dégradé vert (inline style pour le v-sheet)
const greenGradient1 = {
  background: 'linear-gradient(45deg, #34d399, #10b981)',
}
</script>

<style scoped>
.background-full {
  min-height: 100vh;
  background-color: #f0fdf4;
  padding: 0;
}

.fill-container {
  min-height: 100vh;
  width: 100%;
  padding: 0;
}

.card-style {
  width: 80vw;
  height: 80vh;
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-box {
  font-size: 16px;
  font-weight: 500;
}
</style>
