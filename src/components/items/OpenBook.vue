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
  carryStore.setCarryItem("open-book", { event });
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
      event-set__drop_rotation="event: taken; attribute: rotation; value: 0 0 0"
      event-set__drop_position="event: taken; attribute: position; value: 0 0 0"
    >
      <a-text
        value="Procédure d’Urgence
        1. Activer immédiatement l’émetteur GPS.
        2. Récupérer toutes vos affaires.
        3. Chercher des ressources pour survivre et se protéger.
        - Un feu éloigne certains dangers.
        - Placez-le près d’une paroi pour couper le vent.
        4. Pour allumer un feu :

Bois
Allume-feu (papier, mousse sèche, etc.)
Source d’allumage (briquet, allumettes)
Ne tardez pas si la nuit tombe. Se reposer est vital."
        position="-0.37 0.09 0.2"
        rotation="-90 0 0"
        width="0.4"
        height="0.17"
        wrap-count="20"
        color="black"
        align="left"
        baseline="top"
      ></a-text>
    </a-entity>
  </a-entity>

  <!-- <a-text
    value="right page"
    position="0 1 -1"
    rotation="90 0 0"
    scale="1 1 1"
    color="black"
    align="center"
    material="side: double"
  ></a-text> -->
</template>
