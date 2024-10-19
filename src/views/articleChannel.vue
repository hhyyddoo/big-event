<script setup>
import {ref} from 'vue'
import {addCategoryApi, deleteCategoryApi, getlist, updataCategoryApi} from '@/api/article'
import {Delete, Edit} from '@element-plus/icons-vue'

const tableData = ref(null)
//发送请求获取数据
const getData = async () => {
  const res = await getlist();
  tableData.value = res.data;
}
getData();
//添加分类
const dialogFormVisible = ref(false)
const dialogFormVisible1 = ref(false)
const formCategory = ref({
  id: null,
  categoryName: null,
  categoryAlias: null
})
//验证表单
const rules = ref({
  categoryName: [
    {required: true, message: "请输入分类名称", trigger: "blur"},
  ],
  categoryAlias: [
    {required: true, message: "请输入分类别名", trigger: "blur"}
  ],
});
//DOM 元素或组件实例，以便稍后在逻辑中对其进行操作（例如调用组件的方法、获取 DOM 节点等）。
const form = ref(null);
//添加分类
const addCategory = async () => {
      // 添加之前验证表单
      await form.value.validate()
      console.log('添加')
      //添加操作
      // 提交表单
      const res = await addCategoryApi(formCategory.value)
      // 关闭弹窗
      dialogFormVisible.value = false;
      // 刷新数据
      getData();
      // 提示成功信息
      ElMessage({
        message: '添加成功.',
        type: 'success',
      })
      // 清空表单
      formCategory.value = {
        categoryName: null,
        categoryAlias: null
      };

    }
;
//删除分类
const del = async (id) => {
  //提示确认信息
  const confirm = await ElMessageBox.confirm('确认删除该分类？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  });
  if (!confirm) return;
  await deleteCategoryApi(id)
  ElMessage({
    message: '删除成功.',
    type: 'success',
  })
  getData();
}
//修改分类
const form1 = ref(null);
const showDialogVisible = (row) => {
  dialogFormVisible1.value = true;
  // 赋值表单数据
  formCategory.value = {
    id: row.id,
    categoryName: row.categoryName,
    categoryAlias: row.categoryAlias
  }
  updataCategory()
}
//修改分类
const updataCategory = async () => {
  // 添加之前验证表单
  await form1.value.validate();
  // 提交表单
  await updataCategoryApi(formCategory.value)
  // 关闭弹窗
  dialogFormVisible1.value = false;
  // 刷新数据
  getData();
  // 提示成功信息
  ElMessage({
    message: '修改成功.',
    type: 'success',
  })
  // 清空表单
  formCategory.value = {
    id: null,
    categoryName: null,
    categoryAlias: null
  }
}

</script>

<template>
  <el-card style="max-width: 100%;">
    <template #header>
      <div class="card-header">
        <span>文章分类</span>
        <div class="but">
          <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
        </div>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column
          prop="categoryName"
          label="分类名"
          width="180"
      ></el-table-column>

      <el-table-column prop="categoryAlias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button
              type="primary"
              circle
              :icon="Edit"
              @click="showDialogVisible(scope.row)"
          ></el-button>
          <el-button
              circle
              type="danger"
              :icon="Delete"
              @click="del(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="添加分类" width="500px">
      <el-form :model="formCategory" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="分类名称" style="width: 340px" prop="categoryName">
          <el-input v-model="formCategory.categoryName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="分类别名" style="width: 340px" prop="categoryAlias">
          <el-input v-model="formCategory.categoryAlias" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click=" addCategory ">
            添加
          </el-button>
        </div>
      </template>
    </el-dialog>


    <el-dialog v-model="dialogFormVisible1" title="修改分类" width="500px">
      <el-form :model="formCategory" label-width="100px" :rules="rules" ref="form1">
        <el-form-item label="分类名称" style="width: 340px" prop="categoryName">
          <el-input v-model="formCategory.categoryName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="分类别名" style="width: 340px" prop="categoryAlias">
          <el-input v-model="formCategory.categoryAlias" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click=" updataCategory ">
            修改
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>
<style>
/* 按钮靠右 */
.but {
  float: right;
}
</style>