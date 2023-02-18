<!-- 全屏按钮 -->
<template>
   <div v-if="isFullscreen" @click="click">
      <el-icon :size="22"><FullScreen /></el-icon>
      <!-- <svg class="icon" aria-hidden="true" font-size="20px">
        <use xlink:href="#icon-quanping" />
      </svg>     -->
    </div>
    <div @click="click" v-else>
      <el-icon :size="22"><FullScreen /></el-icon>
      <!-- <svg class="icon" aria-hidden="true" font-size="20px">
        <use xlink:href="#icon-quanping" />
      </svg> -->
    </div>
</template>
  
<script lang="ts" setup>
import screenfull from "screenfull";
import { onBeforeUnmount, onMounted} from "vue";
import { ElMessage } from "element-plus";

const sf = screenfull;
let isFullscreen = false;
const click = () => {
  if (!sf.isEnabled) {
    ElMessage({
      message: "you browser can not work",
      type: "warning",
    });
    return false;
  }
  sf.toggle();
};
const change = () => {
  if (sf.isEnabled) {
    isFullscreen = sf.isFullscreen;
  }
};
onMounted(() => {
  if (sf.isEnabled) {
    sf.on("change", change);
  }
});

onBeforeUnmount(() => {
  if (sf.isEnabled) {
    sf.off("change", change);
  }
});
</script>
  