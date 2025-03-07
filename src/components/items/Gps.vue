<script setup>
import { store as carryStore } from "../../stores/carryStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "0 1.5 -1" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "0.03 0.03 0.03" },
  isVisible: { type: Boolean, default: true },
});

const handleGrab = (event) => {
  carryStore.setCarryItem("gps", { event });
};
</script>

<template>
  <a-entity
    v-if="isVisible"
    id="gps-hitbox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    clickable
    simple-grab
    geometry="primitive: box; width: 3.8; height: 14; depth: 3.5"
    material="visible: false; color: #ff0000"
    @grab="handleGrab($event)"
  >
    <a-entity
      gltf-model="#gps"
      position="0 -7 0"
      listen-to__grab="target: #gps-hitbox; event: grab; emit: taken"
      listen-to__drop="target: #gps-hitbox; event: drop; emit: untaken"
      event-set__taken_rotation="event: taken; attribute: rotation; value: -90 0 0"
      event-set__taken_position="event: taken; attribute: position; value: -1.8 0 2.3"
      event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 0 0"
      event-set__untaken_position="event: untaken; attribute: position; value: 0 0 0"
    ></a-entity>
  </a-entity>
</template>
