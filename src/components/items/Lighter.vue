<script setup>
import { store as carryStore } from "../../stores/carryStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "0.5 1 0" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "0.1 0.1 0.1" },
  isVisible: { type: Boolean, default: true },
});

// TODO : Attach sound to lighter entity and not campfire

const handleGrab = (event) => {
  // Joue le son de "pickup" global
  const pickupSound = document.querySelector("#sfx-item-pickup");
  if (pickupSound) {
    pickupSound.play();
  }

  carryStore.setCarryItem("lighter", { event });
};
</script>

<template>
  <a-entity
    v-if="isVisible"
    id="lighter-hitbox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    clickable
    simple-grab
    geometry="primitive: box; width: 0.6; height: 0.8; depth: 0.2"
    material="visible: false; color: #ff0000"
    @grab="handleGrab($event)"
  >
    <a-entity
      gltf-model="#lighter"
      position="0.1 -0.3 0"
      listen-to__grab="target: #lighter-hitbox; event: grab; emit: taken"
      listen-to__drop="target: #lighter-hitbox; event: drop; emit: untaken"
      event-set__taken_rotation="event: taken; attribute: rotation; value: 0 -90 90"
      event-set__taken_position="event: taken; attribute: position; value: -0.05 -0.01 -0.2"
      event-set__untaken_rotation="event: untaken; attribute: rotation; value: 0 0 0"
      event-set__untaken_position="event: untaken; attribute: position; value: 0 0 0"
    ></a-entity>
  </a-entity>
</template>
