<template>
  <div>
    <p>Game1</p>
    <canvas ref="canvas" id="renderCanvas"></canvas>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import useGameView from "../composables/useGameView";
export default {
  setup() {
    let canvas = ref(null);
    useGameView(canvas);
    return { canvas };
  },
};
</script>
<style lang="scss" scoped>
</style>