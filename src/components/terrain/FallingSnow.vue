<script setup>
const snows = [
  {
    model: "#falling-snow",
    position: "0 -4 0",
    rotation: "0 0 0",
    scale: "2 2 2",
  },
  {
    model: "#falling-snow",
    position: "1 -4 1",
    rotation: "0 45 0",
    scale: "2 2 2",
  },
  {
    model: "#falling-snow",
    position: "-1 -4 -1",
    rotation: "0 90 0",
    scale: "2 2 2",
  },
  {
    model: "#falling-snow",
    position: "2 -4 2",
    rotation: "0 135 0",
    scale: "2 2 2",
  },
  {
    model: "#falling-snow",
    position: "-2 -4 2",
    rotation: "0 180 0",
    scale: "2 2 2",
  },
  {
    model: "#falling-snow",
    position: "3 -4 -2",
    rotation: "0 225 0",
    scale: "2 2 2",
  },
  {
    model: "#falling-snow",
    position: "-3 -4 -3",
    rotation: "0 270 0",
    scale: "2 2 2",
  },
  {
    model: "#falling-snow",
    position: "4 -4 1",
    rotation: "0 315 0",
    scale: "2 2 2",
  },
];
</script>

<template>
  <!-- Falling Snow Weather -->
  <a-entity bind-position="target: #head;">
    <a-entity
      v-for="(snow, index) in snows"
      :key="index"
      :gltf-model="snow.model"
      :position="snow.position"
      :rotation="snow.rotation"
      :scale="snow.scale"
      animation-mixer="clip:Animation;"
    />
  </a-entity>
</template>
