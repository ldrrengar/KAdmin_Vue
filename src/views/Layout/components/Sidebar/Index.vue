<!-- 侧边栏 -->
<template>
  <div
    :class="{'has-logo': showLogo}"
    class="sideWrap"
  >
    <SidebarLogo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
    
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
// import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'

export default defineComponent({
  components: {
    // SidebarItem,
    SidebarLogo
  },
  setup() {
//    const showLogo = computed(() => {
//       return store.state.settings.showSidebarLogo
//     })
//      const isCollapse = computed(() => {
//       return sidebar.value.opened
//     })
    const showLogo = true
    const isCollapse = true
    return {
     showLogo,
     isCollapse
    }
  }
})
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    height: calc(100vh - 100px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
