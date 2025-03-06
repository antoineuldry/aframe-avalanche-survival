<script setup>
import { store as carryStore } from "../../stores/carryStore.js";
import "../../aframe/simple-grab.js";
import "../../aframe/listen-to.js";
import "../../aframe/event-set.js";

const props = defineProps({
  position: { type: String, default: "1 1 4" },
  rotation: { type: String, default: "0 0 0" },
  scale: { type: String, default: "0.5 0.5 0.5" },
});

const handleGrab = (event) => {
  carryStore.setCarryItem("book", { event });
};
</script>

<template>
  <a-entity
    id="open-book-hitbox"
    :position="position"
    :rotation="rotation"
    :scale="scale"
    clickable
    simple-grab
    geometry="primitive: box; width: 0.95; height: 0.17; depth: 0.8"
    material="visible: false; color: #ff0000"
    @grab="handleGrab($event)"
  >
    <a-entity
      gltf-model="#open-book"
      listen-to-grab="target: #open-book-hitbox; event: grab; emit: taken"
      listen-to-drop="target: #open-book-hitbox; event: grab; emit: drop"
      event-set__taken_rotation="event: taken; attribute: rotation; value: 0 0 0"
      event-set__taken_position="event: taken; attribute: position; value: 0 0 0"
      event-set__drop_rotation="event: drop; attribute: rotation; value: 0 0 0"
      event-set__drop_position="event: drop; attribute: position; value: 0 0 0"
    >
      <a-text
        value="Emergency Procedure
        
        1. Activate the GPS distress signal immediately.
        
        2. Make sure you have all your belongings. (total of 6 items)
        
        3. Gather resources quickly to survive and stay safe.

          - Building a fire helps keep certain dangers away.
          - The ideal spot is near a wall or rock face to block the wind."
        position="-0.36 0.09 0.18"
        rotation="-90 0 0"
        baseline="bottom"
        width="0.4"
        height="0.17"
        wrap-count="32"
        color="black"
        align="left"
      ></a-text>

      <a-text
        value="4. To build a fire, you need:

        - Wood
        - Tinder (paper, dry moss, etc.)
        - Ignition source (lighter, matches)
        
        5. Don't waste time if night is approaching. Rest is essential."
        position="0.02 0.09 0.05"
        rotation="-90 0 0"
        baseline="bottom"
        width="0.39"
        height="0.22"
        wrap-count="32"
        color="black"
        align="left"
      ></a-text>
    </a-entity>
  </a-entity>
</template>
