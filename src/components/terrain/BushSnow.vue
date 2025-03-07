<script setup>
import { ref, useTemplateRef } from "vue";

import Hatchet from "../items/Hatchet.vue";

import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "4 0 -21" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "3 3 3" },
});

const hatchetVisible = ref(false);
const bushSound = useTemplateRef("bushSound");
const hatchetFallSound = useTemplateRef("hatchetFallSound");

const playBushSound = () => {
  if (bushSound.value) {
    bushSound.value.components.sound.stopSound();
    bushSound.value.components.sound.playSound();

    setTimeout(() => {
      bushSound.value.components.sound.stopSound();
    }, 2000);
  }
};

const playHatchetFallSound = () => {
  if (hatchetFallSound.value) {
    setTimeout(() => {
      hatchetFallSound.value.components.sound.stopSound();
      hatchetFallSound.value.components.sound.playSound();
    }, 2000); // Délai pour attendre que le son du buisson se termine
  }
};

const onBushClick = () => {
  playBushSound();
  playHatchetFallSound();
  setTimeout(() => {
    hatchetVisible.value = true;
  }, 2500);
};
</script>

<template>
  <a-entity
    id="bush-snow-hitbox"
    :position="position"
    :rotation="rotation"
    clickable
    geometry="primitive: sphere; radius: 2"
    material="visible: false; color: #ff0000"
    @click="onBushClick"
  >
    <a-entity
      gltf-model="#bush-snow"
      scale="3 3 3"
      position="0 -1 0"
      listen-to="target: #bush-snow-hitbox; emit: shake"
      event-set__shake="event: shake; attribute: visible; target: #hatchet-hitbox; value: true"
    ></a-entity>

    <!-- Son du buisson -->
    <a-sound
      ref="bushSound"
      src="#sfx-bush-shaking"
      positional="true"
      volume="1.5"
    ></a-sound>

    <!-- Son de la hache tombant dans la neige -->
    <a-sound
      ref="hatchetFallSound"
      src="#sfx-item-falling-in-snow"
      positional="true"
      volume="1.5"
    ></a-sound>
  </a-entity>

  <Hatchet v-if="hatchetVisible" />
</template>
