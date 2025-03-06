<script setup>
import { ref, watch } from "vue";

// Propriétés pour la gestion de la lumière et de l'environnement
const lightProps = {
  position: "0 2 0",
  radius: ".25",
  color: "white",
  intensity: ".5",
};

const skyProps = {
  dayColor: "#87CEEB", // Ciel bleu clair pour le jour
  sunsetColor: "#FF6347", // Coucher de soleil
  nightColor: "#2F4F4F", // Ciel nocturne
};

const sunProps = {
  position: "0 10 0", // Position du soleil
  intensity: 1,
};

const moonProps = {
  position: "0 10 -10", // Position de la lune
  intensity: 0.2,
};

// Etats du cycle jour/nuit
const isNight = ref(false);
const isDay = ref(true);

// Méthode pour ajuster la lumière et le ciel
const adjustLighting = () => {
  if (isNight.value) {
    lightProps.intensity = 0.2;
    skyProps.color = skyProps.nightColor;
    sunProps.intensity = 0;
    moonProps.intensity = 0.5;
  } else if (isDay.value) {
    lightProps.intensity = 1;
    skyProps.color = skyProps.dayColor;
    sunProps.intensity = 1;
    moonProps.intensity = 0;
  }
};

// Surveiller les changements d'état jour/nuit
watch(isNight, adjustLighting);
watch(isDay, adjustLighting);

// Fonction pour changer l'heure en fonction des actions du joueur
const changeTimeBasedOnAction = (actionType) => {
  if (actionType === "fire") {
    // Lorsque le feu est allumé, on passe à la nuit
    isNight.value = true;
    isDay.value = false;
  } else if (actionType === "sunrise") {
    // Lorsque le soleil se lève (par exemple au matin), on passe à la journée
    isNight.value = false;
    isDay.value = true;
  }
};
</script>

<template>
  <a-entity bind-position="target: #head;">
    <!-- Ciel -->
    <a-sky :color="skyProps.color"></a-sky>

    <!-- Soleil -->
    <a-sphere
      v-if="isDay"
      position="0 10 0"
      radius="5"
      color="yellow"
      light="type: directional; intensity: 1; castShadow: true"
    ></a-sphere>

    <!-- Lune -->
    <a-sphere
      v-if="isNight"
      position="0 10 -10"
      radius="5"
      color="white"
      light="type: point; intensity: 0.5; castShadow: false"
    ></a-sphere>

    <!-- Luminosité autour du joueur -->
    <a-entity
      :light="
        'type: point; intensity: ' + lightProps.intensity + '; castShadow: true'
      "
      :position="lightProps.position"
    ></a-entity>
  </a-entity>
</template>
