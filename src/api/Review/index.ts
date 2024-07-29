import basicClient from '../Auth/basicClient';

export const fetchReviews = async (memberId: string) => {
  const response = await basicClient.get(`api/member/${memberId}/review`);
  return response.data;
};

export const fetchReview = async (reviewId: string) => {
  const response = await basicClient.get(`/api/review/${reviewId}/detail`);
  return response.data;
};

export const updateReview = async (reviewId: string, body: {}) => {
  return basicClient.put(`api/review/${reviewId}`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const submitReview = async (body: {}) => {
  return basicClient.post('api/review', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
