<script setup>
import { ref } from "vue";

import TheCameraRig from "./TheCameraRig.vue";
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

      <!-- NPC -->
      <a-asset-item id="fox" src="./assets/npc/fox.glb"></a-asset-item>
      <a-asset-item id="wolf" src="./assets/npc/wolf.glb"></a-asset-item>
      <a-asset-item id="stag" src="./assets/npc/stag.glb"></a-asset-item>
      <a-asset-item
        id="snowman-monster"
        src="./assets/npc/snowman-monster.glb"
      ></a-asset-item>
      <a-asset-item
        id="helicopter"
        src="./assets/npc/helicopter.glb"
      ></a-asset-item>

      <!-- Interactives Items -->
      <a-asset-item id="axe" src="./assets/interactives/axe.glb"></a-asset-item>
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
      <!-- TODO : uncomment when needed -->
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

      <!-- NPCs -->
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

      <!-- TODO : uncomment when needed -->
      <!-- <a-entity
        gltf-model="#snowman-monster"
        scale="1 1 1"
        position="60 -0.25 -23"
        rotation="0 29 0"
        animation-mixer="clip:Walk;"
      ></a-entity> -->

      <!-- TODO : uncomment when needed -->
      <!-- <a-entity
        gltf-model="#helicopter"
        scale="1.5 1.5 1.5"
        position="-190 100 -440"
        rotation="0 120 0"
        animation-mixer="clip:Main;"
      ></a-entity> -->
      <!-- End NPCs -->

      <!-- Test a-box pos 0 0 0 light green of 1m cube -->
      <a-box position="0 0 0" color="green" scale="1 1 1"></a-box>
      <a-box position="0 0 -10" color="darkgreen" scale="1 1 1"></a-box>
      <a-box position="47 0 0" color="blue" scale="1 1 1"></a-box>
      <a-box position="47 1 10" color="lightblue" scale="1 1 1"></a-box>
      <a-box position="47 0 -5" color="darkblue" scale="1 1 1"></a-box>

      <a-box position="75 0 -5" color="darkblue" scale="1 1 1"></a-box>
      <a-box position="4 0 -5" color="darkblue" scale="1 1 1"></a-box>

      <a-box position="85 0 0" color="red" scale="1 1 1"></a-box>
      <a-box position="85 1 10" color="pink" scale="1 1 1"></a-box>
      <a-box position="85 0 -10" color="purple" scale="1 1 1"></a-box>

      <a-box position="85 21 50" color="orange" scale="1 1 1"></a-box>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
