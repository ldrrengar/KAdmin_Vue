import { defineStore } from 'pinia'
import { tagsViewTypes } from './actions'
import { TagsViewState, TagView } from './state'

// 定义store
export const tagsView = defineStore('tagsView', {
    state: (): TagsViewState => {
        return {
            visitedViews: [],
            cachedViews: []
        }
    },
    actions: {

        [tagsViewTypes.ADD_VISITED_VIEW](view: TagView) :void {
            if (this.visitedViews.some(v => v.path === view.path)) return
            this.visitedViews.push(
              Object.assign({}, view, {
                title: view.meta?.title || 'no-name'
              })
            )
          },
          [tagsViewTypes.ADD_CACHED_VIEW](view: TagView) :void{
            if (view.name === null) return
            if (this.cachedViews.includes(view.name?.toString())) return
            if (!view.meta?.noCache) {
              this.cachedViews.push(view.name?.toString())
            }
          },
          [tagsViewTypes.DEL_VISITED_VIEW](view: TagView) :void{
            for (const [i, v] of this.visitedViews.entries()) {
              if (v.path === view.path) {
                this.visitedViews.splice(i, 1)
                break
              }
            }
          },
          [tagsViewTypes.DEL_CACHED_VIEW](view: TagView) :void{
            if (view.name === null) return
            const index = this.cachedViews.indexOf(view.name?.toString())
            index > -1 && this.cachedViews.splice(index, 1)
          },
          [tagsViewTypes.DEL_OTHERS_VISITED_VIEWS](view: TagView) :void{
            this.visitedViews = this.visitedViews.filter(v => {
              return v.meta?.affix || v.path === view.path
            })
          },
          [tagsViewTypes.DEL_OTHERS_CACHED_VIEWS](view: TagView) :void{
            if (view.name === null) return
            const index = this.cachedViews.indexOf(view.name?.toString())
            if (index > -1) {
              this.cachedViews = this.cachedViews.slice(index, index + 1)
            } else {
              // if index = -1, there is no cached tags
              this.cachedViews = []
            }
          },
          [tagsViewTypes.DEL_ALL_VISITED_VIEWS]() :void{
            // keep affix tags
            const affixTags = this.visitedViews.filter(tag => tag.meta?.affix)
            this.visitedViews = affixTags
          },
          [tagsViewTypes.DEL_ALL_CACHED_VIEWS]() {
            this.cachedViews = []
          },
          // 更新当前访问页面信息
          [tagsViewTypes.UPDATE_VISITED_VIEW](view: TagView) :void{
            for (let v of this.visitedViews) {
              if (v.path === view.path) {
                v = Object.assign(v, view)
                break
              }
            }
          }
    }
})
