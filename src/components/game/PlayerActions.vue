<script setup>
import { defineEmits } from "vue";

// Définir les événements pour notifier les changements de temps
const emit = defineEmits(["changeTime"]);

// Fonction pour simuler une action de joueur (par exemple, poser des bûches de bois)
const triggerFireEvent = () => {
  emit("changeTime", "fire"); // Change l'heure en fonction de l'événement "fire"
};
</script>

<template>
  <div>
    <!-- Action du joueur pour allumer un feu (exemple) -->
    <button @click="triggerFireEvent">Allumer le feu</button>
  </div>
</template>
