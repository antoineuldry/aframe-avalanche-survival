<script setup>
import { ref, onMounted } from "vue";
import "../../aframe/emit-when-near.js";

const props = defineProps({
  position: { type: String, default: "80 1 32" },
  scale: { type: String, default: "1 1 1" },
});

const campfireLight = ref(null);
const campfireState = ref("empty"); // States: empty, wood, book, lit
const system = ref(null);
const heldObject = ref(null);
const showCampfireOff = ref(false);
const campfireRotating = ref(true);

onMounted(() => {
  system.value = document.querySelector("a-scene").systems["simple-grab"];
});

const checkHeldObject = () => {
  if (!system.value) return;

  const rightHand = document.querySelector("#hand-right");
  const dummyHand = document.querySelector("#dummy-hand-right"); // For desktop mode

  const vrHeld = system.value.getCurrentGrab(rightHand);
  const desktopHeld = system.value.getCurrentGrab(dummyHand);

  heldObject.value = vrHeld || desktopHeld;

  if (heldObject.value && heldObject.value.id === "wood-pile-hitbox") {
    showCampfireOff.value = true;
  }
};

const onPlayerNear = () => {
  campfireLight.value.setAttribute("intensity", "3");
  campfireLight.value.setAttribute("penumbra", "0.2");
  checkHeldObject(); // Vérifier l'objet tenu à l'approche de la zone
};

const onPlayerFar = () => {
  campfireLight.value.setAttribute("intensity", "0");
  campfireLight.value.setAttribute("penumbra", "0.1");
  showCampfireOff.value = false; // Cacher le campfire-off quand le joueur s'éloigne
};

const placeWood = () => {
  if (!heldObject.value || heldObject.value.id !== "wood-pile-hitbox") return;
  campfireState.value = "wood";
  campfireRotating.value = false;
  heldObject.value = null;
  campfireLight.value.setAttribute("intensity", "0"); // Éteindre la lumière
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
      v-if="showCampfireOff"
      gltf-model="#campfire-off"
      scale="2 2 2"
      position="0 0.2 0"
      rotation="0 0 0"
      class="clickable"
      :animation="
        campfireRotating
          ? 'property: rotation; to: 0 360 0; loop: true; easing: linear; dur: 10000'
          : ''
      "
      clickable
      @click="placeWood"
    ></a-entity>
  </a-entity>
</template>

<style></style>
