import config from '../../config/index';
import { ReviewWritingType } from '../../types/ReviewWritingType/ReviewWritingType';

export const submitReview = async (reviewData: ReviewWritingType) => {
  const response = await fetch(
    `http://ec2-43-201-6-108.ap-northeast-2.compute.amazonaws.com:8080/api/review`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '토큰',
      },
      body: JSON.stringify(reviewData),
    },
  );

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

  const response = await fetch(`${config.API_URL}/api/upload-images`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error uploading images');
  }
  return response.json();
};
