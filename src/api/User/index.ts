import basicClient from '../Auth/basicClient';

export const getUSer = async () => {
  return basicClient.get('/api/member');
};

//특정 유저의 리뷰 목록 표시 request api 미작성

//Body:
// "nickname": "string",
// "profile_image_url": "string",
// "description": "string"
export const changeProfile = async (body: {}) => {
  return basicClient.put('/api/member', body);
};

//  body => "password": "string",                    O
export const changePassword = async (body: {}) => {
  return basicClient.put('/api/member/change-password', body);
};

//body =>
// "login_email" : "string"
// "password": "string",
export const membershipWithdrawal = async (body: {}) => {
  return basicClient.delete('/api/member', body);
};
