<script setup>
import avatar from "@/assets/default.png";
import {useUserStore} from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter(); // 获取 router 实例
const userStore = useUserStore();
userStore.getUserInfo();
const handleCommand = async (key) => {
  console.log(key);
  if (key === "logout") {
    await ElMessageBox.confirm("确定退出码？", "警告", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });
    router.push(`/login/`);
    // userStore.removeToken();
    userStore.setToken(null);

    //退出
  } else {
    router.push(`/user/${key}`);
  }
};
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
          active-text-color="#ffd04b"
          background-color="#232323"
          :default-active="$route.path"
          text-color="#fff"
          router
      >
        <el-menu-item index="/article/channel">
          <el-icon>
            <Management/>
          </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Promotion/>
          </el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <!-- //标题 -->
          <template #title>
            <el-icon>
              <UserFilled/>
            </el-icon>
            <span>个人中心</span>
          </template>
          <!--  //二级菜单 -->
          <el-menu-item index="/user/profile">
            <el-icon>
              <User/>
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop/>
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen/>
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          用户：<strong>{{ userStore.userInfo.nickname }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.userInfo.user_pic || avatar"/>
            <el-icon><CaretBottom/></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"
              >基本资料
              </el-dropdown-item
              >
              <el-dropdown-item command="avatar" :icon="Crop"
              >更换头像
              </el-dropdown-item
              >
              <el-dropdown-item command="password" :icon="EditPen"
              >重置密码
              </el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
              >退出登录
              </el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer> ©2023 Created by</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url("@/assets/logo.png") no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
