<script setup>
import { ref } from "vue";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "10 -0.14 12" }, // Position initiale du sac à dos
  rotation: { type: String, default: "-52 122.5 44.24" }, // Rotation initiale
  scale: { type: String, default: "1 1 1" }, // Scale initiale
});

const inventoryVisible = ref(false);
const items = ref([]); // Liste des objets dans le sac à dos

function toggleInventory() {
  inventoryVisible.value = !inventoryVisible.value;
}

function addItem(item) {
  if (items.value.length < 10) {
    items.value.push(item);
  } else {
    console.log("Backpack is full");
  }
}

function removeItem(index) {
  items.value.splice(index, 1);
}

function attachBackpackToPlayer() {
  const backpack = document.querySelector("#backpack-hitbox");
  const player = document.querySelector("#player");
  backpack.setAttribute("position", "0 0.5 -0.5");
  player.appendChild(backpack);
}
</script>

<template>
  <a-entity
    id="backpack-hitbox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    clickable
    simple-grab
    geometry="primitive: box; width: 1.45; height: 1.5; depth: 0.6"
    material="visible: true; color: #ff0000"
    @grab-start="attachBackpackToPlayer"
  >
    <a-entity
      gltf-model="#backpack"
      position="0 -0.2 0"
      scale="0.5 0.5 0.5"
      listen-to="target: #backpack-hitbox; event: grab; emit: taken"
      event-set__taken="event: taken; attribute: rotation; value: 0 90 0"
    ></a-entity>
  </a-entity>

  <a-entity v-if="inventoryVisible" position="0 1.6 -1">
    <a-plane color="#333" width="1.5" height="1.5">
      <a-text
        v-for="(item, index) in items"
        :key="index"
        :value="item.name"
        position="0 0.7 -0.01"
        width="1.4"
        align="center"
        @click="removeItem(index)"
      ></a-text>
    </a-plane>
  </a-entity>
</template>
