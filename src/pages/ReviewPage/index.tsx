import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  Box,
  useDisclosure,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { Layout, Header, Review } from '../../components/Common';
import { ReviewType } from '../../types';
import ReviewMenuModal from '../../components/Common/ReviewMenuModal';
import { deleteReview } from '../../api/Review';
import useSuccessToast from '../../hooks/useSuccessToast';

interface LoaderData {
  reviewId: string;
  initialData: ReviewType;
}

const ReviewPage: React.FC = () => {
  const { reviewId, initialData } = useLoaderData() as LoaderData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const { successToast } = useSuccessToast();

  const handleDelete = async () => {
    try {
      await deleteReview(reviewId);
      successToast({
        title: '리뷰 삭제 성공!',
        description: '리뷰가 성공적으로 삭제되었습니다.',
      });
      navigate('/mypage');
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
        onDelete={onConfirmOpen}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        onConfirm={() => {
          onConfirmClose();
          handleDelete();
        }}
      />
    </Layout>
  );
};

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>삭제 확인</ModalHeader>
      <ModalBody>정말 삭제하시겠습니까?</ModalBody>
      <ModalFooter>
        <Button colorScheme="red" mr={3} onClick={onConfirm}>
          삭제
        </Button>
        <Button variant="ghost" onClick={onClose}>
          취소
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ReviewPage;
