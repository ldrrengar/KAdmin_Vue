<!-- 面包屑组件 -->
<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in state.breadcrumbs" :key="item.path">
        <span v-if="item.redirect === 'noredirect' || index === state.breadcrumbs.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="state.handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
  
  <script lang="ts" setup>
import { onBeforeMount, reactive, toRefs, watch } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";
import router from "@/router/router";
import { compile } from "path-to-regexp";
const currentRoute = useRoute();
const pathCompile = (path: string) => {
  const { params } = currentRoute;
  const toPath = compile(path);
  return toPath(params);
};
const state = reactive({
  breadcrumbs: [] as Array<RouteLocationMatched>,
  getBreadcrumb: () => {
    let matched = currentRoute.matched.filter(
      (item) => item.meta && item.meta.title
    );
    const frist = matched[0];
    if (!state.isDashboard(frist)) {
      matched = [
        { path: "/home", meta: { title: "首页" } } as any,
      ].concat(matched);
    }
    state.breadcrumbs = matched.filter((item) => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false;
    });
    
  },
  isDashboard(route: RouteLocationMatched) {
    const name = route && route.name;
    if (!name) {
      return false;
    }
    return (
      name.toString().trim().toLocaleLowerCase() ===
      "Dashboard".toLocaleLowerCase()
    );
  },
  handleLink(item: any) {
    const { redirect, path } = item;
    if (redirect) {
      router.push(redirect).catch((err) => {
        console.warn(err);
      });
      return;
    }
    router.push(pathCompile(path)).catch((err) => {
      console.warn(err);
    });
  },
});

watch(
  () => currentRoute.path,
  (path) => {
    if (path.startsWith("/redirect/")) {
      return;
    }
    state.getBreadcrumb();
  }
);

onBeforeMount(() => {
  state.getBreadcrumb();
});
</script>
  
  <style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
  