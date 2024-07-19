import { ReviewType } from '../../types/ReviewType/ReviewType';
import config from '../../config/index';

export const fetchReview = async (reviewId: string): Promise<ReviewType> => {
  const response = await fetch(
    `${config.API_URL}/api/review/${reviewId}/detail`,
    {
      method: 'GET',
    },
  );
  if (!response.ok) {
    throw new Error('Fetch Error');
  }
  return response.json();
};
