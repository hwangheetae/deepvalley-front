import basicClient from '../basicClient';

export const login = async (email: string, password: string) => {
  const response = await basicClient.post('/api/member/login"', {
    email,
    password,
  });

  if (response.data.access_token) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
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
  const response = await basicClient.post('/api/member/register', {
    login_email,
    name,
    password,
  });
  return response.data;
};
