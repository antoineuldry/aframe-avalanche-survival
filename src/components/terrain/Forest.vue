<script setup>
import Tree from "./Tree.vue";

const trees = [
  {
    model: "#pine-tree-1",
    position: "71 -2 32",
    rotation: "0 0 0",
    scale: "4 4 4",
  },
  {
    model: "#pine-tree-1",
    position: "66 -2 20",
    rotation: "0 0 0",
    scale: "3 3 3",
  },
  {
    model: "#pine-tree-1",
    position: "87 -1 12",
    rotation: "0 12 0",
    scale: "3 3 3",
  },
  {
    model: "#pine-tree-1",
    position: "73 -2 -12",
    rotation: "0 53 0",
    scale: "2 2 2",
  },
  {
    model: "#pine-tree-1",
    position: "30 -2 -28",
    rotation: "0 90 0",
    scale: "3 3 3",
  },
  {
    model: "#pine-tree-1",
    position: "29 -2 -8",
    rotation: "0 25 0",
    scale: "2 2 2",
  },
  {
    model: "#pine-tree-1",
    position: "3 -3 -18",
    rotation: "0 4 0",
    scale: "5 5 5",
  },
  {
    model: "#pine-tree-1",
    position: "7 -5 10",
    rotation: "0 -42 0",
    scale: "3 3 3",
  },
  {
    model: "#pine-tree-1",
    position: "3 -2 -23",
    rotation: "0 -42 0",
    scale: "3 3 3",
  },

  {
    model: "#pine-tree-2",
    position: "60 -1 22",
    rotation: "0 0 0",
    scale: "0.6 0.6 0.6",
  },
  {
    model: "#pine-tree-2",
    position: "68 -1 -7",
    rotation: "0 12 0",
    scale: "0.3 0.3 0.3",
  },
  {
    model: "#pine-tree-2",
    position: "81 -1 1",
    rotation: "0 53 0",
    scale: "0.5 0.5 0.5",
  },
  {
    model: "#pine-tree-2",
    position: "76 -1 -28",
    rotation: "0 90 0",
    scale: "0.7 0.7 0.7",
  },
  {
    model: "#pine-tree-2",
    position: "55 -1 -18",
    rotation: "0 25 0",
    scale: "0.7 0.7 0.7",
  },
  {
    model: "#pine-tree-2",
    position: "43 -1 8",
    rotation: "0 4 0",
    scale: "0.6 0.6 0.6",
  },
  {
    model: "#pine-tree-2",
    position: "28 -1 0",
    rotation: "0 -42 0",
    scale: "0.4 0.4 0.4",
  },
  {
    model: "#pine-tree-2",
    position: "15 -1 -12",
    rotation: "0 -42 0",
    scale: "0.7 0.7 0.7",
  },
];
</script>

<template>
  <a-entity>
    <Tree
      v-for="(tree, index) in trees"
      :key="index"
      :model="tree.model"
      :position="tree.position"
      :rotation="tree.rotation"
      :scale="tree.scale"
    />
  </a-entity>
</template>
