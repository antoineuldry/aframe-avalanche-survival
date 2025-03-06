<script setup>
const terrain = {
  model: "#terrain-main",
  position: "47 -2 15",
  rotation: "0 0 0",
  scale: "0.5 0.5 0.5",
};
</script>

<template>
  <!-- Main Terrain -->
  <a-entity>
    <a-entity
      :gltf-model="terrain.model"
      :position="terrain.position"
      :rotation="terrain.rotation"
      :scale="terrain.scale"
    />
  </a-entity>
</template>
