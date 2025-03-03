<script setup>
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "5 -1 -23" }, // Position initiale de la hache
  rotation: { type: String, default: "90 45 20" }, // Rotation initiale
  scale: { type: String, default: "1 1 1" }, // Scale initiale
});
</script>

<template>
  <a-entity
    id="hatchet-hitbox"
    :position="position"
    :rotation="rotation"
    clickable
    simple-grab
    visible="false"
    geometry="primitive: box; width: 0.3; height: 1; depth: 0.2"
    material="visible: false; color: #ff0000"
  >
    <!-- TODO : Rotation event_set__taken VR -->
    <a-entity
      gltf-model="#hatchet"
      listen-to="target: #hatchet-hitbox; event: grab; emit: taken"
      event-set__taken="event: taken; property: rotation; value: 0 90 0"
    ></a-entity>
  </a-entity>
</template>
