<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/square-pavage.js";

defineProps({
  scale: Number,
  overlaySelector: String,
});

const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene background="color: 87CEEB;">
    <a-assets @loaded="allAssetsLoaded = true"> </a-assets>

    <template v-if="allAssetsLoaded">
      <a-light type="ambient" color="#FFF" intensity="0.5"></a-light>
      <a-light
        type="directional"
        color="#FFF"
        intensity="1"
        position="1 1 0"
      ></a-light>

      <a-fog color="#87CEEB" near="0" far="50"></a-fog>

      <a-ocean
        width="100"
        depth="100"
        amplitude="0.5"
        amplitudeVariance="0.1"
        position="0 -1 0"
      ></a-ocean>
      <a-ocean
        width="100"
        depth="100"
        amplitude="0.5"
        amplitudeVariance="0.1"
        position="0 -1 0"
      ></a-ocean>

      <a-entity
        square-pavage="width: 10; depth: 10;"
        position="0 0 0"
      ></a-entity>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
