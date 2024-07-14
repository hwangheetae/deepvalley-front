export const emailRegEx =
  /^[A-Za-z0-9]([._-]?[A-Za-z0-9]+)*@[A-Za-z0-9]([._-]?[A-Za-z0-9]+)*\.[A-Za-z]{2,}$/i;

//비밀번호는 영문/숫자/특수 문자를 필수로 8글자 이상 (최대 20글자로 제한)으로 한다.
export const passwordRegEx =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*?_])[a-zA-Z\d!@#$%^&*?_]{8,20}$/;
