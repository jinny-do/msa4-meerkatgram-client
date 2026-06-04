<script setup>
import { reactive, ref } from "vue";
import MyButton from "../../components/button/MyButton.vue";
import MyInput from "../../components/input/MyInput.vue";
import { useFileStore } from "../../store/file/useFileStore.js";
import { useAuthStore } from "../../store/auth/useAuthStore.js";
import { useRouter } from "vue-router";

const router = useRouter();
const fileStore = useFileStore();
const authStore = useAuthStore();

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
      alert("오류가 발생했습니다.\n잠시후 다시 시도해 주십시오.");
      router.replace("/");
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
