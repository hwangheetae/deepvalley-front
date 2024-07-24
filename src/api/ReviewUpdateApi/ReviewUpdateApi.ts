import { ReviewUpdateType } from '../../types/ReviewUpdateType/ReviewUpdateType';
import config from '../../config/index';

export const updateReview = async (
  reviewId: string,
  reviewData: ReviewUpdateType,
): Promise<void> => {
  const token = localStorage.getItem('token');
  const access_token = JSON.parse(token!);
  const response = await fetch(`${config.API_URL}api/review/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token.access_token}`,
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    throw new Error('Update Error');
  }
};
