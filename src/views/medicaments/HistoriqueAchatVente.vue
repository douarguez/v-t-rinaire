<template>
  <div class="historique-wrapper">
    <!-- Titre + Sélecteur -->
    <div class="header">
      <h2>Historique des transactions</h2>
      <select v-model="typeHistorique" @change="changerType" class="select-type">
        <option value="achat">Historique d'achat</option>
        <option value="vente">Historique de vente</option>
      </select>
    </div>

    <!-- Barre de recherche -->
    <div class="search-bar">
      <CIcon icon="cil-search" class="search-icon" />
      <input
        v-model="recherche"
        type="text"
        placeholder="Rechercher par nom de médicament ou utilisateur..."
      />
    </div>

    <!-- Tableau -->
    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Médicament</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
            <th>Utilisateur</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ligne in donneesPaginees" :key="ligne.id">
            <td>{{ ligne.date }}</td>
            <td>{{ ligne.medicament }}</td>
            <td>{{ ligne.quantite }}</td>
            <td>{{ ligne.prix }} DT</td>
            <td>{{ ligne.total }} DT</td>
            <td>{{ ligne.utilisateur }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button @click="pageActuelle--" :disabled="pageActuelle === 1">Précédent</button>
      <span>Page {{ pageActuelle }} / {{ totalPages }}</span>
      <button @click="pageActuelle++" :disabled="pageActuelle === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { CIcon } from '@coreui/icons-vue'

const typeHistorique = ref('achat')
const recherche = ref('')
const pageActuelle = ref(1)
const elementsParPage = 5


 
  const donneesAchat = [
  { id: 1, date: '01-07-2025', medicament: 'Doliprane', quantite: 100, prix: 1.2, total: 120, utilisateur: 'Admin' },
  { id: 2, date: '02-07-2025', medicament: 'Paracetamol', quantite: 200, prix: 0.8, total: 160, utilisateur: 'Nadia' },
  { id: 3, date: '03-07-2025', medicament: 'Augmentin', quantite: 50, prix: 1.5, total: 75, utilisateur: 'Nadia' },
  { id: 4, date: '04-07-2025', medicament: 'Ibuprofène', quantite: 75, prix: 1.7, total: 127.5, utilisateur: 'Admin' },
  { id: 5, date: '05-07-2025', medicament: 'Amoxicilline', quantite: 90, prix: 1.3, total: 117, utilisateur: 'Farah' },
  { id: 6, date: '06-07-2025', medicament: 'Efferalgan', quantite: 60, prix: 1.1, total: 66, utilisateur: 'Ali' },
  { id: 7, date: '06-07-2025', medicament: 'Efferalgan', quantite: 60, prix: 1.1, total: 66, utilisateur: 'Ali' },
  { id: 8, date: '06-07-2025', medicament: 'Efferalgan', quantite: 60, prix: 1.1, total: 66, utilisateur: 'Ali' },
  { id: 8, date: '06-07-2025', medicament: 'Efferalgan', quantite: 60, prix: 1.1, total: 66, utilisateur: 'Ali' },
  { id: 8, date: '06-07-2025', medicament: 'Efferalgan', quantite: 60, prix: 1.1, total: 66, utilisateur: 'Ali' },
  { id: 8, date: '06-07-2025', medicament: 'Efferalgan', quantite: 60, prix: 1.1, total: 66, utilisateur: 'Ali' },
  
  
]

  // ... autres données achat


const donneesVente = [
  { id: 1, date: '01-07-2025', medicament: 'Doliprane', quantite: 50, prix: 1.5, total: 75, utilisateur: 'Client1' },
  { id: 2, date: '02-07-2025', medicament: 'Ibuprofène', quantite: 30, prix: 1.7, total: 51, utilisateur: 'Client2' },
  // ... autres données vente
]

const toutesDonnees = computed(() => {
  const source = typeHistorique.value === 'achat' ? donneesAchat : donneesVente
  if (!recherche.value) return source
  return source.filter(item =>
    item.medicament.toLowerCase().includes(recherche.value.toLowerCase()) ||
    item.utilisateur.toLowerCase().includes(recherche.value.toLowerCase())
  )
})

const totalPages = computed(() => Math.ceil(toutesDonnees.value.length / elementsParPage))

const donneesPaginees = computed(() => {
  const debut = (pageActuelle.value - 1) * elementsParPage
  return toutesDonnees.value.slice(debut, debut + elementsParPage)
})

const changerType = () => {
  pageActuelle.value = 1
}

watch(recherche, () => {
  pageActuelle.value = 1
})
</script>

<style scoped>
.historique-wrapper {
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.select-type {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 10px;
  padding: 6px 12px;
  border: 1px solid #dcdcdc;
  max-width: 400px;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  padding-left: 0.5rem;
}

.search-icon {
  color: #888;
}

.table-container {
  overflow-x: auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.styled-table th,
.styled-table td {
  padding: 12px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.styled-table tbody tr:hover {
  background-color: #f5faff;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.pagination button {
  padding: 6px 12px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.pagination button:hover {
  background-color: #0056b3;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>