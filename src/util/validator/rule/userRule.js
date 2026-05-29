export const email = (val) => {
  const regex =
    /^[0-9a-zA-Z](?!.*?[\-\_\.]{2})[a-zA-Z0-9\-\_\.]{3,63}@[0-9a-zA-Z](?!.*?[\-\_\.]{2})[a-zA-Z0-9\-\_\.]{3,63}\.[a-zA-Z]{2,3}$/;
  if (!val) {
    // email이 비어있다면
    return "이메일은 필수입니다.";
  }

  if (!regex.test(val)) {
    // regex의 양식에 맞는 게 val 안에 있는지 체크
    // 맞으면 true, 틀리면 false
    // 통과가 안 되면 리턴
    return "이메일 양식이 올바르지 않습니다.";
  }

  return ""; // 모두 정상일 때 빈문자열 반환
};

export const password = (val) => {
  const regex = /^[0-9a-zA-Z!@#$%^&*()]{8,20}$/;

  if (!val) {
    return "비밀번호는 필수입니다.";
  }

  if (!regex.test(val)) {
    return "비밀번호 양식이 올바르지 않습니다.";
  }

  return ""; // 모두 정상일 때 빈문자열 반환
};
