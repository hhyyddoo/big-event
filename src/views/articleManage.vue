<script setup>
import {ref} from 'vue';
import {addArticleApi, deleteArticleApi, editArticleApi, getArticleListApi, getlist} from '@/api/article';


const value = ref('')
//查询所有分类
const options = ref([])
const getCategory = async () => {
  const res = await getlist()
  options.value = res.data
}
getCategory();
//
const params = ref({
  pageNum: 1,
  pageSize: 5,
  categoryId: '',
  state: ''
})
//获取文章列表
const articleList = ref(null)
const onSearch = async () => {
  console.log(params.value)
  const res = await getArticleListApi(params.value)
  articleList.value = res.data.items
  total.value = res.data.total
  console.log(articleList.value)
}
//
const fun = (id) => {
  /* for (let i = 0; i < options.value.length; i++) {
     if (options.value[i].id === id){
       return options.value[i].categoryName;
     }

   }
   return '未知分类'*/
  const category = options.value.find(item => item.id === id);
  return category ? category.categoryName : '未知分类';
};
onSearch()
//重置
const onReset = () => {
  params.value = {
    pageNum: 1,
    pageSize: 5,
    categoryId: '',
    state: ''
  }
  onSearch()
}
//编辑
const onEdit = (row) => {
  console.log(row)
}
//删除
const onDelete = async (row) => {
  //提示确认删除
  const confirm = await ElMessageBox.confirm('确认删除该文章吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  if (!confirm) return
  await deleteArticleApi(row.id)
  onSearch()
  //提示删除成功
  ElMessage.success('删除成功')
}
//
const handleSizeChange = (val) => {
  params.value.pageSize = val
  onSearch()
}
//
const handleCurrentChange = (val) => {
  params.value.pageNum = val
  onSearch()
}
const total = ref(null);
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const articleModel = ref({
  title: '',
  categoryId: '',
  coverImg: '',
  content: '',
  state: '',
  id: 0
})
//上传成功回调
const uploadSuccess = (res) => {
  console.log(res.data)
  articleModel.value.coverImg = res.data
}
//
const addOrEdit = ref(null);
const addAndEdit = async (type) => {
  visibleDrawer.value = true
  if (type === 'add') {
    addOrEdit.value = 'add'
  } else {
    addOrEdit.value = 'edit'
    //回显数据
    articleModel.value.title = type.title
    articleModel.value.categoryId = type.categoryId
    articleModel.value.coverImg = type.coverImg
    articleModel.value.content = type.content
    articleModel.value.id = type.id
  }
}
//发布
const tijiao = async (state) => {
  articleModel.value.state = state
  if (addOrEdit.value === 'add') {
    await addArticleApi(articleModel.value)
    onSearch()
    visibleDrawer.value = false
    ElMessage.success('发布成功')
    //清楚表单数据
    articleModel.value = {
      title: '',
      categoryId: '',
      coverImg: '',
      content: '',
      state: '',
      id: 0
    }
  } else {
    //修改
    console.log(articleModel.value)
    await editArticleApi(articleModel.value)
    onSearch()
    visibleDrawer.value = false
    ElMessage.success('修改成功')
    //清楚表单数据
    articleModel.value = {
      title: '',
      categoryId: '',
      coverImg: '',
      content: '',
      state: '',
      id: 0
    }
  }

}
</script>
<template>
  <el-card style="max-width: 100%">
    <template #header>
      <div class="card-header">
        <span>文章管理</span>
        <div class="but">
          <el-button type="primary" @click="addAndEdit('add')">添加分类</el-button>
        </div>
      </div>
    </template>
    <el-form inline>
      <el-form-item label="文章分类：">
        <el-select
            v-model="params.categoryId"
            placeholder="请选择分类"
            style="width: 140px;"
        >
          <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 150px" placeholder="发布状态" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>

    </el-form>
    <el-table :data="articleList" style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="分类">
        <template #default="scope">
          {{ fun(scope.row.categoryId) }}
        </template>

      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="text" @click="onDelete(scope.row)">删除</el-button>
          <el-button type="text" @click="addAndEdit(scope.row)">编辑</el-button>
        </template>


      </el-table-column>
    </el-table>
    <br/>
    <el-pagination
        v-model:current-page="params.pageNum"
        v-model:page-size="params.pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
    <!-- 抽屉 -->
    <el-drawer v-model="visibleDrawer" :title="title" direction="rtl" size="50%">
      <!-- 添加文章表单 -->
      <el-form :model="articleModel" label-width="100px">
        <el-form-item label="文章标题">
          <el-input v-model="articleModel.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select placeholder="请选择" v-model="articleModel.categoryId">
            <el-option v-for="item in options"
                       :key="item.id"
                       :label="item.categoryName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章封面">
          <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false" action="/api/upload"
                     name="file"
                     :on-success="uploadSuccess">
            <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容">
          <el-input v-model="articleModel.content" type="textarea"/>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tijiao('已发布')">发布
          </el-button>
          <el-button type="info" @click="tijiao('草稿')">草稿</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-card>
</template>


<style lang="scss" scoped>
.but {
  float: right;
}

.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

/* 抽屉样式 */
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
