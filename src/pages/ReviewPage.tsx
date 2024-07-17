import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Layout from '../components/Common/Layout';
import Header from '../components/Common/Header';
import Review from '../components/Common/Review/Review';
import { ReviewType } from '../types/ReviewType/ReviewType';

interface LoaderData {
  reviewId: string;
  initialData: ReviewType;
}

const ReviewPage: React.FC = () => {
  const { reviewId, initialData } = useLoaderData() as LoaderData;

  return (
    <Layout>
      <Header
        title="리뷰 상세"
        showMenuButton={false}
        showBorderBottom={true}
      />
      <Box p="4" pt="20">
        <Review reviewId={reviewId} initialData={initialData} />
      </Box>
    </Layout>
  );
};

export default ReviewPage;
