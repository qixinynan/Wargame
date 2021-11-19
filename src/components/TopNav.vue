<template>
  <div>
    <el-menu mode="horizontal" :router="true" :default-active="routeName">
      <p v-if="isShowLogo" id="logo">War Game Demo</p>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/game">竞赛</el-menu-item>
      <el-menu-item index="3">关于</el-menu-item>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { computed, getCurrentInstance } from "vue";
export default {
  setup() {
    const routeName = computed(() => {
      return getCurrentInstance().proxy.$route.path;
    });

    const isShowLogo = computed(() => {
      if (window.innerWidth > 380) {
        return true;
      } else {
        return false;
      }
    });
    return { routeName, isShowLogo };
  },
};
</script>
<style lang="scss" scoped>
#logo {
  display: flex;
  padding-left: 10px;
  padding-right: 20px;
  font-size: 25px;
  margin: 0px;
  justify-content: center;
  align-items: center;
}
</style>