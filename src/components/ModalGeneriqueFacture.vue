<template>
  <v-dialog :model-value="modelValue" max-width="500" @update:modelValue="$emit('update:modelValue', $event)">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">{{ title }}</v-card-title>
      <v-card-text>
        <div v-if="content">
          <p><strong>Numéro:</strong> {{ content.numero }}</p>
          <p><strong>Client:</strong> {{ content.client }}</p>
          <p><strong>Date:</strong> {{ content.date }}</p>
          <p><strong>Total:</strong> {{ content.total }} TND</p>
          <p><strong>Statut:</strong> {{ content.statut }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="$emit('valider')">Valider</v-btn>
        <v-btn color="blue" @click="$emit('pdf')">Générer PDF</v-btn>
        <v-btn color="orange" @click="$emit('email')">Envoyer Email</v-btn>
        <v-btn color="red" text @click="$emit('update:modelValue', false)">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  title: String,
  content: Object,
})
defineEmits(['update:modelValue', 'valider', 'pdf', 'email'])
</script>

