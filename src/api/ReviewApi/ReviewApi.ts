import { ReviewType } from '../../types/ReviewType/ReviewType';
import config from '../../config/index';

export const fetchReview = async (reviewId: string): Promise<ReviewType> => {
  const response = await fetch(
    `http://ec2-43-201-6-108.ap-northeast-2.compute.amazonaws.com:8080/api/review/${reviewId}/detail`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '여기다가 토큰값',
      },
    },
  );
  if (!response.ok) {
    throw new Error('Fetch Error');
  }
  return response.json();
};
