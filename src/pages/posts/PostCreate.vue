<script setup>
import { reactive, ref } from "vue";
import MyButton from "../../components/button/MyButton.vue";
import { useFileStore } from "../../store/file/useFileStore";
import usePostCreateStore from "../../store/post/usePostCreateStore.js";
import { useRouter } from "vue-router";
import postCreateValidation from "../../util/validator/domain/post/postCreateValidation.js";
import { useAuthStore } from "../../store/auth/useAuthStore.js";

const fileStore = useFileStore();
const postCreateStore = usePostCreateStore();
const authStore = useAuthStore();

const preview = ref(null);
const selectedFile = ref(null);
const router = useRouter();

const postData = reactive({
  content: "",
  image: "",
});

const handleChangePost = async (e) => {
  const file = e.target.files[0];

  if (!file) {
    return;
  }

  if (preview.value) {
    URL.revokeObjectURL(preview.value);
  }

  const fileUri = await fileStore.uploadPosts(file);

  if (fileUri) {
    postData.image = fileUri;

    selectedFile.value = file;

    preview.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  const validationList = [
    postCreateValidation.content(postData.content),
    postCreateValidation.image(postData.image),
  ];

  // 비어있지 않은 문자열들만 가져와야함 filter(특정 조건에 맞는 것만 가져옴)
  const errorList = validationList.filter((val) => val);

  if (errorList.length > 0) {
    // error가 남
    alert(errorList.join("\n")); // join: 배열(Array)의 요소들을 하나의 문자열로 이어붙이는 메서드
    return; // 에러 발생시 밑 처리 하면 안 되니 바로 리턴
  }

  try {
    const result = await postCreateStore.postCreate(postData);

    alert("게시물 작성이 완료되었습니다.");
    authStore.userInfo.countPosts++;
    router.replace(`/posts/${result.id}`);
  } catch (error) {
    const data = error?.response?.data?.data;

    if (data?.code === "E12") {
      alert(data.data);
    } else if (data?.code === "E21") {
      alert("잘못된 양식입니다.");
    } else {
      myErrorStore.setErrorInfo(error);
      router.replace("/error");
    }
  }
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="text-box">
        <textarea
          v-model="postData.content"
          class="post-content"
          name="post-content"
          id="post-content"
          placeholder="내용 작성"
        ></textarea>
      </div>
      <div class="file-box">
        <div
          class="preview"
          v-if="preview"
          :style="{ backgroundImage: `url(${preview})` }"
        ></div>
        <input
          type="file"
          accept="image/*"
          id="file"
          @change="handleChangePost"
        />

        <MyButton
          :btn-type="'submit'"
          :color="'gray'"
          :size="'middle'"
          :content="'Write'"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.container {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.file-box {
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
}

.post-content {
  padding: 20px;
  width: 300px;
  height: 150px;
  border: 2px solid #b1b1b1;
  border-radius: 5px;
}

.preview {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
