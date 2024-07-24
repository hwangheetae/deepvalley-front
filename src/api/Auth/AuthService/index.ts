import basicClient from '../basicClient';

// export const login = async (login_email: string, password: string) => {
//   const response = await basicClient.post(
//     '/api/member/login',
//     {
//       login_email,
//       password,
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   );

//   if (response.data.access_token) {
//     localStorage.setItem('token', JSON.stringify(response.data.access_token));
//   }
//   return response.data;
// };

//login_email: string, password: string)
export const login = async (body: {}) => {
  return basicClient.post('/api/member/login', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const logout = () => {
  localStorage.clear();
};

//db 명칭상 이유로 nickname => name
// export const register = async (
//   login_email: string,
//   name: string,
//   password: string,
// ) => {
//   const response = await basicClient.post(
//     '/api/member/register',
//     {
//       login_email,
//       name,
//       password,
//     },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     },
//   );
//   return response.data;
// };
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
    // headers: {
    //   'Content-Type': 'application/json',
    // },
  });
};
