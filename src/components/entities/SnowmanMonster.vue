<script setup>
import { ref, watchEffect, useTemplateRef } from "vue";
import { store as actionsStore } from "../../stores/actionsStore.js";

const props = defineProps({
  position: { type: String, default: "60 -0.25 -23" },
  rotation: { type: String, default: "0 29 0" },
  scale: { type: String, default: "0.5 0.5 0.5" },
  animation: { type: String, default: "clip:Walk;" },
});

const monsterNoiseSound = useTemplateRef("sound-monster-noise");
const monsterStepsSound = useTemplateRef("sound-monster-steps");

const isVisible = ref(false); // État de visibilité du snowman-monster
const isAnimationDone = ref(false); // Pour suivre si l'animation a été terminée

const startingPosition = ref("60 -0.25 -23");
const targetPosition = "79 1 25";

watchEffect(() => {
  if (actionsStore.getIsDone("sleep")) {
    setTimeout(() => {
      isVisible.value = true;
      monsterNoiseSound.value.components.sound.playSound();
      monsterStepsSound.value.components.sound.playSound();

      // Après 6 secondes, on arrête les sons et l'animation, puis on passe à l'état "morning"

      setTimeout(() => {
        isAnimationDone.value = true;
        // Arrêt des sons
        monsterNoiseSound.value.components.sound.stopSound();
        monsterStepsSound.value.components.sound.stopSound();

        // Changement d'état dans le store
        actionsStore.performAction("morning");

        // Masquer le snowman-monster
        isVisible.value = false;
      }, 7500); // 8 secondes d'animation
    }, 4000); // 4 secondes avant que l'animation commence
  }
});
</script>

<template>
  <!-- TODO : Attach sounds to monster entity -->
  <a-sound
    ref="sound-monster-noise"
    src="#sfx-monster-noise"
    volume="9"
  ></a-sound>
  <a-sound
    ref="sound-monster-steps"
    src="#sfx-monster-steps"
    volume="4"
  ></a-sound>

  <a-entity
    v-if="isVisible"
    gltf-model="#snowman-monster"
    :position="startingPosition"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
    :animation="`property: position; to: ${targetPosition}; dur: 8000; easing: easeInOutQuad`"
    animation__scale="property: scale; to: 3 3 3; dur: 8000; easing: easeInOutQuad"
  >
  </a-entity>
</template>
