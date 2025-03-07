<script setup>
import { store as actionsStore } from "../../stores/actionsStore.js";
import { ref, watchEffect, useTemplateRef } from "vue";

const props = defineProps({
  position: { type: String, default: "67 33.4 59.9" }, // Position initiale du loup
  rotation: { type: String, default: "0 154 0" },
  scale: { type: String, default: "1 1 1" },
  animation: { type: String, default: "clip:Idle;" },
});

const wolvesSound = useTemplateRef("sound-wolves");

const isVisible = ref(false); // État de visibilité du loup
const targetPosition = "67 33.4 54.9"; // Nouvelle position du loup
const hasPlayedSound = ref(false); // Variable de contrôle pour vérifier si le son a été joué

watchEffect(() => {
  // Vérifier si l'action 'litFire' est terminée
  if (actionsStore.getIsDone("litFire") && !hasPlayedSound.value) {
    // Marquer que le son a été joué
    hasPlayedSound.value = true;

    // Retarder l'apparition du loup et le son
    setTimeout(() => {
      isVisible.value = true;
      wolvesSound.value.components.sound.playSound(); // Jouer le son des loups

      // Arrêter le son après 9 secondes
      setTimeout(() => {
        wolvesSound.value.components.sound.stopSound(); // Arrêter le son après 9 secondes
      }, 9000); // Délai de 9 secondes pour arrêter le son
    }, 10000); // Délai initial de 10 secondes après l'action 'litFire'
  }

  // Gérer l'action 'sleep' et couper le son si nécessaire
  if (actionsStore.getIsDone("sleep")) {
    wolvesSound.value.components.sound.volume = 0; // Couper le son si 'sleep' est fait
  }

  // Gérer l'action 'morning' et arrêter le loup
  if (actionsStore.getIsDone("morning")) {
    isVisible.value = false;
  }
});
</script>

<template>
  <a-sound ref="sound-wolves" src="#sfx-wolves" volume="8"></a-sound>

  <a-entity
    v-if="isVisible"
    gltf-model="#wolf"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
    :animation="`property: position; to: ${targetPosition}; dur: 6000; easing: easeInOutQuad`"
  >
  </a-entity>
</template>
