import { ReviewType } from '../../types/ReviewType/ReviewType';
import { mockReview } from './MockData';

export const fetchReview = async (reviewId: string): Promise<ReviewType> => {
    // const response = await fetch(`/api/review/${reviewId}/detail`);
    // if (!response.ok) {
    //     throw new Error('Fetch Error');
    // }
    // return response.json();

    await new Promise(resolve => setTimeout(resolve, 500)); //테스트용
    console.log('Mock Review Data:', mockReview);
    return mockReview;
}