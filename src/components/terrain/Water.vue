<script setup>
const waters = [
  {
    width: "200",
    depth: "60",
    amplitude: "0.2",
    amplitudeVariance: "0.2",
    position: "49.2 -0.8 -64",
    rotation: "-90 0 0",
  },
  {
    width: "200",
    depth: "60",
    amplitude: "0.2",
    amplitudeVariance: "0.2",
    position: "49.2 -0.8 -64",
    rotation: "-90 0 0",
  },
];

// TODO : Add sound for little water waves
</script>

<template>
  <!-- Water Surface -->
  <a-entity>
    <a-ocean
      v-for="(water, index) in waters"
      :key="index"
      :width="water.width"
      :depth="water.depth"
      :amplitude="water.amplitude"
      :amplitude-variance="water.amplitudeVariance"
      :position="water.position"
      :rotation="water.rotation"
    />
  </a-entity>
</template>
