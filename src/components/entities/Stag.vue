<script setup>
const props = defineProps({
  position: { type: String, default: "-3.5 29.7 58.5" },
  rotation: { type: String, default: "0 130 0" },
  scale: { type: String, default: "0.5 0.5 0.5" },
  animation: { type: String, default: "clip:Idle;" },
});
</script>

<template>
  <a-entity
    gltf-model="#stag"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    :animation-mixer="animation"
  ></a-entity>
</template>
