import { defineStore } from "pinia";
import myAxios from "../../api/myAxios";

const usePostCreateStore = defineStore("postCreate", () => {
  // 1, State

  // 2, Getter

  //3, Actions
  const postCreate = async (postData) => {
    try {
      const url = "/api/posts/create";

      const res = await myAxios.post(url, postData);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    postCreate,
  };
});

export default usePostCreateStore;
