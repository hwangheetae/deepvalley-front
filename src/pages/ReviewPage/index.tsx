import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { Box, useDisclosure, useToast, Button, Text } from '@chakra-ui/react';
import { Layout, Header, Review } from '../../components/Common';
import { ReviewType } from '../../types';
import ReviewMenuModal from '../../components/Common/ReviewMenuModal';
import { deleteReview } from '../../api/Review';

interface LoaderData {
  reviewId: string;
  initialData: ReviewType;
}

const ReviewPage: React.FC = () => {
  const { reviewId, initialData } = useLoaderData() as LoaderData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isDeleted, setIsDeleted] = useState(false); // 삭제 상태를 관리하는 상태 추가

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId);
      setIsDeleted(true);
    } catch (error) {
      toast({
        title: '삭제 실패',
        description: '리뷰를 삭제하는 중에 오류가 발생했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isDeleted) {
    return (
      <Layout>
        <Header title="" showMenuButton={false} showBorderBottom={false} />
        <Box p="4" pt="20">
          <Text>리뷰가 성공적으로 삭제되었습니다!</Text>
          <Link to="/">
            <Button mt="4">메인 페이지로 이동</Button>
          </Link>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header
        title="리뷰 상세"
        showMenuButton={true}
        showBorderBottom={true}
        onMenuClick={onOpen}
      />
      <Box p="4" pt="20">
        <Review reviewId={reviewId} initialData={initialData} />
      </Box>
      <ReviewMenuModal
        isOpen={isOpen}
        onClose={onClose}
        reviewId={reviewId}
        onDelete={handleDelete}
      />
    </Layout>
  );
};

export default ReviewPage;
