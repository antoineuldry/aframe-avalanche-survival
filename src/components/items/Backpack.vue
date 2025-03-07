<script setup>
import { ref, useTemplateRef } from "vue";
import InventoryOverlay from "./InventoryOverlay.vue";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "83.28 1.56 27.3" },
  rotation: { type: String, default: "-5.35 -156.1 0.38" },
  scale: { type: String, default: "1 1 1" },
});

const inventoryVisible = ref(false);
const items = ref([
  { name: "flashlight", model: "#flashlight" },
  { name: "gps", model: "#gps" },
  { name: "lighter", model: "#lighter" },
  { name: "book", model: "#book" },
]);

const inventorySound = useTemplateRef("inventorySound");

const playInventorySound = () => {
  if (inventorySound.value) {
    inventorySound.value.components.sound.stopSound();
    inventorySound.value.components.sound.playSound();

    setTimeout(() => {
      inventorySound.value.components.sound.stopSound();
    }, 1000);
  }
};

const toggleInventory = () => {
  inventoryVisible.value = !inventoryVisible.value;
  playInventorySound();
};
</script>

<template>
  <a-entity
    id="backpack-hitbox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    clickable
    geometry="primitive: box; width: 1.45; height: 1.5; depth: 0.6"
    material="visible: false; color: #ff0000"
    @click="toggleInventory"
  >
    <a-entity
      gltf-model="#backpack"
      position="0 -0.2 0"
      scale="0.5 0.5 0.5"
    ></a-entity>

    <a-sound
      ref="inventorySound"
      src="#sfx-backpack-inventory"
      positional="true"
    ></a-sound>
  </a-entity>

  <InventoryOverlay
    :isVisible="inventoryVisible"
    :items="items"
    @close="toggleInventory()"
  />
</template>
