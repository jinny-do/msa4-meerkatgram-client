import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";

export const userPostShowStore = defineStore("postShowStore", () => {
  // 1, State
  const post = ref();

  // 2, Getter

  // 3, Actions
  const getPost = async (id) => {
    try {
      const url = `/api/posts/${id}`;
      const result = await myAxios.get(url);

      post.value = result.data.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    // State
    post,

    // Actions
    getPost,
  };
});
