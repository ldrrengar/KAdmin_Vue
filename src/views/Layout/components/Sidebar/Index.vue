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
      <el-menu
        :collapse="!isCollapse"
        :unique-opened="false"
        :default-active="activeMenu"
        background-color="#fff"
        text-color="#162B64"
        :active-text-color="menuActiveTextColor"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import { useRoute } from 'vue-router'
// import variables from '@/styles/variables.scss' 
import { app } from '@/store/app'
import { permission } from '@/store/permission'
import { settings } from '@/store/settings'

export default defineComponent({
  components: {
    SidebarItem,
    SidebarLogo
  },
  setup() {
    const appStore = app()
    const permissionStore = permission()
    const settingsStore = settings()
    const route = useRoute()
    const sidebar = computed(() => {
      return appStore.sidebar
    })
    const routes = computed(() => {
      return permissionStore.routes
    })
    const showLogo = computed(() => {
      return settingsStore.showSidebarLogo
    })

    const menuActiveTextColor = computed(() => {
      console.log(settingsStore.sidebarTextTheme)

      if (settingsStore.sidebarTextTheme) {
        return '#57CAEB'
      } else {
        // return variables.menuActiveText
        return '#435EBE'
      }
    })

    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      return path
    })

    const isCollapse = computed(() => {
      return sidebar.value.opened
    })

    return {
      sidebar,
      routes,
      showLogo,
      menuActiveTextColor,
      // variables,
      activeMenu,
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
