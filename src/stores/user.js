import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { getUserInfo as fetchUserInfo } from "@/api/user"; // 重命名避免与 store 内方法重名

// 定义用户 store
export const useUserStore = defineStore("user", () => {
  // 从本地存储初始化 token 和用户信息
  const token = ref(localStorage.getItem('token') || '');
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')) || null);

  // 更新 token 并保存到本地存储
  const setToken = (newToken) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  };

  // 获取用户信息
  const getUserInfo = async () => {
    try {
      const rps = await fetchUserInfo(); // 调用接口获取用户信息
      userInfo.value = rps.data; // 访问响应中的数据
      localStorage.setItem('userInfo', JSON.stringify(rps.data)); // 将用户信息保存到本地存储
    } catch (error) {
      console.error('获取用户信息失败:', error);
    }
  };

  // 监听 token 的变化，如果有变化，可以执行其他操作（例如刷新用户信息）
  watch(token, (newToken) => {
    if (newToken) {
      getUserInfo();
    }
  });

  return {
    token,
    setToken,
    getUserInfo,
    userInfo,
  };
});
