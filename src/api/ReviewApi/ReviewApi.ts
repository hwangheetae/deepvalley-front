import { ReviewType } from '../../types/ReviewType/ReviewType';
import config from '../../config/index';

export const fetchReview = async (reviewId: string): Promise<ReviewType> => {
  const token = localStorage.getItem('token');
  const access_token = JSON.parse(token!);
  const response = await fetch(
    `${config.API_URL}api/review/${reviewId}/detail`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token.access_token}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error('Fetch Error');
  }
  return response.json();
};
