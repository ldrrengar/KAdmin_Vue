<template>
  <!-- v-if="!item.meta || !item.meta.hidden" -->
  <div :class="[
    isCollapse ? 'simple-mode' : 'full-mode',
    { 'first-level': isFirstLevel }
  ]">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)" :class="{ 'submenu-title-noDropdown': isFirstLevel }">
          <svg v-if="theOnlyOneChild.meta.icon" class="icon" aria-hidden="true" font-size="17px">
            <use :xlink:href="theOnlyOneChild.meta.icon" />
          </svg>
          <span v-if="theOnlyOneChild.meta.title">{{
            theOnlyOneChild.meta.title
          }}</span>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <svg v-if="item.meta && item.meta.icon" class="icon" aria-hidden="true" font-size="16px">
          <use :xlink:href="item.meta.icon" />
        </svg>
        <span v-if="item.meta && item.meta.title">{{
          item.meta.title
        }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :is-collapse="isCollapse"
          :is-first-level="false" :base-path="resolvePath(child.path)"  class="nest-menu" />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
// import path from 'path'
import path from 'path-browserify'
import { computed, defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink.vue'
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: false
    },
    isFirstLevel: {
      type: Boolean,
      required: true
    },
    basePath: {
      type: String,
      required: true
    }
  },
  components: {
    SidebarItemLink
  },
  setup(props) {

    // 根目录是否是一直显示
    const alwaysShowRootMenu = computed(() => {
      if (props.item.meta && props.item.meta.alwaysShow) {
        return true
      } else {
        return false
      }
    })

    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })

    // 当只有一个子菜单时只显示子菜单
    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      return { ...props.item, path: '' }
    })

    const resolvePath = (routePath: string) => {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(props.basePath)) {
        return props.basePath
      }
      return path.resolve(props.basePath, routePath)
    }

    return {
      alwaysShowRootMenu,
      showingChildNumber,
      theOnlyOneChild,
      resolvePath
    }
  }
})
</script>

<style lang="scss" scoped>
.el-submenu.is-active>.el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {

  .nest-menu .el-submenu>.el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }

  .el-menu-item {
    &>span {
      display: inline-block;
      padding-left: 5px;
    }
  }

  .el-submenu {
    overflow: hidden;

    &>.el-submenu__title {
      .el-submenu__icon-arrow {
        display: none;
      }

      &>span {
        padding-left: 5px;

      }
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      &>.el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        &>span {
          visibility: hidden;
        }
      }
    }
  }
}

svg {
  margin-right: 16px;
}

.simple-mode {
  svg {
    margin-left: 20px;
  }
}
</style>
