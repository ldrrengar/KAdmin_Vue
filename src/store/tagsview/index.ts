import { defineStore } from 'pinia'
import { RouteLocationNormalized } from 'vue-router'

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string
}

export interface TagsViewState {
  visitedViews: TagView[]
  cachedViews: (string | undefined)[]
}
// 定义store
export const tagsView = defineStore('tagsView', {
  state: (): TagsViewState => {
    return {
      visitedViews: [],
      cachedViews: []
    }
  },
  actions: {
    // 添加访问标签
    addVisitedView(view: TagView): void {
      if (this.visitedViews.some(v => v.path === view.path)) return
      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
    },

    // 缓存访问标签
    addCachedView(view: TagView): void {
      if (view.name === null) return
      if (this.cachedViews.includes(view.name?.toString())) return
      if (!view.meta?.noCache) {
        this.cachedViews.push(view.name?.toString())
      }
    },

    // 删除访问标签
    delVisitedView(view: TagView): void {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1)
          break
        }
      }
    },

    // 删除缓存标签
    delCachedView(view: TagView): void {
      if (view.name === null) return
      const index = this.cachedViews.indexOf(view.name?.toString())
      index > -1 && this.cachedViews.splice(index, 1)
    },


    // 关闭其他标签
    delOthersVisitedViews(view: TagView): void {
      this.visitedViews = this.visitedViews.filter(v => {
        return v.meta?.affix || v.path === view.path
      })
    },

    // 关闭其他标签缓存删除
    delOthersCachedViews(view: TagView): void {
      if (view.name === null) return
      const index = this.cachedViews.indexOf(view.name?.toString())
      if (index > -1) {
        this.cachedViews = this.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        this.cachedViews = []
      }
    },

    // 关闭所有标签
    delAllVisitedViews(): void {
      // keep affix tags
      const affixTags = this.visitedViews.filter(tag => tag.meta?.affix)
      this.visitedViews = affixTags
    },

    // 关闭所有
    delAllCachedViews(): void {
      this.cachedViews = []
    },
    
    // 更新当前访问页面信息
    updateVisitedView(view: TagView): void {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  }
})
