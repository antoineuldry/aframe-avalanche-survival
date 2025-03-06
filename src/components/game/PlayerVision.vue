<script setup>
import { ref, watch } from "vue";

const isNight = ref(false);
const playerVision = ref(1); // 1 = vision normale, 0 = vision restreinte (nuit)

// Modifier la visibilité selon le temps
const adjustVisibility = () => {
  playerVision.value = isNight.value ? 0.1 : 1; // Faible visibilité la nuit
};

// Surveiller les changements d'heure
watch(isNight, (newIsNight) => {
  adjustVisibility();
});

const handleTimeChange = (newTime) => {
  isNight.value = newTime === 1;
};
</script>

<template>
  <a-scene>
    <!-- Visibilité du joueur -->
    <a-camera :opacity="playerVision"></a-camera>
  </a-scene>
</template>
