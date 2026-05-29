import axios from "axios";
import { useAuthStore } from "../store/auth/useAuthStore";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

// axios 인스턴스 생성해서 내보내주는 역할
const myAxios = axios.create({
  //Axios 호출 시, url 가장 앞에 자동으로 연결해서 동작
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    // req body에 담겨서 가는 형태를 json 형태로 보내겠다 명시
    "Content-Type": "application/json",
  },

  // 크로스 도메인(서로 다른 도메인)에 요청을 보낼때,
  // credential 정보를 담아서 보낼지 여부를 설정
  //  credential 정보 : cookies, header, Authorization 항목 등등
  withCredentials: true,
});

//config: Axios에서 관리하는 객체
myAxios.interceptors.request.use(async (config) => {
  // 백엔드에 리퀘스트 보내기 전에 인터셉터 발동해서 토큰을 보냄
  const authStore = useAuthStore();
  let accessToken = authStore.accessToken;
  const denyUrl = /^\/api\/reissue-token$/; // 거부해야 할 url, retry 제외 url 설정

  if (!denyUrl.test(config.url) && authStore.isLoggedIn) {
    // access token 만료 확인
    const claims = jwtDecode(accessToken);
    const now = dayjs().unix(); // 현재시간의 unixTimeStamp 반환
    const expTime = dayjs.unix(claims.exp).add(-5, "minute").unix();

    if (now >= expTime) {
      // 만료 됐을 때
      try {
        await authStore.reissue();
        accessToken = authStore.accessToken;
      } catch (error) {
        console.error(error?.response);
      }
    }
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default myAxios;
