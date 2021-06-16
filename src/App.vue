<template>
  <div class="app">
     <router-view />
  </div>
</template>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.app {
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>