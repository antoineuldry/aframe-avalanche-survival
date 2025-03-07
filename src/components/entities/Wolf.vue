<script setup>
import { store as actionsStore } from "../../stores/actionsStore.js";
import { ref, watchEffect, useTemplateRef } from "vue";

const props = defineProps({
  position: { type: String, default: "67 33.4 54.9" },
  rotation: { type: String, default: "0 154 0" },
  scale: { type: String, default: "1 1 1" },
  animation: { type: String, default: "clip:Idle;" },
});

const wolvesSound = useTemplateRef("sound-wolves");

const isVisible = ref(false); // État de visibilité du loup

watchEffect(() => {
  if (actionsStore.getIsDone("litFire")) {
    setTimeout(() => {
      isVisible.value = true;
      wolvesSound.value.components.sound.playSound(); // Jouer le son des loups
      // Arrêter le son après 9 secondes
      setTimeout(() => {
        wolvesSound.value.components.sound.stopSound();
      }, 9000); // 9 secondes après le début du son
    }, 10000); // Délai initial de 10 secondes
  }

  // if sleep, mute the sound
  if (actionsStore.getIsDone("sleep") && wolvesSound.value)
    wolvesSound.value.components.sound.stopSound();

  if (actionsStore.getIsDone("morning")) {
    isVisible.value = false;
  }
});
</script>

<!-- up volume sound -->
<template>
  <a-sound ref="sound-wolves" src="#sfx-wolves" volume="8"></a-sound>

  <a-entity
    v-if="isVisible"
    gltf-model="#wolf"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
  ></a-entity>
</template>
