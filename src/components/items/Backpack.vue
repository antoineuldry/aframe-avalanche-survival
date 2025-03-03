<script setup>
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "10 -0,14 12" }, // Position initiale de la hache
  rotation: { type: String, default: "-52 122.5 44.24" }, // Rotation initiale
  scale: { type: String, default: "0.5 0.5 0.5" }, // Scale initiale
});
</script>

<template>
  <a-entity
    id="backpack-hitbox"
    :position="position"
    :rotation="rotation"
    clickable
    simple-grab
    geometry="primitive: box; width: 1.45; height: 1.5; depth: 0.6"
    material="visible: false; color: #ff0000"
  >
    <!-- TODO : Rotation event_set__taken VR -->
    <a-entity
      gltf-model="#backpack"
      scale="0.5 0.5 0.5"
      listen-to="target: #backpack-hitbox; event: grab; emit: taken"
      event-set__taken="event: taken; property: rotation; value: 0 90 0"
    ></a-entity>
  </a-entity>
</template>
