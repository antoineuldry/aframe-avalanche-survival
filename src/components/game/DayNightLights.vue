<script setup>
import { ref, watchEffect } from "vue";
import { store as actionsStore } from "../../stores/actionsStore.js";

const light = ref(null);
const sky = ref(null);

const updateLight = () => {
  if (actionsStore.getIsDone("morning")) {
    // Morning light
    light.value.setAttribute("type", "directional");
    light.value.setAttribute("color", "#FDFADC");
    light.value.setAttribute("intensity", 1.2);
    light.value.setAttribute("position", "-8 30 -20");
    sky.value.setAttribute("color", "#87CEEB");
    sky.value.setAttribute("opacity", 1);
    return;
  }
  if (actionsStore.getIsDone("sleep")) {
    // Night light
    light.value.setAttribute("type", "directional");
    light.value.setAttribute("color", "#3a2e00");
    light.value.setAttribute("intensity", 0.7);
    light.value.setAttribute("position", "40 42 -5");
    sky.value.setAttribute("color", "#000000");
    sky.value.setAttribute("opacity", 1);
    return;
  }
  if (actionsStore.getIsDone("litFire")) {
    // End of the day light
    light.value.setAttribute("type", "directional");
    light.value.setAttribute("color", "#FFC84B");
    light.value.setAttribute("intensity", 0.2);
    light.value.setAttribute("position", "90 30 10");
    sky.value.setAttribute("color", "#A36A00");
    sky.value.setAttribute("opacity", 0.5);
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
      color="#BDB39D"
      intensity="0.3"
      position="10 42 -32"
    ></a-light>
    <a-sky ref="sky" color="#000000" opacity="1"></a-sky>
  </a-entity>
</template>

<style scoped></style>
