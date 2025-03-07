<script setup>
import { store as actionsStore } from "../../stores/actionsStore.js";
import { ref, watchEffect } from "vue";

const props = defineProps({
  position: { type: String, default: "-190 100 -440" },
  rotation: { type: String, default: "0 120 0" },
  scale: { type: String, default: "1.5 1.5 1.5" },
  animation: { type: String, default: "clip:Main;" },
});

const playHelicopterSound = () => {
  const helicopterSound = document.querySelector("#sfx-helicopter");
  if (helicopterSound) {
    helicopterSound.play();
  }
};

const isVisible = ref(false); // État de visibilité de l'hélicoptère

// Surveiller l'état de l'action 'morning'
watchEffect(() => {
  if (actionsStore.getIsDone("morning")) {
    // Si l'action 'morning' est terminée, afficher l'hélicoptère et jouer le son
    isVisible.value = true;
    playHelicopterSound();
  }
});
</script>

<template>
  <!-- Son de l'hélicoptère -->
  <audio
    id="sfx-helicopter"
    src="./assets/sfx/sfx-helicopter.mp3"
    loop="true"
  ></audio>

  <!-- Affichage de l'hélicoptère conditionné par l'état de l'action 'morning' -->
  <a-entity
    v-if="isVisible"
    gltf-model="#helicopter"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
  ></a-entity>
</template>
