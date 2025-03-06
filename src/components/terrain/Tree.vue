<script setup>
const props = defineProps({
  model: { type: String, required: true },
  position: { type: String, default: "0 0 0" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "1 1 1" },
});
</script>

<template>
  <a-entity
    :position="position"
    :rotation="rotation"
    :scale="scale"
    obb-collider
  >
    <a-gltf-model :src="model"></a-gltf-model>
  </a-entity>
</template>
