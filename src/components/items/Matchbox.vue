<script setup>
import { store as carryStore } from "../../stores/carryStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "1 1 3" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "0.1 0.1 0.1" },
});

const handleGrab = (event) => {
  carryStore.setCarryItem("matchbox", { event });
};
</script>

<template>
  <a-entity
    id="matchbox-hitbox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    clickable
    simple-grab
    geometry="primitive: box; width: 0.6; height: 1.2; depth: 0.2"
    material="visible: false; color: #ff0000"
    @grab="handleGrab($event)"
  >
    <a-entity
      gltf-model="#matchbox"
      position="0 -0.3 0.02"
      listen-to-grab="target: #matchbox-hitbox; event: grab; emit: taken"
      listen-to-drop="target: #matchbox-hitbox; event: grab; emit: drop"
      event-set__taken_rotation="event: taken; attribute: rotation; value: 0 0 0"
      event-set__taken_position="event: taken; attribute: position; value: 0 0 0"
      event-set__drop_rotation="event: taken; attribute: rotation; value: 0 0 0"
      event-set__drop_position="event: taken; attribute: position; value: 0 0 0"
    ></a-entity>
  </a-entity>
</template>
