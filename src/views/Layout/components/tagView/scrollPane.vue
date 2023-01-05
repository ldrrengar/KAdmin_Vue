<template>
  <el-scrollbar ref="scrollContainerRef" :vertical="false" class="scroll-container" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>
<script lang="ts" setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  defineEmits,
} from "vue";
const scrollContainerRef = ref(null);
const scrollWrapper = computed(() => {
  return (scrollContainerRef.value as any).$refs.wrap as HTMLElement;
});
// 获取当前组件实例
const { ctx } = getCurrentInstance() as any;
const tagSpacing = 4;
const handleScroll = (e: WheelEvent) => {
  const eventDelta = (e as any).wheelDelta || -e.deltaY * 40;
  scrollWrapper.value.scrollLeft =
    scrollWrapper.value.scrollLeft + eventDelta / 4;
};
const moveToCurrentTag = (currentTag: HTMLElement) => {
  const container = (scrollContainerRef.value as any).$el as HTMLElement;
  const containerWidth = container.offsetWidth;
  const tagList = ctx.$parent.$refs.tag as any[];
  let fristTag = null;
  let lastTag = null;

  // find first tag and last tag
  if (tagList.length > 0) {
    fristTag = tagList[0];
    lastTag = tagList[tagList.length - 1];
  }

  if (fristTag === currentTag) {
    scrollWrapper.value.scrollLeft = 0;
  } else if (lastTag === currentTag) {
    scrollWrapper.value.scrollLeft =
      scrollWrapper.value.scrollWidth - containerWidth;
  } else {
    const currentIndex = tagList.findIndex((item) => item === currentTag);
    const prevTag = tagList[currentIndex - 1];
    const nextTag = tagList[currentIndex + 1];
    const afterNextTagOffsetLeft =
      nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagSpacing;
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagSpacing;

    if (
      afterNextTagOffsetLeft >
      scrollWrapper.value.scrollLeft + containerWidth
    ) {
      scrollWrapper.value.scrollLeft = afterNextTagOffsetLeft - containerWidth;
    } else if (beforePrevTagOffsetLeft < scrollWrapper.value.scrollLeft) {
      scrollWrapper.value.scrollLeft = beforePrevTagOffsetLeft;
    }
  }
};
const emit = defineEmits<{ (e: "scroll"): void }>();
const emitScroll = () => {
  emit("scroll");
};

onMounted(() => {
  scrollWrapper.value.addEventListener("scroll", emitScroll, true);
});

onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener("scroll", emitScroll);
});
</script>
<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  .el-scrollbar__bar {
    bottom: 0px;
  }

  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>