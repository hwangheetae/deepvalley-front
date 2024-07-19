import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { Layout, Header, Review } from '../../components/Common';
import { ReviewType } from '../../types';

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
