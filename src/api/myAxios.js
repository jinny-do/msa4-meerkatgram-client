import axios from "axios";

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

export default myAxios;
