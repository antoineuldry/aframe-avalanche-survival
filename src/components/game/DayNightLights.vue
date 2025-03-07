<script setup>
import { ref, watchEffect } from "vue";
import { store as actionsStore } from "../../stores/actionsStore.js";

const light = ref(null);

const updateLight = () => {
  if (actionsStore.getIsDone("morning")) {
    // Morning light
    light.value.setAttribute("type", "directional");
    light.value.setAttribute("color", "#FFE974");
    light.value.setAttribute("intensity", 1.5);
    light.value.setAttribute("position", "-8 30 -20");
    return;
  }
  if (actionsStore.getIsDone("sleep")) {
    // Night light
    light.value.setAttribute("type", "directional");
    light.value.setAttribute("color", "#3a2e00");
    light.value.setAttribute("intensity", 1);
    light.value.setAttribute("position", "40 42 -5");
    return;
  }
  if (actionsStore.getIsDone("litFire")) {
    // End of the day light
    light.value.setAttribute("type", "directional");
    light.value.setAttribute("color", "#fdb602");
    light.value.setAttribute("intensity", 0.5);
    light.value.setAttribute("position", "90 30 10");
    return;
  }
};

watchEffect(() => {
  updateLight();
});
</script>

<template>
  <a-entity>
    <a-light
      ref="light"
      type="directional"
      color="#FFFFFF"
      intensity="0.4"
      position="10 42 -32"
    ></a-light>
  </a-entity>
</template>

<style scoped></style>
