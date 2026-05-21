<script setup>
import { ref } from "vue";
import MyButton from "./button/MyButton.vue";

// TODO: 로그인 추가시 변경 필요 START
// 추후 피니아에서 관리
const isLoggedin = ref(false);
// TODO: 로그인 추가시 변경 필요 END
</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title">Meerkatgram</h1>
    </div>
    <div class="btn-box">
      <MyButton
        v-if="!isLoggedin"
        :content="'Sign In'"
        :color="'gray'"
        :size="'small'"
      />
      <MyButton
        v-if="!isLoggedin"
        :content="'Sign Up'"
        :color="'white'"
        :size="'small'"
      />
      <MyButton
        v-if="isLoggedin"
        :content="'Logout'"
        :color="'black'"
        :size="'small'"
      />
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.title-box {
  display: flex;
  align-items: center;
}

.title {
  font-size: 20px;
}

.btn-box {
  display: flex;
  gap: 10px;
}
</style>
