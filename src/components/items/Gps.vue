<script setup>
import { ref, onMounted, watchEffect, useTemplateRef } from "vue";
import { store as carryStore } from "../../stores/carryStore.js";
import { store as actionsStore } from "../../stores/actionsStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "0 1.5 -1" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "0.03 0.03 0.03" },
  isVisible: { type: Boolean, default: true },
});

const isVR = ref(false);
const isActionPlayed = ref(false);
const actionSound = useTemplateRef("action-sound");

const handleGrab = (event) => {
  // Joue le son de "pickup" global
  const pickupSound = document.querySelector("#sfx-item-pickup");
  if (pickupSound) {
    pickupSound.play();
  }

  carryStore.setCarryItem("gps", { event });
};

onMounted(() => {
  document.querySelector("a-scene").addEventListener("enter-vr", () => {
    isVR.value = true;
  });
  document.querySelector("a-scene").addEventListener("exit-vr", () => {
    isVR.value = false;
  });
});

const playAction = () => {
  if (isActionPlayed.value) return;
  isActionPlayed.value = true;
  actionsStore.performAction("emitGpsSignal");
  actionSound.value.components.sound.playSound();
  setTimeout(() => {
    actionSound.value.components.sound.stopSound();
  }, 1000);
};

watchEffect(() => {
  if (isVR.value) {
    // VR mode
    document
      .querySelector("#hand-right")
      .addEventListener("buttondown", (event) => {
        if (carryStore.getCarryItem()?.itemName === "gps") {
          playAction();
        }
      });
  } else {
    // NON VR mode
    document.addEventListener("mousedown", (event) => {
      if (event.button === 2 && carryStore.getCarryItem()?.itemName === "gps") {
        playAction();
      }
    });
  }
});
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
    >
      <a-sound
        ref="action-sound"
        src="#sfx-gps-signal"
        positional="true"
      ></a-sound>
    </a-entity>
  </a-entity>
</template>
