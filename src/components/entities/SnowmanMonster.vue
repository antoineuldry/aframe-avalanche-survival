<script setup>
const props = defineProps({
  position: { type: String, default: "60 -0.25 -23" },
  rotation: { type: String, default: "0 29 0" },
  scale: { type: String, default: "1 1 1" },
  animation: { type: String, default: "clip:Walk;" },
});
</script>

<template>
  <a-entity
    gltf-model="#snowman-monster"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
  ></a-entity>
</template>
