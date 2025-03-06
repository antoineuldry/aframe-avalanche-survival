<script setup>
import { ref, watch } from "vue";

import { store as carryStore } from "../../stores/carryStore.js";
import { store as campfireStore } from "../../stores/campfireStore.js";

import "../../aframe/emit-when-near.js";

const props = defineProps({
  position: { type: String, default: "80 1 32" },
  scale: { type: String, default: "1 1 1" },
});

const campfireLight = ref(null);
const campfireState = ref(campfireStore.getCampfireState());
const showCampfireOff = ref(false);
const showCampfireOn = ref(false);
const campfireRotating = ref(true);

const checkHeldObject = () => {
  const heldObject = carryStore.getCarryItem();
  if (!heldObject) return;

  if (campfireState.value === "null" && heldObject.itemName === "wood-pile") {
    showCampfireOff.value = true;
  } else if (
    campfireState.value === "campfireBase" &&
    heldObject.itemName === "book"
  ) {
    showCampfireOff.value = true;
  } else if (
    campfireState.value === "campfirePaper" &&
    heldObject.itemName === "lighter"
  ) {
    showCampfireOff.value = true;
  }
};

const onPlayerNear = () => {
  if (campfireState.value === "campfireLit") {
    return;
  }
  campfireLight.value.setAttribute("intensity", "3");
  campfireLight.value.setAttribute("penumbra", "0.2");
  checkHeldObject(); // Vérifier l'objet tenu à l'approche de la zone
};

const onPlayerFar = () => {
  campfireLight.value.setAttribute("intensity", "0");
  campfireLight.value.setAttribute("penumbra", "0.1");
};

const placeWood = () => {
  campfireStore.updateCampfireState("campfireBase");
  campfireState.value = campfireStore.getCampfireState();
  campfireRotating.value = false;
  carryStore.clearCarryItem();
  campfireLight.value.setAttribute("intensity", "0"); // Éteindre la lumière
};

const placePaper = () => {
  campfireStore.updateCampfireState("campfirePaper");
  campfireState.value = campfireStore.getCampfireState();
  carryStore.clearCarryItem();
  campfireLight.value.setAttribute("intensity", "0"); // Éteindre la lumière

  console.log("Paper placed");
  console.log("Campfire state: ", campfireState.value);
};

const lightCampfire = () => {
  campfireStore.updateCampfireState("campfireLit");
  campfireState.value = campfireStore.getCampfireState();
  carryStore.clearCarryItem();
  campfireLight.value.setAttribute("intensity", "0"); // Éteindre la lumière
  showCampfireOn.value = true;
};

const handleClick = (event) => {
  const heldObject = carryStore.getCarryItem();
  if (!heldObject) return;

  switch (heldObject.itemName) {
    case "wood-pile":
      placeWood();
      break;
    case "paper":
      placePaper();
      break;
    case "lighter":
      lightCampfire();
      break;
    default:
      break;
  }
};

watch(campfireState, (newState) => {
  if (newState === "campfireLit") {
    campfireLight.value.setAttribute("intensity", "5");
  } else {
    campfireLight.value.setAttribute("intensity", "0");
  }
});
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
      type="spot"
      color="#AAAAFF"
      intensity="0"
      penumbra="0.2"
      distance="4"
      position="0 0.5 0"
      rotation="-90 0 0"
      ref="campfireLight"
    ></a-light>

    <a-entity
      v-if="showCampfireOn || showCampfireOff"
      :gltf-model="`#campfire-${showCampfireOn ? 'on' : 'off'}`"
      scale="2 2 2"
      position="0 0.2 0"
      rotation="0 0 0"
      class="clickable"
      :animation="
        campfireRotating
          ? 'property: rotation; to: 0 360 0; loop: true; easing: linear; dur: 10000'
          : null
      "
      clickable
      @click="handleClick($event)"
    ></a-entity>
  </a-entity>
</template>

<style></style>
