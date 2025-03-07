<script setup>
import { store as actionsStore } from "../../stores/actionsStore.js";
import { ref, watchEffect } from "vue";

const props = defineProps({
  position: { type: String, default: "60 -0.25 -23" },
  rotation: { type: String, default: "0 29 0" },
  scale: { type: String, default: "1 1 1" },
  animation: { type: String, default: "clip:Walk;" },
});

const playMonsterNoise = () => {
  const monsterNoise = document.querySelector("#sfx-monster-noise");
  if (monsterNoise) {
    monsterNoise.play();
  }
};

const playMonsterSteps = () => {
  const monsterSteps = document.querySelector("#sfx-monster-steps");
  if (monsterSteps) {
    monsterSteps.play();
  }
};

const isVisible = ref(false); // État de visibilité du snowman-monster

// Surveiller l'état de l'action 'sleep'
watchEffect(() => {
  if (actionsStore.getIsDone("sleep")) {
    // Si l'action 'sleep' est lancée, attendre 4 secondes avant de montrer le snowman
    setTimeout(() => {
      isVisible.value = true;
      playMonsterNoise();
      playMonsterSteps();
    }, 4000); // Délai de 4 secondes avant d'activer le monstre et ses sons
  }
});
</script>

<template>
  <!-- Affichage du snowman-monster conditionné par l'état de l'action 'sleep' -->
  <a-entity
    v-if="isVisible"
    gltf-model="#snowman-monster"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
  >
    <!-- Sons du monstre -->
    <audio
      id="sfx-monster-noise"
      src="./assets/sfx/sfx-monster-noise.mp3"
      volume="0.7"
    ></audio>
    <audio
      id="sfx-monster-steps"
      src="./assets/sfx/sfx-monster-steps.mp3"
      volume="0.3"
    ></audio
  ></a-entity>
</template>
