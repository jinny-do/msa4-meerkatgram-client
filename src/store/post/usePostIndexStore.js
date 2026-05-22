import { defineStore } from "pinia";
import { computed, ref } from "vue";
import myAxios from "../../api/myAxios";
import { useMyErrorStore } from "../error/useMyErrorStroe";

// State를 중앙집중 관리식으로 관리 하려고
// 1, State (ref) - origin의 값을 변경하지 않고 연산된 값을 가져오고 싶을  때
const usePostIndexStore = defineStore("postIndex", () => {
  const items = ref([]);
  const isLastPage = ref(false);
  const currentPage = ref(0);

  // 2, Getter (computed)
  // 내가 받아올 페이지 계산
  const getNextPageNumber = computed(() => currentPage.value + 1);

  // 3, Actions (function) - 여러가지 값 처리 할 것들
  const getPostPagination = async (page = 1) => {
    if (!isLastPage.value) {
      // 마지막 페이지가 아닌 경우에만 실행
      try {
        const url = "/api/postsd";
        const params = {
          page,
        };

        //axios 처리
        const res = await myAxios.get(url, { params });
        const data = res.data.data;
        isLastPage.value = data.lastPage;
        items.value.push(...data.posts);

        // 처리 다 끝나고 갱신
        currentPage.value++;
      } catch (error) {
        console.error(error);
        useMyErrorStore().setErrorInfo(error);
      }
    }
  };

  return {
    // state
    items,
    isLastPage,

    // getter
    getNextPageNumber,

    // actions
    getPostPagination,
  };
});

export default usePostIndexStore;
