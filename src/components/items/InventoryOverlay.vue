<script setup>
import { defineProps, defineEmits, watch } from "vue";

import { store as carryStore } from "../../stores/carryStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";
import "../../aframe/simple-grab.js";

import Flashlight from "../items/Flashlight.vue";
import Gps from "../items/Gps.vue";
import Lighter from "../items/Lighter.vue";
import Book from "../items/Book.vue";

const props = defineProps({
  items: { type: Array, default: () => [] },
  position: { type: String, default: "84 2 26.5" }, // Position ajustée pour être plus haute et à gauche
  rotation: { type: String, default: "-5.35 -156.1 0.38" },
  isVisible: { type: Boolean, default: false },
});

const emit = defineEmits(["close", "grabItem"]);

const handleClose = () => {
  emit("close");
};

const handleGrab = (item, event) => {
  emit("grabItem", item);
};

watch(
  () => props.items,
  (newItems) => {
    console.log(props.items);
  }
);
</script>

<template>
  <!-- Fond de l'overlay -->
  <a-plane
    color="black"
    opacity="0.4"
    width="4"
    height="4"
    :position="`${props.position} -0.1`"
    :rotation="props.rotation"
    @click="handleClose"
    v-if="isVisible"
  >
    <a-light
      v-if="isVisible"
      type="point"
      color="#ffffff"
      intensity="0.5"
      position="0 2 0"
    ></a-light
  ></a-plane>

  <!-- Grille -->
  <a-entity
    :position="props.position"
    :rotation="props.rotation"
    :material="`visible: ${isVisible}`"
  >
    <!-- Lampe de poche -->
    <a-entity position="-1.15 1.15 0.05">
      <a-plane
        width="1"
        height="1"
        color="#ffffff"
        opacity="0.15"
        :material="`visible: ${isVisible}; side: double`"
        clickable
        simple-grab-drop-zone
      ></a-plane>
      <Flashlight
        v-if="props.items[0]"
        :position="'0 0 0.05'"
        :scale="'0.1 0.1 0.1'"
        :isVisible="
          (isVisible && carryStore.getCarryItem()?.itemName !== 'flashlight') ||
          carryStore.getCarryItem()?.itemName === 'flashlight'
        "
        clickable
        @click="props.items[0] && handleGrab(props.items[0], $event)"
        simple-grab
      />
    </a-entity>

    <!-- GPS -->
    <a-entity position="0 1.15 0.05">
      <a-plane
        width="1"
        height="1"
        color="#ffffff"
        opacity="0.15"
        :material="`visible: ${isVisible}; side: double`"
        clickable
        simple-grab-drop-zone
      ></a-plane>
      <Gps
        v-if="props.items[1]"
        :position="'0 0 0.05'"
        :scale="'0.03 0.03 0.03'"
        :isVisible="
          (isVisible && carryStore.getCarryItem()?.itemName !== 'gps') ||
          carryStore.getCarryItem()?.itemName === 'gps'
        "
        clickable
        @click="props.items[1] && handleGrab(props.items[1], $event)"
        simple-grab
      />
    </a-entity>

    <!-- Briquet -->
    <a-entity position="1.15 1.15 0.05">
      <a-plane
        width="1"
        height="1"
        color="#ffffff"
        opacity="0.15"
        :material="`visible: ${isVisible}; side: double`"
        clickable
        simple-grab-drop-zone
      ></a-plane>
      <Lighter
        v-if="props.items[3]"
        :position="'0 0 0.05'"
        :scale="'0.2 0.2 0.2'"
        :isVisible="
          (isVisible && carryStore.getCarryItem()?.itemName !== 'lighter') ||
          carryStore.getCarryItem()?.itemName === 'lighter'
        "
        clickable
        @click="props.items[3] && handleGrab(props.items[3], $event)"
        simple-grab
      />
    </a-entity>

    <!-- Livre -->
    <a-entity position="-1.15 0 0.05">
      <a-plane
        width="1"
        height="1"
        color="#ffffff"
        opacity="0.15"
        :material="`visible: ${isVisible}; side: double`"
        clickable
        simple-grab-drop-zone
      ></a-plane>
      <Book
        v-if="props.items[2]"
        :position="'0 0 0.05'"
        :scale="'0.5 0.5 0.5'"
        :isVisible="
          (isVisible && carryStore.getCarryItem()?.itemName !== 'book') ||
          carryStore.getCarryItem()?.itemName === 'book'
        "
        clickable
        @click="props.items[2] && handleGrab(props.items[2], $event)"
        simple-grab
      />
    </a-entity>
  </a-entity>
</template>
