import config from '../../config/index';
import { ReviewWritingType } from '../../types/ReviewWritingType/ReviewWritingType';

export const submitReview = async (reviewData: ReviewWritingType) => {
  const token = localStorage.getItem('token');
  const access_token = JSON.parse(token!);
  const response = await fetch(`${config.API_URL}api/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token.access_token}`,
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    throw new Error('Error submitting review');
  }
  return response.json();
};

export const uploadImages = async (images: File[]) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });

  const response = await fetch(`${config.API_URL}api/upload-images`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error uploading images');
  }
  return response.json();
};
