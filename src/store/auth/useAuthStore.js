import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";
import { useMyErrorStore } from "../error/useMyErrorStroe";

export const useAuthStore = defineStore("authStore", () => {
  // 1, State
  const isLoggedIn = ref(false);
  const accessToken = ref("");
  const userInfo = ref(null);

  // 2, Getter

  // 3, Actions
  // 로그인 정보가 필요 없어질 때 호출
  const clearAuthStore = () => {
    isLoggedIn.value = false;
    accessToken.value = "";
    userInfo.value = null;
  };

  // 로그인 처리를 해주는 Action
  const login = async (loginForm) => {
    try {
      const url = "/api/login";

      const res = await myAxios.post(url, loginForm);
      const data = res.data.data;

      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true; // 로그인 성공 했으니 true
    } catch (error) {
      // axios(서버)에서 에러 나면 이 데이터가 생성이 됨
      if (error.response) {
        if (error.response.data.code === "E01") {
          alert(error.response.data.data);

          return;
        }
      }

      // 자바스크립트 에러인 경우 프론트에서 에러 처리
      useMyErrorStore().setErrorInfo(error);
    }
  };

  //reissu
  const reissue = async () => {
    try {
      const url = "/api/reissue-token";

      const res = await myAxios.post(url);
      const data = res.data.data;
      accessToken.value = data.accessToken;
      userInfo.value = data.user;
      isLoggedIn.value = true; // 로그인 성공 했으니 true
    } catch (error) {
      clearAuthStore();
      throw error;
    }
  };

  return {
    // 1, State
    isLoggedIn,
    accessToken,
    userInfo,

    // 2, Getters

    // 3, Actions
    login,
    reissue,
  };
});
