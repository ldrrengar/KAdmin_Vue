<!--
 * 折叠边栏按钮
-->
<template>
  <div :class="[{ 'is-active': isActive }]" @click="toggleClick">
    <!-- <svg class="icon" aria-hidden="true" font-size="25px">
      <use xlink:href="#icon-zhankaicaidan" />
    </svg> -->   
    <el-icon :size="22"><Expand /></el-icon>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-click'],
  setup(_, context) {
    const toggleClick = () => {
      context.emit('toggle-click')
    }
    return {
      toggleClick
    }
  }
})
</script>
  
<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
  