import basicClient from '../basicClient';

export const login = async (email: string, password: string) => {
  const response = await basicClient.post('/api/member/login"', {
    email,
    password,
  });
  if (response.data.access_token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user')!);
};

export const register = async (
  login_email: string,
  nickname: string,
  password: string,
) => {
  const response = await basicClient.post('/api/member/register', {
    login_email,
    nickname,
    password,
  });
  return response.data;
};
