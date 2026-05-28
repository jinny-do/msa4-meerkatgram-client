<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import MyButton from "../../components/button/MyButton.vue";
import usePostIndexStore from "../../store/post/usePostIndexStore.js";

// 함수 정의------------------start---------------------------
// store로 이관
// const posts = ref([]); // 다른 페이지 다녀오면 초기화가 됨 , 피니아에 하면 이전페이지 다녀와도 그대로있음
// const isLastPage = ref(false);
// let currentPage = 0;

// const getPostPagination = async (page = 1) => {
//   // 마지막 페이지가 아닐 경우만 실행
//   if (!isLastPage.value) {
//     try {
//       const url = "/api/posts";
//       const params = {
//         page,
//       };

//       const res = await myAxios.get(url, { params });
//       const data = res.data.data;
//       isLastPage.value = data.lastPage;
//       posts.value.push(...data.posts);

//       // 처리 다 끝나고 갱신
//       currentPage++;
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };
// ----------------------------end----------------------------------

// store 쓸 준비 완료
const postIndexStore = usePostIndexStore();

// 버튼 클릭시 다음 페이지
const getNextPage = async () => {
  await postIndexStore.getPostPagination(postIndexStore.getNextPageNumber);
};

// 라이프 사이클
onBeforeMount(postIndexStore.getPostPagination);
onBeforeUnmount(postIndexStore.clearPostIndex);
</script>

<template>
  <div class="card-container">
    <div
      v-for="item in postIndexStore.items"
      :key="item.id"
      class="card"
      :style="{ backgroundImage: `url(${item.image})` }"
    ></div>
  </div>
  <MyButton
    v-if="!postIndexStore.isLastPage"
    :color="'gray'"
    :size="'big'"
    :content="'Show more posts from jinny'"
    @click="getNextPage"
  />
</template>

<style scoped>
.card-container {
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.card {
  padding-top: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
}
</style>
