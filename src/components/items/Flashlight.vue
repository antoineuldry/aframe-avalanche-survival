<script setup>
import { ref } from "vue";

import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "5 -1 -23" }, // Position initiale de la lampe de poche
  rotation: { type: String, default: "90 0 0" }, // Rotation initiale
  scale: { type: String, default: "0.15 0.15 0.15" }, // Scale initiale
});

const isHeld = ref(false);
const isOn = ref(false);

function toggleLight() {
  isOn.value = !isOn.value;
}
</script>

<template>
  <a-entity
    id="flashlight-hitbox"
    :position="position"
    :rotation="rotation"
    clickable
    simple-grab
    visible="true"
    geometry="primitive: box; width: 0.45; height: 0.1; depth: 0.2"
    material="visible: false; color: #ff0000"
    @click="toggleLight"
  >
    <a-entity
      gltf-model="#flashlight"
      :position="isHeld ? '0 0 0' : '0.03 0 -0.005'"
      :rotation="isHeld ? '0 0 0' : rotation"
      :scale="scale"
      listen-to="target: #flashlight-hitbox; event: grab; emit: taken"
      event-set__taken="event: taken; property: rotation; value: 90 90 0"
    >
      <a-light
        v-if="isOn"
        type="spot"
        color="#ffffff"
        intensity="1"
        distance="10"
        angle="30"
        position="0 0 -1"
      ></a-light>
    </a-entity>
  </a-entity>
</template>
