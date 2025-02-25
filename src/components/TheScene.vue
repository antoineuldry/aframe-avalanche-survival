<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import "../aframe/hexagon-pavage.js";

defineProps({
  scale: Number,
  overlaySelector: String,
});

const allAssetsLoaded = ref(false);
</script>

<template>
  <!-- TODO : Add fog as a-scene param (e.g. : fog="type: linear; color: #AAA; near: 0; far: 70") -->
  <a-scene stats background="color: 87CEEB;">
    <a-assets @loaded="allAssetsLoaded = true">
      <img id="sky-day" src="/assets/sky/day.jpg" />
      <img id="sky-night" src="/assets/sky/night.jpg" />
      <a-asset-item
        id="terrain-main"
        src="./assets/terrain/terrain-main.glb"
      ></a-asset-item>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <a-light type="ambient" color="#FFF" intensity="0.4"></a-light>
      <a-light
        type="directional"
        color="#FFF"
        intensity="0.4"
        position="1 1 0"
      ></a-light>

      <a-sky src="#sky-day" rotation="0 190 0"> </a-sky>
      <!-- <a-sky src="#sky-night" rotation="0 180 0"> </a-sky> -->

      <a-entity
        gltf-model="#terrain-main"
        scale="0.5 0.5 0.5"
        position="0 -2 0"
        rotation="0 0 0"
      ></a-entity>

      <!-- <a-fog color="#8a9ea6" near="0" far="20"></a-fog> -->
      <!-- <a-fog color="#000000" near="0" far="20"></a-fog> -->

      <a-ocean
        width="200"
        depth="60"
        amplitude="0.2"
        amplitudeVariance="0.2"
        position="9.2 -0.8 -82"
        rotation="-90 0 0"
      ></a-ocean>
      <a-ocean
        width="200"
        depth="60"
        amplitude="0.2"
        amplitudeVariance="0.2"
        position="9.2 -0.8 -82"
        rotation="-90 0 0"
      ></a-ocean>

      <!-- <a-entity
        hexagon-pavage="width: 8; depth: 8; hexSize: 1.5; gap: 0.1"
        position="0 0 0"
      ></a-entity> -->
    </template>

    <TheCameraRig />
  </a-scene>
</template>
