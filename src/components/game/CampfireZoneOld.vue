<script setup>
import { ref } from "vue";
import "../../aframe/emit-when-near.js";

const props = defineProps({
  position: { type: String, default: "80 1 32" },
  scale: { type: String, default: "1 1 1" },
});

const campfireLight = ref(null);
const indicator = ref(null);

const onPlayerNear = () => {
  campfireLight.value.setAttribute("intensity", "5");
  indicator.value.setAttribute("visible", "true");
};

const onPlayerFar = () => {
  campfireLight.value.setAttribute("intensity", "0");
  indicator.value.setAttribute("visible", "false");
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
      angle="15"
      penumbra="0.1"
      distance="3"
      position="0 2 0"
      rotation="-90 0 0"
      ref="campfireLight"
    ></a-light>
    <a-entity
      ref="indicator"
      gltf-model="#campfire-off"
      scale="2 2 2"
      position="0 0.2 0"
      rotation="0 0 0"
      animation="property: rotation; to: 0 360 0; loop: true; easing: linear; dur: 10000"
      visible="false"
    ></a-entity>
  </a-entity>
</template>
