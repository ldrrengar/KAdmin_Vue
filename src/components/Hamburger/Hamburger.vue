<!--
 * 折叠边栏按钮
-->
<template>
    <div
      :class="[{'is-active': isActive}]"
      @click="toggleClick"
    >
      <!-- <svg
        class="icon"
        aria-hidden="true"
        font-size="20px"
      >
        <use xlink:href="#iconhamburger" />
      </svg> -->
      <!-- <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M896 192H128v128h768V192zm0 256H384v128h512V448zm0 256H128v128h768V704zM320 384 128 512l192 128V384z"></path></svg> -->
      <el-icon><Fold /></el-icon>
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
  