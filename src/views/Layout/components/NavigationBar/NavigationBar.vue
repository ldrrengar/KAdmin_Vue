<!-- 导航栏 -->
<template>
  <div class="navbar">
    <Hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggle-click="toggleSideBar" />
    <BreadCrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <Screenfull class="right-menu-item hover-effect" />
        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <SizeSelect class="right-menu-item hover-effect" />
        </el-tooltip>
        <!-- <LangSelect class="right-menu-item hover-effect" /> -->
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/profile/">
              <el-dropdown-item>
                个人中心
              </el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">
              <span style="display:block;">
                退出登录
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
  
<script lang="ts">
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb.vue'
import Hamburger from '@/components/Hamburger/Hamburger.vue'
import Screenfull from '@/components/ScreenFull/ScreenFull.vue'
import SizeSelect from '@/components/SizeSelect/SizeSelect.vue'
import { computed, reactive, toRefs } from 'vue'
import { app } from '@/store/app'
import { user } from '@/store/user'
import { useRoute, useRouter } from 'vue-router'
import { loginOut } from '@/apis/user'
export default {
  components: {
    BreadCrumb,
    Hamburger,
    Screenfull,
    SizeSelect
  },
  setup() {
    const appStore = app()
    const userStore = user()
    const route = useRoute()
    const router = useRouter()
    const sidebar = computed(() => {
      return appStore.sidebar
    })
    const device = computed(() => {
      return appStore.device.toString()
    })
    const avatar = computed(() => {
      return userStore.avatar
    })
    const state = reactive({
      toggleSideBar: () => {
        appStore.toggleSidebar(false)
      },
      logout: () => {
        loginOut().then((res: any) => {
          if (res?.code === 0) {
            userStore.resetToken()
            router.push(`/login?redirect=${route.fullPath}`).catch(err => {
              console.warn(err)
            })
          }
        })
      }
    })
    return {
      sidebar,
      device,
      avatar,
      ...toRefs(state)
    }
  }
}
</script>
  
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 60px;
    height: 100%;
    float: left;
    padding: 0 10px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 30px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        margin-top: 5px;
        margin-right: 16px;
        margin-left: 16px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
  