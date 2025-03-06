<script setup>
const props = defineProps({
  position: { type: String, default: "-190 100 -440" },
  rotation: { type: String, default: "0 120 0" },
  scale: { type: String, default: "1.5 1.5 1.5" },
  animation: { type: String, default: "clip:Main;" },
});
</script>

<template>
  <a-entity
    gltf-model="#helicopter"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
  ></a-entity>
</template>
