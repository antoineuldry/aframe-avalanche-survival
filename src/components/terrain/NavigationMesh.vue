<script setup>
const navMesh = {
  model: "#navigation-mesh",
  position: "47 -2.5 14.56",
  rotation: "0 0 0",
  scale: "0.5 0.5 0.5",
  visible: false,
  role: "nav-mesh",
};
</script>

<template>
  <a-entity>
    <a-gltf-model
      :src="navMesh.model"
      :position="navMesh.position"
      :rotation="navMesh.rotation"
      :scale="navMesh.scale"
      :visible="navMesh.visible"
      :data-role="navMesh.role"
    />
  </a-entity>
</template>
