import config from '../../config/index';

export const fetchReviews = async (memberId: string) => {
  const response = await fetch(
    `http://ec2-43-201-6-108.ap-northeast-2.compute.amazonaws.com:8080/api/member/${memberId}/review`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '여기다가 토큰값',
      },
    },
  );
  if (!response.ok) {
    throw new Error('Error Fetch ReviewsApi');
  }
  return response.json();
};
