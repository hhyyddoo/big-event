<script setup>
import {useUserStore} from '@/stores/user'
import {ref} from 'vue'
import {updateUserInfoApi} from '@/api/article.js'

const userStore = useUserStore();
const userinfo = ref({
  username: userStore.userInfo.username,
  nickname: userStore.userInfo.nickname,
  email: userStore.userInfo.email
});
//验证表单
const rules = {
  nickname: [
    {required: true, message: '请输入用户昵称', trigger: 'blur'},
    {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
  ],
  email: [
    {required: true, message: '请输入用户邮箱', trigger: 'blur'},
    {type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'}
  ]
};
const form = ref(null);
const updateUserInfo = async () => {
  await form.value.validate()
  const confirm = await ElMessageBox.confirm('确认更新用户信息吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  if (!confirm) return
  await updateUserInfoApi(userinfo.value)
  userStore.getUserInfo()
  ElMessage.success('更新成功')
}

</script>
<template>
  <el-card>
    <template #header>
      <span>基本资料</span>
    </template>
    <el-row>
      <el-col :span="8">
        <el-form :model="userinfo" :rules="rules" ref="form" label-width="auto">
          <el-form-item label="&nbsp;&nbsp;&nbsp;登录名称">
            <!--            //自读-->
            <el-input v-model="userinfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userinfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userinfo.email"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 70px">
            <el-button type="primary" @click="updateUserInfo">更新资料</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </el-card>
</template>
