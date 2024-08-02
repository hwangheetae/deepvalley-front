import basicClient from '../Auth/basicClient';

export const getUser = async () => {
  console.log('getuser 실행됨');
  return basicClient.get('/api/member');
};

export const changeProfile = async (body: FormData) => {
  return basicClient.put('/api/member', body);
};

export const changePassword = async (body: {
  old_password: string;
  new_password: string;
}) => {
  return basicClient.put('/api/member/change-password', body);
};

export const membershipWithdrawal = async (body: {
  login_email: string;
  password: string;
}) => {
  return basicClient.delete('/api/member', { data: body });
};
