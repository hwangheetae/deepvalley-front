import config from '../../config/index';

export const fetchReviews = async (memberId: string) => {
  const response = await fetch(
    `${config.API_URL}/api/member/${memberId}/review`,
    {
      method: 'GET',
    },
  );
  if (!response.ok) {
    throw new Error('Error Fetch ReviewsApi');
  }
  return response.json();
};
