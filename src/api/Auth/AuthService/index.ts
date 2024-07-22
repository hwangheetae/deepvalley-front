import basicClient from '../basicClient';

export const login = async (login_email: string, password: string) => {
  const response = await basicClient.post(
    '/api/member/login',
    {
      login_email,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.data.access_token) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.clear();
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('token')!);
};

//db 명칭상 이유로 nickname => name
export const register = async (
  login_email: string,
  name: string,
  password: string,
) => {
  const response = await basicClient.post(
    '/api/member/register',
    {
      login_email,
      name,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response.data;
};

export const kakaoLoginSendToken = async (code: string) => {
  const response = await basicClient.post(
    '/api/auth/kakao/token',
    { code },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};
