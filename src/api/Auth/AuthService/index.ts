import basicClient from '../basicClient';

//login_email: string, password: string)
export const login = async (body: {}) => {
  return basicClient.post('/api/member/login', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const logout = () => {
  sessionStorage.clear();
};

export const register = async (body: {
  login_email: string;
  name: string;
  password: string;
}) => {
  return basicClient.post('/api/member/register', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const kakaoLoginSendToken = async (code: string) => {
  return await basicClient.get('/api/oauth/kakao', {
    params: { code },
  });
};
