<script setup>
const props = defineProps({
  position: { type: String, default: "67 33.4 54.9" },
  rotation: { type: String, default: "0 154 0" },
  scale: { type: String, default: "1 1 1" },
  animation: { type: String, default: "clip:Idle;" },
});
</script>

<template>
  <a-entity
    gltf-model="#wolf"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
  ></a-entity>
</template>
