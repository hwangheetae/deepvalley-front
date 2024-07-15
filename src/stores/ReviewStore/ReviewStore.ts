import create from 'zustand';
import { ReviewType } from '../../types/ReviewType/ReviewType';

interface ReviewState {
    reviews: ReviewType[];
    setReviews: (reviews: ReviewType[]) => void;    
}

export const useReviewStore = create<ReviewState>((set) => ({
    reviews: [],
    setReviews: (reviews: ReviewType[]) => set({ reviews })
}));