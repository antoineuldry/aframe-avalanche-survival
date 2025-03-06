<script setup>
const props = defineProps({
  position: { type: String, default: "31 1 44" },
  rotation: { type: String, default: "0 120 0" },
  scale: { type: String, default: "0.5 0.5 0.5" },
  animation: { type: String, default: "clip:Idle;" },
});
</script>

<template>
  <a-entity
    gltf-model="#fox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
  ></a-entity>
</template>
