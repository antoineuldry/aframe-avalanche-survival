<script setup>
import { ref, computed } from "vue";

import { store as carryStore } from "../../stores/carryStore.js";
import { store as campfireStore } from "../../stores/campfireStore.js";

import "../../aframe/emit-when-near.js";

const props = defineProps({
  position: { type: String, default: "80 1 32" },
  scale: { type: String, default: "1 1 1" },
});

const campfireLevel = ref(0);
const showLight = ref(false);
// red #ff8b8b  / blue #AAAAFF
const lightColor = ref("#ff8b8b");
const isPlayerNear = ref(false);
const campfireModel = computed(() => {
  return campfireLevel >= 3 ? "#campfire-on" : "#campfire-off";
});
const showRotatingFire = computed(() => {
  const item = carryStore.getCarryItem();
  if (!item) return false;
  return item.itemName === "wood-pile";
});

const onPlayerNear = () => {
  isPlayerNear.value = true;
};
const onPlayerFar = () => {
  isPlayerNear.value = false;
  lightColor.value = "#ff8b8b";
};

const handleClick = (event) => {
  const item = carryStore.getCarryItem();
  if (!item) return;

  console.log(item.itemName);
};
</script>

<template>
  <a-entity
    class="campfire-zone"
    :position="position"
    :scale="scale"
    emit-when-near="target: #head; distance: 3; event: campfire-near; eventFar: campfire-far; throttle: 200"
    @campfire-near="onPlayerNear"
    @campfire-far="onPlayerFar"
  >
    <a-light
      v-if="showLight"
      type="spot"
      :color="lightColor"
      intensity="0"
      penumbra="0.2"
      distance="4"
      position="0 0.5 0"
      rotation="-90 0 0"
      ref="campfireLight"
    ></a-light>

    <a-entity
      v-if="showRotatingFire || campfireLevel > 0"
      :gltf-model="campfireModel"
      scale="2 2 2"
      position="0 0.2 0"
      rotation="0 0 0"
      class="clickable"
      :animation="
        showRotatingFire
          ? 'property: rotation; to: 0 360 0; loop: true; easing: linear; dur: 10000'
          : null
      "
      clickable
      @click="handleClick($event)"
    ></a-entity>
  </a-entity>
</template>

<style></style>
