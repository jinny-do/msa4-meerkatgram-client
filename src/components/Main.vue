<script setup>
import MyError from "../pages/errors/MyError.vue";
import { useMyErrorStore } from "../store/error/useMyErrorStroe";

const myErrorStore = useMyErrorStore();
</script>

<template>
  <!-- 특정 상황에서는 error 페이지, 에러 없을 땐 라우터 뷰 출력 -->
  <MyError v-if="myErrorStore.isError" />
  <router-view v-else></router-view>
</template>
