<script setup>
import { reactive, ref } from "vue";
import MyButton from "../../components/button/MyButton.vue";
import MyInput from "../../components/input/MyInput.vue";
import { useFileStore } from "../../store/file/useFileStore.js";
import { useAuthStore } from "../../store/auth/useAuthStore.js";
import { useRouter } from "vue-router";
import registrationValidation from "../../util/validator/domain/auth/registrationValidation.js";
import { useMyErrorStore } from "../../store/error/useMyErrorStroe.js";

const router = useRouter();
const fileStore = useFileStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

const preview = ref(null);
const selectedFile = ref(null);
const registrationData = reactive({
  email: "",
  password: "",
  passwordChk: "",
  nick: "",
  profile: "",
});

// 회원가입 처리
const handleSubmit = async () => {
  // 유효성 검사 - 백앤드로 보내기 전에 해야함
  const validationList = [
    registrationValidation.email(registrationData.email),
    registrationValidation.password(registrationData.password),
    registrationValidation.passwordChk(
      registrationData.password,
      registrationData.passwordChk,
    ),
    registrationValidation.nick(registrationData.nick),
    registrationValidation.profile(registrationData.profile),
  ];

  // 비어있지 않은 문자열들만 가져와야함 filter(특정 조건에 맞는 것만 가져옴)
  const errorList = validationList.filter((val) => val);

  if (errorList.length > 0) {
    // error가 남
    alert(errorList.join("\n")); // join: 배열(Array)의 요소들을 하나의 문자열로 이어붙이는 메서드
    return; // 에러 발생시 밑 처리 하면 안 되니 바로 리턴
  }

  try {
    await authStore.registration(registrationData);
    alert("회원가입에 성공했습니다.");
    router.replace("/login");
  } catch (error) {
    const data = error.response.data;
    if (data.code === "E11") {
      alert(data.data);
    } else if (data.code === "E21") {
      alert("잘못된 양식입니다.");
    } else {
      myErrorStore.setErrorInfo(error);
      router.replace("/error");
    }
  }
};

const handleChangeProfile = async (e) => {
  const file = e.target.files[0];

  if (file) {
    if (preview.value) {
      // 기존에 생성된 메모리 URL이 있다면 해제(메모리 누수 방지)
      URL.revokeObjectURL(preview.value);
    }

    // api 서버에 파일 저장 요청
    const fileUri = await fileStore.uploadProfile(file);

    if (fileUri) {
      // 회원가입할 때 보낼 데이터들
      registrationData.profile = fileUri;

      // 미리보기 URL
      selectedFile.value = file;

      // 파일 객체를 브라우저에서 접근 가능한 임시 URL로 변환
      preview.value = URL.createObjectURL(file);
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <MyInput
      :type="'email'"
      :placeholder="'Email'"
      :readonly="false"
      :required="true"
      v-model="registrationData.email"
    />
    <MyInput
      :type="'password'"
      :placeholder="'Password'"
      :readonly="false"
      :required="true"
      v-model="registrationData.password"
    />
    <MyInput
      :type="'password'"
      :placeholder="'PasswordChk'"
      :readonly="false"
      :required="true"
      v-model="registrationData.passwordChk"
    />
    <MyInput
      :type="'text'"
      :placeholder="'Nick'"
      :readonly="false"
      :required="true"
      v-model="registrationData.nick"
    />

    <div
      class="preview"
      v-if="preview"
      :style="{ backgroundImage: `url(${preview})` }"
    ></div>

    <input
      type="file"
      accept="image/"
      id="file"
      @change="handleChangeProfile"
    />

    <MyButton
      :btn-type="'submit'"
      :color="'black'"
      :size="'middle'"
      :content="'Sign Up'"
    />
  </form>
</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.preview {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
</style>
