<script setup>
import { computed, ref, useTemplateRef } from "vue";
import { store as logsStore } from "../../stores/logsStore.js";

const props = defineProps({
  model: { type: String, required: true },
  position: { type: String, default: "0 0 0" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "1 1 1" },
});

const nbHits = ref(0);
const isBroken = computed(() => nbHits.value >= 5);
const chopSound = useTemplateRef("chop-sound");

const handleCollision = (event) => {
  if (event.detail.withEl.id !== "hatchet") return;

  nbHits.value++;

  if (chopSound.value) {
    chopSound.value.components.sound.playSound();
    setTimeout(() => {
      if (chopSound.value) {
        chopSound.value.components.sound.stopSound();
      }
    }, 250);
  }

  if (isBroken.value) {
    const [x, y, z] = props.position.split(" ").map((v) => parseFloat(v));
    logsStore.addLog(`${x} 1 ${z}`);
  }
};
</script>

<template>
  <template v-if="!isBroken">
    <a-entity :position="position">
      <a-entity
        class="tree"
        geometry="primitive: box; width: 1.35; height: 8; depth: 1.35"
        material="visible: false; color: #ff0000"
        position="0 4 0"
        obb-collider
        @obbcollisionstarted="handleCollision($event)"
      >
      </a-entity>

      <a-sound
        ref="chop-sound"
        src="#sfx-axe-chop-tree"
        positional="true"
        position="0 4 0"
      ></a-sound>
    </a-entity>

    <a-entity :position="position" :rotation="rotation" :scale="scale">
      <a-gltf-model :src="model"></a-gltf-model>
    </a-entity>
  </template>
</template>
