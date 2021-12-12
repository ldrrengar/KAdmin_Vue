<template>
  <div class="login-bg">
    <el-form
      :model="form"
      ref="loginFormRef"
      class="login-form"
      :rules="rules"
      label-position="right"
    >
      <div class="title-container">
        <h3 class="title">KAdmin</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          name="username"
          prefix-icon="el-icon-user"
          type="text"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          prefix-icon="el-icon-lock"
          v-model="form.password"
          placeholder="请输入密码"
          name="password"
          show-password
          tabindex="2"
        />
      </el-form-item>
      <el-button type="primary" style="width: 100%;" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "login",
  setup() {
    const elForm = ref(null);
    const data = reactive({
      form: {
        username: "admin",
        password: "123456",
        remember: false,
      },
      rules: {
        username: [{ required: true, trigger: "blur", message: "不能为空" }],
        password: [{ required: true, trigger: "blur", message: "不能为空" }],
      },
      loading: false,
      passwordType: "password",
    });
    onMounted(() => {
      console.log("onMounted--原mounted");
      console.log(data);
      console.log(elForm);
    });
    const router = useRouter()
    const handleLogin = () => {
      router.push('/home')
    }
    return {
      form: data.form,
      rules: data.rules,
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
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
</style>