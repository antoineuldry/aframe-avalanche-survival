<script setup>
import { ref } from "vue";

import Terrain from "./terrain/Terrain.vue";
import Forest from "./terrain/Forest.vue";
import FallingSnow from "./terrain/FallingSnow.vue";
import Water from "./terrain/Water.vue";

import { store as logsStore } from "../stores/logsStore.js";
import { store as actionsStore } from "../stores/actionsStore.js";

import Fox from "./entities/Fox.vue";
import Wolf from "./entities/Wolf.vue";
import Stag from "./entities/Stag.vue";
import SnowmanMonster from "./entities/SnowmanMonster.vue";
import Helicopter from "./entities/Helicopter.vue";

import TheCameraRig from "./TheCameraRig.vue";
import Backpack from "./items/Backpack.vue";
import Hatchet from "./items/Hatchet.vue";
import Flashlight from "./items/Flashlight.vue";
import Gps from "./items/Gps.vue";
import Lighter from "./items/Lighter.vue";
import Book from "./items/Book.vue";
import WoodPile from "./items/WoodPile.vue";

import BushSnow from "./terrain/BushSnow.vue";
import CampfireZone from "./game/CampfireZone.vue";

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
  <a-scene
    stats
    background="color: #83A8C3;"
    obb-collider="showColliders: false"
  >
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
      <a-asset-item
        id="navigation-mesh"
        src="./assets/terrain/navigation-mesh.glb"
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
        id="book"
        src="./assets/interactives/book.glb"
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
      <audio
        id="sfx-axe-chop-tree"
        src="./assets/sfx/sfx-axe-chop-tree.mp3"
      ></audio>
      <audio id="sfx-gps-signal" src="./assets/sfx/sfx-gps-signal.mp3"></audio>
    </a-assets>

    <template v-if="allAssetsLoaded">
      <!-- Lights -->
      <a-light type="ambient" color="#FFF" intensity="0.4"></a-light>

      <!-- TODO : Skies management -->
      <!-- dark sky with opacity -->
      <!-- <a-sky src="#sky-day" rotation="0 190 0"> </a-sky> -->
      <!-- <a-sky src="#sky-night" rotation="0 180 0"> </a-sky> -->

      <!-- Falling Snow Weather -->
      <!-- TODO : Snow weather uncomment when needed -->
      <!-- <FallingSnow /> -->

      <template v-for="(logs, index) in logsStore.getLogs()" :key="index">
        <WoodPile :position="logs" />
      </template>

      <!-- Terrain -->
      <Terrain />
      <Water />
      <Forest />
      <BushSnow />

      <!-- Entities -->
      <!-- TODO : Snowman and Helicopter uncomment when needed -->
      <Wolf />
      <Fox />
      <Stag />
      <!-- <SnowmanMonster />
      <Helicopter /> -->

      <!-- TODO : Delete - Test a-box pos 0 0 0 light green of 1m cube -->
      <a-box position="0 0 0" color="green" scale="1 1 1"></a-box>
      <a-box position="81 1 29" color="blue" scale="1 0.2 1"></a-box>
      <!-- <a-box position="80 1 32" color="red" scale="1 0.2 1"></a-box> -->

      <CampfireZone v-if="actionsStore.getIsDone('emitGpsSignal')" />

      <!-- Interactives Items -->
      <Backpack />
      <!-- <Flashlight position="0 1.5 -1" /> -->
      <!-- <Gps position="0 1.5 -1" /> -->
      <!-- <Lighter position="1 1.5 -1" /> -->
      <!-- <Book position="0 1.75 -0.5" rotation="90 0 0" /> -->
      <!-- <WoodPile position="0 1.5 -1" /> -->

      <a-gltf-model
        src="#navigation-mesh"
        data-role="nav-mesh"
        position="47 -2.5 14.56"
        scale="0.5 0.5 0.5"
        visible="false"
      ></a-gltf-model>
    </template>

    <TheCameraRig />
  </a-scene>
</template>
