<template>
  <div id="tags-view-container" class="tags-view-container">
    <ScrollPane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="state.handleScroll">
      <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path" :class="state.isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span" class="tags-view-item"
        @click.middle="!state.isAffix(tag) ? state.closeSelectedTag(tag) : ''"
        @contextmenu.prevent="state.openMenu(tag, $event)">
        {{ tag.meta.title }}
        <el-icon v-if="!state.isAffix(tag)" class="el-icon-close"  @click.prevent.stop="state.closeSelectedTag(tag)"><Close /></el-icon>
        <!-- <span v-if="!state.isAffix(tag)" class="el-icon-close" @click.prevent.stop="state.closeSelectedTag(tag)" /> -->
      </router-link>
    </ScrollPane>
    <ul v-show="state.visible" :style="{ left: state.left + 'px', top: state.top + 'px' }" class="contextmenu">
      <li @click="state.refreshSelectedTag(state.selectedTag)">
        刷新
      </li>
      <li v-if="!state.isAffix(state.selectedTag)" @click="state.closeSelectedTag(state.selectedTag)">
        关闭
      </li>
      <li @click="state.closeOthersTags">
        关闭其它
      </li>
      <li @click="state.closeAllTags(state.selectedTag)">
        关闭所有
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// import path from 'path'
import path from 'path-browserify'
import { tagsView, TagView } from '@/store/tagsview'
import { permission } from '@/store/permission'
import { computed, getCurrentInstance, nextTick, onBeforeMount, reactive, ref, toRefs, watch } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import ScrollPane from './scrollPane.vue'
const tagsStore = tagsView()
const permissionStore = permission()
const router = useRouter()
const instance = getCurrentInstance()
const currentRoute = useRoute()
const scrollPaneRef = ref(null)
const { proxy } = instance as any

const toLastView = (visitedViews: TagView[], view: TagView) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath).catch(err => {
      console.warn(err)
    })
  } else {
    if (view.name === 'Dashboard') {
      router.push({ path: '/redirect' + view.fullPath }).catch(err => {
        console.warn(err)
      })
    } else {
      router.push('/').catch(err => {
        console.warn(err)
      })
    }
  }
}

const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {} as TagView,
  affixTags: [] as TagView[],
  isActive: (route: TagView) => {
    return route.path === currentRoute.path
  },
  isAffix: (tag: TagView) => {
    return tag.meta && tag.meta.affix
  },
  refreshSelectedTag: (view: TagView) => {
    tagsStore.delCachedView(view)
    const { fullPath } = view
    nextTick(() => {
      router.replace({ path: '/redirect' + fullPath }).catch(err => {
        console.warn(err)
      })
    })
  },
  closeSelectedTag: (view: TagView) => {
    tagsStore.delVisitedView(view)
    tagsStore.delCachedView(view)
    if (state.isActive(view)) {
      toLastView(tagsStore.visitedViews, view)
    }
  },
  closeOthersTags: () => {
    if (state.selectedTag.fullPath !== currentRoute.path && state.selectedTag.fullPath !== undefined) {
      router.push(state.selectedTag.fullPath).catch(err => {
        console.log(err)
      })
    }
    tagsStore.delOthersCachedViews(state.selectedTag as TagView)
    tagsStore.delOthersVisitedViews(state.selectedTag as TagView)
  },
  closeAllTags: (view: TagView) => {
    tagsStore.delAllVisitedViews()
    tagsStore.delAllCachedViews()
    if (state.affixTags.some(tag => tag.path === currentRoute.path)) {
      return
    }
    toLastView(tagsStore.visitedViews, view)
  },
  openMenu: (tag: TagView, e: MouseEvent) => {
    const menuMinWidth = 105
    const offsetLeft = proxy.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = proxy.$el.offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft + 15 // 15: margin right
    if (left > maxLeft) {
      state.left = maxLeft
    } else {
      state.left = left
    }
    state.top = e.clientY
    state.visible = true
    state.selectedTag = tag
  },
  closeMenu: () => {
    state.visible = false
  },
  handleScroll: () => {
    state.closeMenu()
  }
})

const visitedViews = computed(() => {
  return tagsStore.visitedViews
})
const routes = computed(() => permissionStore.routes)

const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: TagView[] = []

  routes.forEach(route => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }

    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      if (childTags.length >= 1) {
        tags = tags.concat(childTags)
      }
    }
  })
  return tags
}

const initTags = () => {
  state.affixTags = filterAffixTags(routes.value)
  for (const tag of state.affixTags) {
    // Must have tag name
    if (tag.name) {
      tagsStore.addVisitedView(tag as TagView)
    }
  }
}

const addTags = () => {
  if (currentRoute.name) {
    tagsStore.addCachedView(currentRoute)
    tagsStore.addVisitedView(currentRoute)
  }
  return false
}

const moveToCurrentTag = () => {
  const tags = instance?.refs.tag as any[]
  nextTick(() => {
    if (tags === null || tags === undefined || !Array.isArray(tags)) { return }
    for (const tag of tags) {
      if ((tag.to as TagView).path === currentRoute.path) {
        (scrollPaneRef.value as any).moveToCurrentTag(tag)
        // When query is different then update
        if ((tag.to as TagView).fullPath !== currentRoute.fullPath) {
          tagsStore.updateVisitedView(currentRoute)
        }
      }
    }
  })
}

watch(() => currentRoute.name, () => {
  if (currentRoute.name !== 'Login') {
    addTags()
    moveToCurrentTag()
  }
})

watch(() => state.visible, (value) => {
  if (value) {
    document.body.addEventListener('click', state.closeMenu)
  } else {
    document.body.removeEventListener('click', state.closeMenu)
  }
})

// life cricle
onBeforeMount(() => {
  initTags()
  addTags()
})

</script>

<style lang="scss" scoped>
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: -2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 25px;
      border: 1px solid rgba(124, 141, 181, .3);
      border-radius: 4px;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      box-sizing: border-box;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #5DDAB4;
        color: #fff;
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
