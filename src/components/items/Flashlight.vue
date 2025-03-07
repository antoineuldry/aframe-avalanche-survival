<script setup>
import { store as carryStore } from "../../stores/carryStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "0 1 -2" }, // Position initiale de la lampe de poche
  rotation: { type: String, default: "0 0 0" }, // Rotation initiale
  scale: { type: String, default: "0.1 0.1 0.1" }, // Scale initiale
  isVisible: { type: Boolean, default: true }, // Visibilité initiale
});

const handleGrab = (event) => {
  carryStore.setCarryItem("flashlight", { event });
};
</script>

<template>
  <a-entity
    v-if="isVisible"
    id="flashlight-hitbox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    clickable
    simple-grab
    visible="true"
    geometry="primitive: box; width: 3.3; height: 1; depth: 1"
    material="visible: false; color: #ff0000"
    @click="toggleLight"
    @grab="handleGrab($event)"
  >
    <a-entity
      gltf-model="#flashlight"
      listen-to__grab="target: #flashlight-hitbox; event: grab; emit: taken"
      listen-to__drop="target: #flashlight-hitbox; event: drop; emit: untaken"
      event-set__taken_rotation="event: taken; attribute: rotation; value: 110 130 40"
      event-set__taken_position="event: taken; attribute: position; value: -0.2 0 -0.3"
      event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 0 0"
      event-set__untaken_position="event: untaken; attribute: position; value: 0 0 0"
    ></a-entity>
  </a-entity>
</template>
