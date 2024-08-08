import basicClient from '../Auth/basicClient';

export const fetchReviews = async (login_email: string) => {
  const response = await basicClient.get(`api/member/${login_email}/review`);
  return response.data;
};

export const fetchReview = async (reviewId: string) => {
  const response = await basicClient.get(`/api/review/${reviewId}/detail`);
  return response.data;
};

export const updateReview = async (reviewId: string, formData: FormData) => {
  return basicClient.put(`api/review/${reviewId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const submitReview = async (formData: FormData) => {
  return basicClient.post('api/review', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteReview = async (reviewid: string) => {
  return basicClient.delete(`api/review/${reviewid}`);
};

export const fetchRecommendReview = async () => {
  return basicClient.get('/api/review/recommend');
};

export const fetchBannerImage = async () => {
  return basicClient.get('/api/banner');
};
