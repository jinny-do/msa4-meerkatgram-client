export const content = (val) => {
  const regex = /^.{1,1000}$/;

  if (!val) {
    return "게시물 내용은 필수입니다.";
  }

  if (!regex.test(val)) {
    return "1~1000자 사이로 입력해주세요.";
  }

  return "";
};

export const image = (val) => {
  if (!val) {
    return "게시물 사진은 필수입니다.";
  }

  return "";
};
