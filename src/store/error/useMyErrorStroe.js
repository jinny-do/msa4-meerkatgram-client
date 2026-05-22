import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyErrorStore = defineStore("myErrorStore", () => {
  // 1, State (ref)
  const isError = ref(false);
  const errorCode = ref("");
  const errorMsg = ref("");

  // 2, Getter (computed)

  // 3, Actions (function)
  // [1] 이 state들의 데이터들을 세팅하는 setter
  const setErrorInfo = (error) => {
    // ?. 옵셔널체이닝 있으면 data, 없으면 뒤에 실행
    const errorData = error.response?.data || {
      code: "UNKNOWN_ERROR",
      message: "예기치 못한 에러가 발생 했습니다",
    };
    errorCode.value = errorData.code;
    errorMsg.value = errorData.message;
    isError.value = true;
  };

  // [2] 기존에 들어가있는 에러 내용들 clear
  const clearErrorInfo = () => {
    errorCode.value = "";
    errorMsg.value = "";
    isError.value = false;
  };

  return {
    isError,
    errorCode,
    errorMsg,
    setErrorInfo,
    clearErrorInfo,
  };
});
