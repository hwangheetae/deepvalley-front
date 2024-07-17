// 테스트용
import { ReviewType } from '../../types/ReviewType/ReviewType';

export const mockReview: ReviewType = {
  review_id: '1',
  title: 'Beautiful Valley',
  rating: '5',
  content: 'This valley is absolutely stunning!',
  visited_date: '2023-06-15',
  privacy: 'public',
  created_date: '2023-06-16',
  updated_date: '2023-06-17',
  tag_names: ['nature', 'hiking'],
  image_urls: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
  ],
  valley_name: 'Green Valley',
  valley_id: 'gv123',
};
