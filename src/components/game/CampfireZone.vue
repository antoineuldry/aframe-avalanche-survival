<script setup>
import { ref, computed, watchEffect, useTemplateRef } from "vue";
import { store as carryStore } from "../../stores/carryStore.js";
import { store as actionsStore } from "../../stores/actionsStore.js";
import "../../aframe/emit-when-near.js";

const props = defineProps({
  position: { type: String, default: "80 1 32" },
  scale: { type: String, default: "1 1 1" },
});

const ITEM_ORDER = ["wood-pile", "book", "lighter"];

const campfireLevel = ref(0);
const showLight = ref(false);
const interactionDone = ref(false);
const lightColor = ref("#ff8b8b");
const isPlayerNear = ref(false);

const campfireBaseSound = useTemplateRef("sound-campfire-base");
const bookSound = useTemplateRef("sound-campfire-book");
const lighterSound = useTemplateRef("sound-lighter");
const campfireStartLitSound = useTemplateRef("sound-campfire-start-lit");
const campfireLitSound = useTemplateRef("sound-campfire-lit");

const campfireModel = computed(() => {
  return campfireLevel.value >= 3 ? "#campfire-on" : "#campfire-off";
});
const showRotatingFire = computed(() => {
  const item = carryStore.getCarryItem();
  if (!item) return false;
  return item.itemName === "wood-pile";
});

const onPlayerNear = () => {
  isPlayerNear.value = true;
  if (campfireLevel >= 3) return;
  showLight.value = true;
  const carryItem = carryStore.getCarryItem();
  if (!carryItem) return;

  const itemIndex = ITEM_ORDER.indexOf(carryItem.itemName);
  if (itemIndex === -1) return;

  if (campfireLevel.value === itemIndex) {
    lightColor.value = "#AAAAFF";
  }
};

const onPlayerFar = () => {
  isPlayerNear.value = false;
  resetLight();
};

const handleClick = (event) => {
  const item = carryStore.getCarryItem();
  if (!item) return;

  switch (item.itemName) {
    case "wood-pile":
      campfireLevel.value++;
      campfireBaseSound.value.components.sound.playSound();
      resetLight();
      destroyCarryItem(item);
      break;
    case "book":
      campfireLevel.value++;
      bookSound.value.components.sound.playSound();
      resetLight();
      destroyCarryItem(item);
      break;
    case "lighter":
      lighterSound.value.components.sound.playSound();
      resetLight();
      actionsStore.performAction("litFire");
      handleFireStart(); // Déclenchement du son séquentiel du feu
      break;
    default:
      console.log("default");
  }
};

const resetLight = () => {
  showLight.value = false;
  lightColor.value = "#ff8b8b";
};

const destroyCarryItem = (item) => {
  const el = item.details.event.detail.el;
  if (!el) return;
  const scene = document.querySelector("a-scene");
  const hand = el.components["simple-grab"]?.grabbedBy;
  if (hand) {
    scene.systems["simple-grab"].removeCurrentGrab(hand, el);
  }
  el.parentNode?.removeChild(el);
  carryStore.clearCarryItem();
};

const handleFireStart = () => {
  lighterSound.value.components.sound.playSound();

  setTimeout(() => {
    campfireStartLitSound.value.components.sound.playSound();

    setTimeout(() => {
      campfireLevel.value++;
    }, 1500);

    setTimeout(() => {
      campfireStartLitSound.value.components.sound.stopSound();
      campfireLitSound.value.components.sound.playSound();
    }, 5000); // Après les 5 secondes du "start-lit"
  }, 3000); // Après les 3 secondes du "lighter"
};

watchEffect(() => {
  if (actionsStore.getIsDone("sleep")) {
    stopCampfire();
  }
});

const stopCampfire = () => {
  campfireLitSound.value.components.sound.stopSound();
  campfireLevel.value = 1;

  // Éteindre la lumière du feu
  const campfireLight = document.querySelector("#campfire-light");
  if (campfireLight) {
    campfireLight.setAttribute("intensity", 0);
  }
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
    <!-- Lumière pour le feu -->
    <a-light
      v-if="showLight && !interactionDone"
      id="campfire-light"
      type="spot"
      :color="lightColor"
      intensity="3"
      penumbra="0.2"
      distance="4"
      position="0 0.5 0"
      rotation="-90 0 0"
      ref="campfireLight"
    ></a-light>

    <!-- Feu de camp (rotatif si nécessaire) -->
    <a-entity
      v-if="(showRotatingFire && isPlayerNear) || campfireLevel > 0"
      :gltf-model="campfireModel"
      :scale="campfireModel === '#campfire-on' ? '1 1 1' : '2 2 2'"
      :position="campfireModel === '#campfire-on' ? '0 0.33 0' : '0 0.2 0'"
      rotation="0 0 0"
      class="clickable"
      :animation="
        showRotatingFire && isPlayerNear && campfireLevel === 0
          ? 'property: rotation; to: 0 360 0; loop: true; easing: linear; dur: 10000'
          : null
      "
      clickable
      @click="handleClick($event)"
    >
      <a-light
        v-if="campfireModel === '#campfire-on'"
        type="spot"
        color="#FFA500"
        intensity="10"
        penumbra="1"
        distance="12"
        position="0 1.5 0"
        rotation="-90 0 0"
        castShadow="true"
        animation="property: intensity; to: 4; loop: true; dir: alternate; dur: 1000"
      ></a-light>
    </a-entity>

    <!-- TODO : Attach sound to campfire entity -->
    <a-sound
      ref="sound-campfire-base"
      src="#sfx-campfire-base"
      positional="true"
    ></a-sound>
    <a-sound
      ref="sound-campfire-book"
      src="#sfx-campfire-book"
      positional="true"
    ></a-sound>
    <a-sound ref="sound-lighter" src="#sfx-lighter" positional="true"></a-sound>
    <a-sound
      ref="sound-campfire-start-lit"
      src="#sfx-campfire-start-lit"
      positional="true"
    ></a-sound>
    <a-sound
      ref="sound-campfire-lit"
      src="#sfx-campfire-lit"
      positional="true"
      loop="true"
    ></a-sound>
  </a-entity>
</template>

<style></style>
