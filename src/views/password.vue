<script setup>
import {ref} from 'vue';
import {updatePasswordApi} from '@/api/article.js';

const pass = ref({
  oldPwd: '', // 旧密码
  newPwd: '', // 新密码
  rePwd: '' // 确认新密码
});
const rules = {
  oldPwd: [
    {required: true, message: '请输入旧密码', trigger: 'blur'},
    {min: 6, max: 16, message: '密码长度在6到16个字符', trigger: 'blur'}
  ],
  newPwd: [
    {required: true, message: '请输入新密码', trigger: 'blur'},
    {min: 6, max: 16, message: '密码长度在6到16个字符', trigger: 'blur'}
  ],
  rePwd: [
    {required: true, message: '请确认新密码', trigger: 'blur'},
    {min: 6, max: 16, message: '密码长度在6到16个字符', trigger: 'blur'},
    {
      validator: (rule, value, callback) => {
        if (value !== pass.value.newPwd) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
      }, trigger: 'blur'
    }
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
  await updatePasswordApi(pass.value)
  ElMessage.success('更新成功')
}
</script>

<template>
  <el-card>
    <template #header>
      <span>修改密码</span>
    </template>
    <el-row>
      <el-col :span="8">
        <el-form :model="pass" :rules="rules" ref="form" label-width="auto">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input v-model="pass.oldPwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pass.newPwd"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="rePwd">
            <el-input v-model="pass.rePwd"></el-input>
          </el-form-item>
          <el-form-item style="margin-left: 100px">
            <el-button type="primary" @click="updateUserInfo">修改密码</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>

  </el-card>
</template>

<style scoped>
.custom-form .el-form-item__label {
  text-align: right;
}
</style>