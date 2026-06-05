<script setup>
import { useAuthStore } from "../store/auth/useAuthStore";

// user 정보 가지고 있음
const authStore = useAuthStore();
</script>

<template>
  <div>
    <div class="container" v-if="authStore.isLoggedIn && authStore.userInfo">
      <div class="profile-box">
        <div
          class="profile bg-image-circle"
          :style="{ backgroundImage: `url(${authStore.userInfo.profile})` }"
        ></div>
      </div>

      <div class="info-box">
        <div class="nick">{{ authStore.userInfo.nick }}</div>
        <div class="write-count">posts {{ authStore.userInfo.countPosts }}</div>
        <div class="redirect-box">
          <div
            class="redirect-icon-posts-index bg-image-square"
            style="background-image: url(&quot;/icons/gallery.png&quot;)"
          ></div>
          <div
            class="redirect-icon-posts-create bg-image-square"
            style="background-image: url(&quot;/icons/plus-sign.png&quot;)"
          ></div>
          <div
            class="redirect-icon-users-info bg-image-square"
            style="background-image: url(&quot;/icons/person.png&quot;)"
          ></div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.info-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.redirect-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
</style>
