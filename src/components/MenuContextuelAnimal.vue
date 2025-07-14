<template>
  <ul
    v-if="visible"
    class="menu-contextuel"
    :style="{ top: `${y}px`, left: `${x}px`, position: 'absolute', zIndex: 1000 }"
    @click.stop
  >
    <li @click="$emit('modifier', animal)">✏️ Modifier</li>
    <li @click="$emit('fiche', animal)">🔍 Fiche médicale</li>
    <li @click="$emit('supprimer', animal.id)">🗑 Supprimer</li>
  </ul>
</template>

<script setup>
defineProps({
  visible: Boolean,
  x: Number,
  y: Number,
  animal: Object
})

defineEmits(['modifier', 'fiche', 'supprimer'])
</script>

<style scoped>
.menu-contextuel {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.3rem 0;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 180px;
}

.menu-contextuel li {
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
}

.menu-contextuel li:hover {
  background-color: #f5f5f5;
}
</style>
