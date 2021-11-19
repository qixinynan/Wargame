<template>
  <top-nav></top-nav>
  <router-view class="view" />
</template>

<script>
import TopNav from "./components/TopNav.vue";
export default {
  components: { TopNav },
  name: "App",
};
</script>
