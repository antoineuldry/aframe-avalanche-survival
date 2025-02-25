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
  <a-scene stats background="color: 87CEEB;">
    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item
        id="terrain-main"
        src="./assets/terrain/terrain-main.glb"
        mesh-resolution="0.1"
        mesh-smoothing-threshold="0.4"
        mesh-compression-level="0.6"
      ></a-asset-item>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <a-light type="ambient" color="#FFF" intensity="0.5"></a-light>
      <a-light
        type="directional"
        color="#FFF"
        intensity="1"
        position="1 1 0"
      ></a-light>

      <a-sky color="#87CEEB"></a-sky>

      <a-entity
        gltf-model="#terrain-main"
        scale="1 1 1"
        position="0 -10 0"
        rotation="0 0 0"
      ></a-entity>

      <a-fog color="#87CEEB" near="0" far="50"></a-fog>

      <a-ocean
        width="240"
        depth="60"
        amplitude="0.2"
        amplitudeVariance="0.1"
        position="9.2 -7.8 -130"
        rotation="-90 0 0"
      ></a-ocean>
      <a-ocean
        width="240"
        depth="60"
        amplitude="0.2"
        amplitudeVariance="0.1"
        position="9.2 -7.8 -130"
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
