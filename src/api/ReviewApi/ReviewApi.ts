import { ReviewType } from '../../types/ReviewType/ReviewType';

export const fetchReview = async (reviewId: string): Promise<ReviewType> => {
  const response = await fetch(`/api/review/${reviewId}/detail`);
  if (!response.ok) {
    throw new Error('Fetch Error');
  }
  return response.json();
};
