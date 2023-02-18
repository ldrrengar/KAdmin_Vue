<!-- 布局大小选择 -->
<template>
  <div>
    
    <el-icon :size="22"><Menu /></el-icon>
   <el-dropdown id="size-select" trigger="click" @command="handleSetSize">
      <!-- <svg class="icon" aria-hidden="true" font-size="25px">
        <use xlink:href="#icon-buju1" />
      </svg> -->
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value"
            :command="item.value">
            {{
              item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
  
<script lang="ts">
import { app } from '@/store/app'
import { tagsView } from '@/store/tagsview'
import { defineComponent, reactive, nextTick, toRefs, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const appStore = app()
    const tagsStore = tagsView()
    const { fullPath } = useRoute()
    const router = useRouter()
    function refreshView() {
      tagsStore.delAllCachedViews()
      nextTick(() => {
        router.replace({ path: '/redirect' + fullPath }).catch((err) => {
          console.warn(err)
        })
      })
    }
    const state = reactive({
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ],
      handleSetSize: (size: string) => {
        appStore.setSize(size)
        refreshView()
        ElMessage.success('Switch Size Success')
      }
    })
    const size = computed(() => {
      // return useStore().state.app.size
      return appStore.size
    })
    return {
      ...toRefs(state),
      size
    }
  }
})
</script>
  