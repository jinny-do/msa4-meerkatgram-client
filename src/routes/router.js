import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";
import MyError from "../pages/errors/MyError.vue";
import Login from "../pages/auth/Login.vue";
import { useAuthStore } from "../store/auth/useAuthStore.js";
import PostShow from "../pages/posts/PostShow.vue";
import Registration from "../pages/auth/Registration.vue";
import PostCreate from "../pages/posts/PostCreate.vue";

const setMeta = (isAuthenticated, isGuestOnly) => {
  // 라우터 사용할 때 특수한, 원하는 데이터들 세팅할 수 있는 속성
  return {
    isAuthenticated: false,
    isGuestOnly: false,
  };
};

const routes = [
  {
    path: "/",
    redirect: "/posts",
    meta: setMeta(false, false),
  },
  // 인증 관련
  {
    path: "/login",
    component: Login,
    meta: setMeta(false, true),
  },
  {
    path: "/registration",
    component: Registration,
    meta: setMeta(false, true),
  },
  // 게시글 관련
  {
    path: "/posts",
    component: PostIndex,
    meta: setMeta(false, false),
  },
  {
    path: "/posts/:id",
    component: PostShow,
    meta: setMeta(true, false),
  },
  {
    path: "/posts/create",
    component: PostCreate,
    meta: setMeta(true, false),
  },
  // 에러 관련
  {
    path: "/error",
    component: MyError,
    meta: setMeta(false, false),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드
// 이동하는 특정 지점에서 로직을 실행하고 싶을 때 사용
// 라우터가 이동하기 전에 실행
// to: 이동할 라우터
// from: 이동하기 전 라우터 정보
// next: 다음라우터 처리 할 수 있게 도와주는 함수
router.beforeEach(async (to, from, next) => {
  //authStore
  const authStore = useAuthStore();

  // 로그인이 되어 있다면 다른 처리 안해줘도 됨
  // 엑세트 토큰이 없을 때 (인증이 없는 상황), 토큰 재발급 시도 처리
  if (!authStore.isLoggedIn) {
    // 그래서 안 되어있을 때 처리
    try {
      await authStore.reissue();
    } catch (error) {
      // alert("로그인 기간이 만료되었습니다.\n다시 로그인 해 주십시오.");
      // return next("/login");
    }
  }
  // 인증이 필요한 페이지인데, 로그인이 안 된 경우 로그인페이지로 이동
  if (to.meta.isAuthenticated && !authStore.isLoggedIn) {
    return next("/login");
  }

  // 게스트만 접근 가능한 페이지인데, 로그인 중인 경우 메인페이지로 이동
  if (to.meta.isGuestOnly && authStore.isLoggedIn) {
    return next("/");
  }

  // 나머지는 통과
  next();
});

export default router;
