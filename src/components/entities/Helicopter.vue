<script setup>
import { store as actionsStore } from "../../stores/actionsStore.js";
import { ref, watchEffect, useTemplateRef } from "vue";

const props = defineProps({
  position: { type: String, default: "-190 100 -440" },
  rotation: { type: String, default: "0 120 0" },
  scale: { type: String, default: "1.5 1.5 1.5" },
  animation: { type: String, default: "clip:Main;" },
});

const helicopterSound = useTemplateRef("sfx-helicopter");

const isVisible = ref(false); // État de visibilité de l'hélicoptère

// Surveiller l'état de l'action 'morning'
watchEffect(() => {
  if (actionsStore.getIsDone("morning")) {
    isVisible.value = true;
    helicopterSound.value.components.sound.playSound();
  }
});
</script>

<template>
  <!-- TODO : Attach sound to helicopter entity -->
  <a-sound
    ref="sfx-helicopter"
    src="#sfx-helicopter"
    positional="true"
    volume="8"
  ></a-sound>

  <a-entity
    v-if="isVisible"
    gltf-model="#helicopter"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
    :animation="`property: position; to: 45 8 -10; dur: 15000; easing: easeInOutQuad`"
    :animation__rotation="`property: rotation; to: 0 300 0; dur: 6000; easing: easeInOutQuad; delay: 10000`"
  >
  </a-entity>
</template>
