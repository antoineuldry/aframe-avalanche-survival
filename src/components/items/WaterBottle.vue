<script setup>
import { store as carryStore } from "../../stores/carryStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "0 1 1" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "1 1 1" },
});

const handleGrab = (event) => {
  carryStore.setCarryItem("water-bottle", { event });
};
</script>

<template>
  <a-entity
    id="water-bottle-hitbox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    clickable
    simple-grab
    geometry="primitive: box; width: 0.3; height: 1; depth: 0.2"
    material="visible: true; color: #ff0000"
    @grab="handleGrab($event)"
  >
    <a-entity
      gltf-model="#water-bottle"
      listen-to-grab="target: #water-bottle-hitbox; event: grab; emit: taken"
      listen-to-drop="target: #water-bottle-hitbox; event: grab; emit: drop"
      event-set__taken_rotation="event: taken; attribute: rotation; value: 0 0 0"
      event-set__taken_position="event: taken; attribute: position; value: 0 0 0"
      event-set__drop_rotation="event: taken; attribute: rotation; value: 0 0 0"
      event-set__drop_position="event: taken; attribute: position; value: 0 0 0"
    ></a-entity>
  </a-entity>
</template>
