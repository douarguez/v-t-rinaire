<template>
  <div class="table-wrapper">
    <table class="styled-table">
      <thead>
        <tr>
          <th v-for="col in colonnes" :key="col.key">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ligne, index) in donnees"
          :key="index"
          @click="$emit('ligneClick', ligne); $emit('row-click', ligne)"
          @contextmenu.prevent="$emit('clicDroit', { event: $event, ligne })"
          class="clickable-row"
        >
          <td v-for="col in colonnes" :key="col.key">
            <template v-if="col.key === 'actions'">
              <CIcon
                icon="cilPencil"
                class="icon-button edit"
                @click.stop="$emit('edit', ligne)"
                title="Modifier"
              />
              <CIcon
                icon="cilTrash"
                class="icon-button delete"
                @click.stop="$emit('delete', ligne.id)"
                title="Supprimer"
              />
            </template>
            <template v-else>
              {{ ligne[col.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { CIcon } from '@coreui/icons-vue'

defineProps({
  colonnes: { type: Array, required: true }, // Ex: [{ key: 'nom', label: 'Nom' }, ...]
  donnees: { type: Array, required: true }
})

defineEmits(['ligneClick', 'row-click', 'clicDroit', 'edit', 'delete'])
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #2d2d2d;
  overflow-x: auto;
}

.styled-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
}

.styled-table th {
  text-align: left;
  font-weight: 400;
  font-size: 13px;
  color: #6b6b6b;
  padding: 0.65rem 1rem;
  background: #f7f7f7;
}

.styled-table td {
  background: #fff;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  vertical-align: middle;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.clickable-row:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

.icon-button {
  cursor: pointer;
  margin-right: 10px;
  font-size: 18px;
  color: #555;
  transition: color 0.2s ease;
}

.icon-button.edit:hover {
  color: #0d6efd;
}

.icon-button.delete:hover {
  color: #dc3545;
}
</style>
