<script setup>
import { ref } from "vue";

defineProps({
  loaded: Boolean,
});

const showOnboarding = ref(true);

function enterScene() {
  showOnboarding.value = false;
  if (
    AFRAME.utils.device.checkHeadsetConnected() &&
    !AFRAME.utils.device.isMobile()
  ) {
    document.querySelector("a-scene").enterVR();
  }
  document.querySelector("a-scene").emit("enter-scene");
}
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">
    <div>
      <h1>Avalanche Survival Game</h1>
      <p v-if="!loaded">loading...</p>
      <button v-if="loaded" @click="enterScene()">Enter scene</button>
      <div class="licences">
        <section>
          <h3>Movement modes support</h3>
          <ul>
            <li>
              Desktop – Keyboard for move (WASD or Arrows keys) + Mouse for look
              control (Drag and drop)
            </li>
            <li>
              Mobile – 1x Finger touch to go forward + 2x Fingers touch to go
              backward + Gaze cursor for click
            </li>
            <li>
              VR/AR – walk + Teleport (Grip for grab and laser for click) + Gaze
              cursor for click
            </li>
          </ul>
        </section>
        <section>
          <h3>Source code</h3>
          <blockquote>
            <a href="https://github.com/antoineuldry/aframe-avalanche-survival"
              >Github repo</a
            >
          </blockquote>
        </section>
        <h3>Included</h3>
        <dl>
          <dt>
            <a href="https://github.com/c-frame/aframe-extras" target="_blank"
              >aframe-extras controls and animation-mixer</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a href="https://github.com/c-frame/physx" target="_blank"
              >aframe physx</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a
              href="https://github.com/jure/aframe-blink-controls/"
              target="_blank"
              >aframe-blink-controls</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a
              href="https://github.com/diarmidmackenzie/aframe-multi-camera/"
              target="_blank"
              >aframe-multi-camera</a
            >
          </dt>
          <dd>
            <a
              href="https://github.com/diarmidmackenzie/aframe-multi-camera/blob/main/LICENSE"
              target="_blank"
              >MIT License</a
            >
          </dd>

          <dt>
            <a
              href=" https://github.com/AdaRoseCannon/aframe-xr-boilerplate"
              target="_blank"
              >simple-navmesh-constraint</a
            >
          </dt>
          <dd>By Ada Rose Cannon under MIT License</dd>

          <hr />

          <h3>3D Models</h3>
          <h4>Effects</h4>
          <dt>
            <a
              href="https://sketchfab.com/3d-models/falling-snow-loop-a19b97d7e64548b998eaeb4d8477c24c"
              target="_blank"
            >
              Falling Snow Loop
            </a>
          </dt>
          <dd>
            by
            <a href="https://sketchfab.com/ElinHohler" target="_blank"
              >Elin Hohler</a
            >
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <hr />

          <h4>Entities</h4>
          <dt>
            <a href="https://poly.pizza/m/Bc97C66HKi" target="_blank"> Fox </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Quaternius" target="_blank"
              >Quaternius</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>

          <dt>
            <a
              href="https://sketchfab.com/3d-models/low-poly-helicopter-5bbed2de9baa4a13a7faa72653b78b64"
              target="_blank"
            >
              Helicopter
            </a>
          </dt>
          <dd>
            by
            <a href="https://sketchfab.com/antonmoek" target="_blank"
              >Anton Moek</a
            >
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <dt>
            <a
              href="https://sketchfab.com/3d-models/snowman-monster-e49e299a729e43928b5817b6c28158ad"
              target="_blank"
            >
              Snowman-Monster
            </a>
          </dt>
          <dd>
            by
            <a href="https://sketchfab.com/Batuhan13" target="_blank"
              >Batuhan13</a
            >
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/tQdzbZ1" target="_blank"> Stag </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Quaternius" target="_blank"
              >Quaternius</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>

          <hr />

          <h4>Interactives Items</h4>
          <dt>
            <a href="https://poly.pizza/m/2g9Jm7kvIU" target="_blank">
              Backpack
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Quaternius" target="_blank"
              >Quaternius</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/FsCIGEfTEs" target="_blank"> Book </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Quaternius" target="_blank"
              >Quaternius</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/9-y1lYsX0Lx" target="_blank">
              Campfire (off)
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Kris%20P" target="_blank">Kris P</a>
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/0vzzmM-t8CP" target="_blank">
              Campfire (on)
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Poly%20by%20Google" target="_blank"
              >Poly by Google</a
            >
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/4fbaKPvM0Ss" target="_blank">
              Flashlight
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Poly%20by%20Google" target="_blank"
              >Poly by Google</a
            >
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/aYdn7ZZaYqa" target="_blank">
              GPS Emitter (Walkie Talkie)
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Poly%20by%20Google" target="_blank"
              >Poly by Google</a
            >
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/aJ2yTQPbS34" target="_blank">
              Hatchet
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/zeoxo" target="_blank">zeoxo</a>
            under
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              >CC BY 4.0</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/t8AmON8X5a" target="_blank">
              Lighter
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/MaverickFX" target="_blank"
              >MaverickFX</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/ajBNpMsQ8z" target="_blank">
              Wood Pile
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Quaternius" target="_blank"
              >Quaternius</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>

          <hr />

          <h4>Terrain assets</h4>
          <dt>
            <a href="https://poly.pizza/m/H4IEAwYl1z" target="_blank">
              Bush (Snow)
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Quaternius" target="_blank"
              >Quaternius</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/SptEoObV5a" target="_blank">
              Pine Tree 1
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Quaternius" target="_blank"
              >Quaternius</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/KdvCshmdXz" target="_blank">
              Pine Tree 2
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Quaternius" target="_blank"
              >Quaternius</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/GHJzMn9XZ5" target="_blank">
              Terrain
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Quaternius" target="_blank"
              >Quaternius</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>

          <dt>
            <a href="https://poly.pizza/m/YRJmMnB3xL" target="_blank">
              Forest
            </a>
          </dt>
          <dd>
            by
            <a href="https://poly.pizza/u/Quaternius" target="_blank"
              >Quaternius</a
            >
            under
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              >Public Domain (CC0)</a
            >
          </dd>
          <hr />
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
}
a {
  color: #2f2f2f;
  text-decoration: none;
}
.licences {
  margin: 2rem 0;
  padding-bottom: 1rem;
  font-size: 1rem;
  text-align: left;
}
.licences dt {
  padding-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.licences dd {
  margin-left: 0;
  font-size: 0.8rem;
}

#onboarding {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #e4e4e4;
  color: #2f2f2f;
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  font-family: monospace;
  z-index: 10000;
  overflow: auto;
}
#onboarding > * {
  margin: 0 auto;
  max-width: 50rem;
  width: calc(100vw - 10rem);
  text-align: center;
  border-radius: 0.3rem;
  padding: 1rem;
  font-size: 1.3rem;
}
#onboarding button {
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  background-color: #2f2f2f;
  color: #e4e4e4;
  border: none;
  cursor: pointer;
}
</style>
#onboarding li { #onboarding li { font-size: 1rem; text-align: left; }
