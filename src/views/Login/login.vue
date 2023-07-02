<template>
  <div class="login-bg">
    <el-form :model="loginForm" ref="loginFormRef" class="login-form" :rules="rules" label-position="right">
      <h1>KAdmin</h1>
      <el-form-item prop="userName">
        <el-input v-model="loginForm.userName" placeholder="请输入用户名" type="text">
          <template #prefix>
            <el-icon class="el-input__icon">
              <User />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="passWord">
        <el-input v-model="loginForm.passWord" placeholder="请输入密码" show-password>
          <template #prefix>
            <el-icon class="el-input__icon">
              <Lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" class="sub-btn" :loading="loading" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import { User, Lock } from '@element-plus/icons-vue'
import { user } from "@/store/user"
import { InitData } from '@/types/login'
export default defineComponent({
  name: "login",
  components: {
    User,
    Lock
  },
  setup() {
    const elForm = ref(null);
    const data = reactive(new InitData())
    const rules = {
      userName: [{ required: true, trigger: "blur", message: "账号不能为空" }],
      passWord: [{ required: true, trigger: "blur", message: "密码不能为空" }],
    }
    const state = reactive({
      loading: false,
      redirect: '',
      otherQuery: {}
    })
    const router = useRouter()
    const handleLogin = () => {
      // console.log(data)
      data.loginFormRef?.validate(async (valid: boolean) => {
        if (valid) {
          state.loading = true
          await user().login(data.loginForm)
          router
            .push({
              path: state.redirect || '/',
              query: state.otherQuery
            })
            .catch(err => {
              console.warn(err)
            })
          setTimeout(() => {
            state.loading = false
          }, 0.5 * 1000)
        } else {
          setTimeout(() => {
            state.loading = false
          }, 0.5 * 1000)
          return false
        }
      })

    }
    return {
      ...toRefs(data),
      rules,
      ...toRefs(state),
      handleLogin
    };
  },
});
</script>
<style lang="scss" scoped>
$bgimg: url("../../assets/login_bg.jpg");
$light_gray: #18cc60;

.login-bg {
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-image: $bgimg;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding-top: 200px;

  .login-form {
    width: 450px;
    max-width: 100%;
    margin: 0 auto;

    h1 {
      color: $light_gray;
      text-align: center;
      margin: 0px auto 40px auto;
    }

    .sub-btn {
      width: 100%;
    }
  }
}
</style>