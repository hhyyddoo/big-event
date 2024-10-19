<script setup>
import { userRegister,userLogin } from "@/api/user";
import { useUserStore} from '@/stores/user'
import { useRouter } from "vue-router"; // 导入 useRouter
import { ref } from "vue";
const router = useRouter(); // 初始化 router 实例

// 控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false);
const formData = ref({
  username: "admin123",
  password: "123123",
  repassword: "",
});
// register表单校验
const rules = ref({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 16,
      message: "长度在 6 到 16 个字符",
      trigger: "blur",
    },
  ],
  repassword: [
    { required: true, message: "请输入确认密码", trigger: "blur" },
    {
      min: 6,
      max: 16,
      message: "长度在 6 到 16 个字符",
      trigger: "blur",
    },
    {
      // 自定义校验
      validator: (rule, value, callback) => {
        if (value !== formData.value.password) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});
const rules1 = ref({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 16,
      message: "长度在 6 到 16 个字符",
      trigger: "blur",
    },
  ],
});
// 注册
const formRef = ref(null); // 确保 formRef 初始化为 null
const register = async () => {
  // 表单校验
  await formRef.validate();
  // 发送请求
  const res = await userRegister(formData.value);
  console.log(res);
  if (res.code === 0) {
    ElMessage({
      message: "注册成功",
      type: "success",
    });
    isRegister.value = false;
  }

  /* formRef.value.validate(async (valid) => {
    if (valid) {
      console.log("注册信息:", formData.value);
    const res =  await userRegister(formData.value)
    } else {
      ElNotification({
        title: "Error",
        message: "注册信息有误, 请检查并重新输入",
        type: "error",
      });
      return false;
    }
  }); */
};
//登录
const UserStore = useUserStore();
const login = async () => {
  await formRef.value.validate();
  // console.log("登录信息:", formData.value);
  // 发送请求
  const res = await userLogin(formData.value);
  console.log(res.data);
  //
  UserStore.setToken(res.data)
  //跳转到首页
  
  router.push("/article/channel");
  
};
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form
        :rules="rules"
        ref="formRef"
        size="large"
        autocomplete="off"
        v-if="isRegister"
        :model="formData"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formData.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            @click="register"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录表单 -->
      <el-form
        :rules="rules1"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form
          :rules="rules1"
          ref="formRef"
          size="large"
          autocomplete="off"
          :model="formData"
        >
          <el-form-item prop="username">
            <el-input
              v-model="formData.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="formData.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url("@/assets/logo2.png") no-repeat 60% center / 240px auto,
      url("@/assets/login_bg.jpg") no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
