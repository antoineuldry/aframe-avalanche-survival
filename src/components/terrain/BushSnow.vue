<script setup>
import { ref } from "vue";

import Hatchet from "../items/Hatchet.vue";

import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "4 0 -21" }, // Position initiale de la hache
  rotation: { type: String, default: "0 0 0" }, // Rotation initiale
  scale: { type: String, default: "3 3 3" }, // Scale initiale
});

const hatchetVisible = ref(false);

const onBushClick = () => {
  hatchetVisible.value = true;
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
  </a-entity>

  <Hatchet v-if="hatchetVisible" />
</template>
