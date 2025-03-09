<script setup>
import { ref, watchEffect, useTemplateRef } from "vue";
import { store as actionsStore } from "../../stores/actionsStore.js";
import "../../aframe/emit-when-near.js";

// Propriétés de la zone de repos
const props = defineProps({
  position: { type: String, default: "81 1.5 29" }, // Position du bloc de test
  scale: { type: String, default: "1 0.2 1" },
});

// Variables d'état
const showLightBlue = ref(false); // Lumière bleue
const isPlayerNear = ref(false); // Vérification si le joueur est proche
const lightColor = ref("#AAAAFF"); // Couleur de la lumière (bleu)
const interactionDone = ref(false); // Si l'interaction a déjà eu lieu

const layingUpDownSound = useTemplateRef("sound-laying-up-down");

// TODO : Add sleep effects (closing eye -> shutdown lights progrssively then open it (turn on light progressively but make it hard to see)
// and block the player's interaction and movement on the position of the rest zone with rotation to snowman-monster initial position

const onPlayerNear = () => {
  isPlayerNear.value = true;

  if (actionsStore.getIsDone("litFire")) {
    showLightBlue.value = true;
  }
};

const onPlayerFar = () => {
  isPlayerNear.value = false;
  showLightBlue.value = false;
};

const handleSleep = () => {
  if (!actionsStore.getIsDone("litFire")) {
    return;
  }

  layingUpDownSound.value.components.sound.playSound();
  setTimeout(() => {
    layingUpDownSound.value.components.sound.stopSound();
  }, 1500);

  actionsStore.performAction("sleep");
  interactionDone.value = true;
  showLightBlue.value = false;
};

watchEffect(() => {
  showLightBlue.value =
    actionsStore.getIsDone("litFire") && isPlayerNear.value ? true : false;
});
</script>

<template>
  <a-entity
    class="rest-zone"
    :position="props.position"
    :scale="props.scale"
    emit-when-near="target: #head; distance: 3; event: rest-zone-near; eventFar: rest-zone-far; throttle: 200"
    @rest-zone-near="onPlayerNear"
    @rest-zone-far="onPlayerFar"
  >
    <a-light
      v-if="showLightBlue && !interactionDone"
      type="spot"
      :color="lightColor"
      intensity="3"
      penumbra="0.2"
      distance="4"
      position="0 0.5 0"
      rotation="-90 0 0"
    ></a-light>

    <a-cylinder
      v-if="showLightBlue && !interactionDone"
      color="#CFE2F3"
      position="0 0 0"
      opacity="0.5"
      radius="0.5"
      height="1"
      class="clickable"
      clickable
      @click="handleSleep"
    ></a-cylinder>
  </a-entity>

  <!-- TODO : Attach sound to RestZone entity -->
  <a-sound ref="sound-laying-up-down" src="#sfx-laying-up-down"></a-sound>
</template>

<style scoped></style>
