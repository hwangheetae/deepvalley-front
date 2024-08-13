import { logout } from '../Auth/AuthService';
import basicClient from '../Auth/basicClient';
export const fetchReviews = async (login_email: string) => {
  try {
    const response = await basicClient.get(`api/member/${login_email}/review`);
    return response.data;
  } catch (error) {
    logout();
    window.location.href = '/errorpage';
    await new Promise((resolve) => setTimeout(resolve, 100));
    throw new Error('Failed to fetch valleys by filter');
  }
};

export const fetchReview = async (reviewId: string) => {
  try {
    const response = await basicClient.get(`/api/review/${reviewId}/detail`);
    return response.data;
  } catch (error) {
    logout();
    window.location.href = '/errorpage';
    await new Promise((resolve) => setTimeout(resolve, 100));
    throw new Error('Failed to fetch valleys by filter');
  }
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
