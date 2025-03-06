<script setup>
import { ref, defineEmits } from "vue";

const currentTime = ref(0); // 0 = jour, 1 = nuit
const timeSpeed = ref(1); // Vitesse du passage du temps (par exemple, 1 = normal, 2 = accéléré)
const emit = defineEmits();

const advanceTime = () => {
  // Logique pour faire avancer le temps (cycle jour/nuit)
  currentTime.value = (currentTime.value + timeSpeed.value) % 2;

  // Émet l'événement pour notifier les autres composants du changement de temps
  emit("timeChanged", currentTime.value);
};

// Appeler advanceTime selon l'intervalle du jeu
const startCycle = () => {
  setInterval(advanceTime, 1000); // Par exemple, chaque seconde fait avancer le temps
};

onMounted(() => {
  startCycle();
});
</script>

<template>
  <div>
    <!-- Affiche l'état actuel du temps pour debug -->
    <p>{{ currentTime === 0 ? "Day" : "Night" }}</p>
  </div>
</template>
