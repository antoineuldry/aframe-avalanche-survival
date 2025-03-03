<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
import Hatchet from "./items/Hatchet.vue";
import Backpack from "./items/Backpack.vue";
import BushSnow from "./objects/BushSnow.vue";
import Flashlight from "./items/Flashlight.vue";

import "../aframe/hexagon-pavage.js";
import "../aframe/clickable.js";
import "../aframe/event-set.js";
import "../aframe/bind-position.js";

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
      <!-- Sky textures -->
      <img id="sky-day" src="/assets/sky/day.jpg" />
      <img id="sky-night" src="/assets/sky/night.jpg" />

      <!-- Terrain assets -->
      <a-asset-item
        id="terrain-main"
        src="./assets/terrain/terrain-main.glb"
      ></a-asset-item>
      <a-asset-item
        id="pine-tree-1"
        src="./assets/terrain/pine-tree-1.glb"
      ></a-asset-item>
      <a-asset-item
        id="pine-tree-2"
        src="./assets/terrain/pine-tree-2.glb"
      ></a-asset-item>
      <a-asset-item
        id="bush-snow"
        src="./assets/terrain/bush-snow.glb"
      ></a-asset-item>

      <!-- entities -->
      <a-asset-item id="fox" src="./assets/entities/fox.glb"></a-asset-item>
      <a-asset-item id="wolf" src="./assets/entities/wolf.glb"></a-asset-item>
      <a-asset-item id="stag" src="./assets/entities/stag.glb"></a-asset-item>
      <a-asset-item
        id="snowman-monster"
        src="./assets/entities/snowman-monster.glb"
      ></a-asset-item>
      <a-asset-item
        id="helicopter"
        src="./assets/entities/helicopter.glb"
      ></a-asset-item>

      <!-- Interactives Items -->
      <a-asset-item
        id="backpack"
        src="./assets/interactives/backpack.glb"
      ></a-asset-item>
      <a-asset-item
        id="campfire-off"
        src="./assets/interactives/campfire-off.glb"
      ></a-asset-item>
      <a-asset-item
        id="campfire-on"
        src="./assets/interactives/campfire-on.glb"
      ></a-asset-item>
      <a-asset-item
        id="flashlight"
        src="./assets/interactives/flashlight.glb"
      ></a-asset-item>
      <a-asset-item id="gps" src="./assets/interactives/gps.glb"></a-asset-item>
      <a-asset-item
        id="hatchet"
        src="./assets/interactives/hatchet.glb"
      ></a-asset-item>
      <a-asset-item
        id="lighter"
        src="./assets/interactives/lighter.glb"
      ></a-asset-item>
      <a-asset-item
        id="matchbox"
        src="./assets/interactives/matchbox.glb"
      ></a-asset-item>
      <a-asset-item
        id="open-book"
        src="./assets/interactives/open-book.glb"
      ></a-asset-item>
      <a-asset-item
        id="water-bottle"
        src="./assets/interactives/water-bottle.glb"
      ></a-asset-item>
      <a-asset-item
        id="wood-pile"
        src="./assets/interactives/wood-pile.glb"
      ></a-asset-item>

      <!-- Visual Effects -->
      <a-asset-item
        id="falling-snow"
        src="./assets/effects/falling-snow.glb"
      ></a-asset-item>

      <!-- TODO : SFX -->
    </a-assets>

    <template v-if="allAssetsLoaded">
      <!-- Lights -->
      <a-light type="ambient" color="#FFF" intensity="0.4"></a-light>
      <a-light
        type="directional"
        color="#FFF"
        intensity="0.4"
        position="1 1 0"
      ></a-light>

      <!-- Skies (day/night) -->
      <a-sky src="#sky-day" rotation="0 190 0"> </a-sky>
      <!-- <a-sky src="#sky-night" rotation="0 180 0"> </a-sky> -->

      <!-- Falling Snow Weather -->
      <!-- TODO : Snow weather uncomment when needed -->
      <!-- <a-entity bind-position="target: #head;">
        <a-entity
          gltf-model="#falling-snow"
          scale="2 2 2"
          position="0 -4 0"
          rotation="0 0 0"
          animation-mixer="clip:Animation;"
        ></a-entity>
        <a-entity
          gltf-model="#falling-snow"
          scale="2 2 2"
          position="1 -4 1"
          rotation="0 45 0"
          animation-mixer="clip:Animation;"
        ></a-entity>
        <a-entity
          gltf-model="#falling-snow"
          scale="2 2 2"
          position="-1 -4 -1"
          rotation="0 90 0"
          animation-mixer="clip:Animation;"
        ></a-entity>
        <a-entity
          gltf-model="#falling-snow"
          scale="2 2 2"
          position="2 -4 2"
          rotation="0 135 0"
          animation-mixer="clip:Animation;"
        ></a-entity>
      </a-entity> -->

      <!-- Main terrain -->
      <a-entity
        gltf-model="#terrain-main"
        scale="0.5 0.5 0.5"
        position="47 -2 15"
        rotation="0 0 0"
      ></a-entity>

      <!-- Pine Trees 1 -->
      <a-entity
        gltf-model="#pine-tree-1"
        scale="4 4 4"
        position="71 -2 32"
        rotation="0 0 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-1"
        scale="3 3 3"
        position="66 -2 20"
        rotation="0 0 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-1"
        scale="3 3 3"
        position="87 -1 12"
        rotation="0 12 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-1"
        scale="2 2 2"
        position="73 -2 -12"
        rotation="0 53 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-1"
        scale="3 3 3"
        position="30 -2 -28"
        rotation="0 90 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-1"
        scale="2 2 2"
        position="29 -2 -8"
        rotation="0 25 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-1"
        scale="5 5 5"
        position="3 -3 -18"
        rotation="0 4 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-1"
        scale="3 3 3"
        position="7 -5 10"
        rotation="0 -42 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-1"
        scale="3 3 3"
        position="3 -2 -23"
        rotation="0 -42 0"
      ></a-entity>

      <!-- Pine Tree 2 -->
      <a-entity
        gltf-model="#pine-tree-2"
        scale="0.6 0.6 0.6"
        position="60 -1 22"
        rotation="0 0 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-2"
        scale="0.3 0.3 0.3"
        position="68 -1 -7"
        rotation="0 12 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-2"
        scale="0.5 0.5 0.5"
        position="81 -1 1"
        rotation="0 53 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-2"
        scale="0.7 0.7 0.7"
        position="76 -1 -28"
        rotation="0 90 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-2"
        scale="0.7 0.7 0.7"
        position="55 -1 -18"
        rotation="0 25 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-2"
        scale="0.6 0.6 0.6"
        position="43 -1 8"
        rotation="0 4 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-2"
        scale="0.4 0.4 0.4"
        position="28 -1 0"
        rotation="0 -42 0"
      ></a-entity>
      <a-entity
        gltf-model="#pine-tree-2"
        scale="0.7 0.7 0.7"
        position="15 -1 -12"
        rotation="0 -42 0"
      ></a-entity>

      <!-- Bush Snow -->
      <BushSnow position="6 1 -3" />

      <!-- Mountain Lake -->
      <a-ocean
        width="200"
        depth="60"
        amplitude="0.2"
        amplitudeVariance="0.2"
        position="49.2 -0.8 -64"
        rotation="-90 0 0"
      ></a-ocean>
      <a-ocean
        width="200"
        depth="60"
        amplitude="0.2"
        amplitudeVariance="0.2"
        position="49.2 -0.8 -64"
        rotation="-90 0 0"
      ></a-ocean>

      <!-- entitiess -->
      <a-entity
        gltf-model="#wolf"
        scale="0.5 0.5 0.5"
        position="67 33.4 54"
        rotation="0 150 0"
        animation-mixer="clip:Idle;"
        clickable
        event-set__click="event: click; attribute: animation-mixer; value: clip:Attack;"
      ></a-entity>

      <a-entity
        gltf-model="#stag"
        scale="0.5 0.5 0.5"
        position="-3.5 29.7 58.5"
        rotation="0 130 0"
        animation-mixer="clip:Idle;"
        clickable
        event-set__click="event: click; attribute: animation-mixer; value: clip:Attack;"
      ></a-entity>

      <a-entity
        gltf-model="#fox"
        scale="0.5 0.5 0.5"
        position="31 1 44"
        rotation="0 120 0"
        animation-mixer="clip:Idle;"
        clickable
        event-set__click="event: click; attribute: animation-mixer; value: clip:Attack;"
      ></a-entity>

      <!-- TODO : Snowman uncomment when needed -->
      <!-- <a-entity
        gltf-model="#snowman-monster"
        scale="1 1 1"
        position="60 -0.25 -23"
        rotation="0 29 0"
        animation-mixer="clip:Walk;"
      ></a-entity> -->

      <!-- TODO : Helicopter uncomment when needed -->
      <!-- <a-entity
        gltf-model="#helicopter"
        scale="1.5 1.5 1.5"
        position="-190 100 -440"
        rotation="0 120 0"
        animation-mixer="clip:Main;"
      ></a-entity> -->
      <!-- End entitiess

      <!-- Test a-box pos 0 0 0 light green of 1m cube -->
      <a-box position="0 0 0" color="green" scale="1 1 1"></a-box>
      <a-box position="81 1 29" color="blue" scale="1 1 1"></a-box>
      <a-box position="80 1 32" color="red" scale="1 1 1"></a-box>

      <!-- Interactives Items -->
      <Backpack position="2 1 -3" rotation="0 0 0" />
      <Hatchet position="0 1 -3" rotation="0 90 0" />
      <Flashlight position="0 1 -1" />
    </template>

    <TheCameraRig />
  </a-scene>
</template>
