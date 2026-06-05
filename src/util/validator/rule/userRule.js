/**
 * 이메일 유효성 체크
 * @param {string} val 검증할 문자열
 * @returns {string} 통과시 빈문자열(''), 실패시 에러메시지
 */
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
  const regex = /^[0-9a-zA-Z!@#$%^&*]{8,20}$/;

  if (!val) {
    return "비밀번호는 필수입니다.";
  }

  if (!regex.test(val)) {
    return "비밀번호 양식이 올바르지 않습니다.\n영어 대소문자, 숫자, 특수문자(!, @, #, $, %, ^, &, *)허용";
  }

  return ""; // 모두 정상일 때 빈문자열 반환
};

// 비밀번호 체크
export const passwordChk = (password, passwordChk) => {
  if (!passwordChk) {
    return "비밀번호 확인은 필수입니다.";
  }

  return password === passwordChk
    ? ""
    : "비밀번호와 비밀번호 확인이 일치하지 않습니다.";
};

// 닉네임 체크
export const nick = (val) => {
  const regex = /^[0-9a-zA-Z_]{2,20}$/;

  if (!val) {
    return "닉네임은 필수입니다.";
  }

  if (!regex.test(val)) {
    return "닉네임 양식이 올바르지 않습니다.\n영어 대소문자, 숫자, 특수문자(_) 허용 ";
  }

  return "";
};

// 프로필 체크
export const profile = (val) => {
  if (!val) {
    return "프로필은 필수입니다.";
  }

  return "";
};
