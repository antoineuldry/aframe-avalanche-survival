<script setup>
import { store as carryStore } from "../../stores/carryStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "1 1 -2" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "1 1 1" },
});

const handleGrab = (event) => {
  // Joue le son de "pickup" global
  const pickupSound = document.querySelector("#sfx-item-pickup");
  if (pickupSound) {
    pickupSound.play();
  }

  carryStore.setCarryItem("wood-pile", { event });
};
</script>

<template>
  <a-entity
    id="wood-pile-hitbox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    clickable
    simple-grab
    geometry="primitive: box; width: 0.4; height: 0.35; depth: 0.47"
    material="visible: false; color: #ff0000"
    @grab="handleGrab($event)"
  >
    <a-entity
      gltf-model="#wood-pile"
      position="0 -0.02 0"
      listen-to__grab="target: #wood-pile-hitbox; event: grab; emit: taken"
      listen-to__drop="target: #wood-pile-hitbox; event: drop; emit: untaken"
      event-set__taken_rotation="event: taken; attribute: rotation; value: 0 0 0"
      event-set__taken_position="event: taken; attribute: position; value: 0 0 0"
      event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 0 0"
      event-set__untaken_position="event: untaken; attribute: position; value: 0 0 0"
    ></a-entity>
  </a-entity>
</template>
