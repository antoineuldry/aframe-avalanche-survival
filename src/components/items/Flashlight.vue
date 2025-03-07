<script setup>
import { ref, onMounted, watchEffect, useTemplateRef } from "vue";
import { store as carryStore } from "../../stores/carryStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "0 1 -2" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "0.1 0.1 0.1" },
  isVisible: { type: Boolean, default: true },
});

const isVR = ref(false);
const lightOn = ref(false);
const flashlightSound = useTemplateRef("flashlight-sound");

const toggleLight = () => {
  lightOn.value = !lightOn.value;
  flashlightSound.value.components.sound.playSound();
  setTimeout(() => {
    flashlightSound.value.components.sound.stopSound();
  }, 1000);
};

const handleGrab = (event) => {
  const pickupSound = document.querySelector("#sfx-item-pickup");
  if (pickupSound) {
    pickupSound.play();
  }
  carryStore.setCarryItem("flashlight", { event });
};

onMounted(() => {
  document.querySelector("a-scene").addEventListener("enter-vr", () => {
    isVR.value = true;
  });
  document.querySelector("a-scene").addEventListener("exit-vr", () => {
    isVR.value = false;
  });
});

watchEffect(() => {
  if (isVR.value) {
    // VR mode
    document
      .querySelector("#hand-right")
      .addEventListener("buttondown", (event) => {
        if (carryStore.getCarryItem()?.itemName === "flashlight") {
          toggleLight();
        }
      });
  } else {
    // NON VR mode
    document.addEventListener("mousedown", (event) => {
      if (
        event.button === 2 &&
        carryStore.getCarryItem()?.itemName === "flashlight"
      ) {
        toggleLight();
      }
    });
  }
});
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
    >
      <a-light
        v-if="lightOn"
        type="point"
        intensity="0.3"
        position="1.75 -0.3 -0.35"
        target="#flashlight-hitbox"
      ></a-light>

      <a-sound
        ref="flashlight-sound"
        src="#sfx-flashlight-on-off"
        positional="true"
        volume="0.5"
      ></a-sound>
    </a-entity>
  </a-entity>
</template>
