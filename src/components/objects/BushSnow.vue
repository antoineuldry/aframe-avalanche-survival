<script setup>
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "4 -1 -21" }, // Position initiale de la hache
  rotation: { type: String, default: "0 0 0" }, // Rotation initiale
  scale: { type: String, default: "3 3 3" }, // Scale initiale
});
</script>

<template>
  <a-entity
    id="bush-snow-hitbox"
    :position="position"
    :rotation="rotation"
    clickable
    geometry="primitive: sphere; radius: 2"
    material="visible: false; color: #ff0000"
  >
    <a-entity
      gltf-model="#bush-snow"
      scale="3 3 3"
      position="0 -1 0"
      listen-to="target: #bush-snow-hitbox; emit: shake"
      event-set__shake="event: shake; property: visible; target: #hatchet-hitbox; value: true"
    ></a-entity>
  </a-entity>
</template>
