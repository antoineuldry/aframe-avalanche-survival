<script setup>
import { store as carryStore } from "../../stores/carryStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "5 -1 -23" },
  rotation: { type: String, default: "90 45 20" },
  scale: { type: String, default: "1 1 1" },
});

const handleGrab = (event) => {
  // Joue le son de "pickup" global
  const pickupSound = document.querySelector("#sfx-item-pickup");
  if (pickupSound) {
    pickupSound.play();
  }

  carryStore.setCarryItem("hatchet", { event });
};
</script>

<template>
  <a-entity
    id="hatchet-hitbox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    clickable
    simple-grab
    geometry="primitive: box; width: 0.3; height: 1; depth: 0.2"
    material="visible: false; color: #ff0000"
    @grab="handleGrab($event)"
  >
    <a-entity
      gltf-model="#hatchet"
      id="hatchet"
      obb-collider
      listen-to__grab="target: #hatchet-hitbox; event: grab; emit: taken"
      listen-to__drop="target: #hatchet-hitbox; event: drop; emit: untaken"
      event-set__taken_rotation="event: taken; attribute: rotation; value: -180 -90 90"
      event-set__taken_position="event: taken; attribute: position; value: -0.05 -0.01 -0.45"
      event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 0 0"
      event-set__untaken_position="event: untaken; attribute: position; value: 0 0 0"
    ></a-entity>
  </a-entity>
</template>
