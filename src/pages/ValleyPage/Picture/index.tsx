import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';
import PictureDetail from './PictureDetail';
import { ValleyDetailImageType } from '../../../types';

interface PictureProps {
  images: ValleyDetailImageType[];
}

const Picture: React.FC<PictureProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(
    null,
  );

  const handleClick = (reviewIndex: number, imageIndex: number) => {
    setSelectedReviewIndex(reviewIndex);
    setSelectedImageIndex(imageIndex);
  };

  const handleClose = () => {
    setSelectedReviewIndex(null);
    setSelectedImageIndex(null);
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null && selectedReviewIndex !== null) {
      const currentReview = images[selectedReviewIndex];
      setSelectedImageIndex(
        (selectedImageIndex - 1 + currentReview.image_urls.length) %
          currentReview.image_urls.length,
      );
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedReviewIndex !== null) {
      const currentReview = images[selectedReviewIndex];
      setSelectedImageIndex(
        (selectedImageIndex + 1) % currentReview.image_urls.length,
      );
    }
  };

  return (
    <Box p={4}>
      {images.length === 0 ? (
        <Box textAlign="center" mt="20%">
          <Text fontSize="lg" fontWeight="bold">
            사진이 없습니다.
          </Text>
        </Box>
      ) : (
        <>
          <SimpleGrid columns={[2, null, 3]} spacing={1}>
            {images.flatMap((imageData, reviewIndex) =>
              imageData.image_urls.map((src, imageIndex) => (
                <Image
                  key={`${reviewIndex}-${imageIndex}`}
                  src={src}
                  onClick={() => handleClick(reviewIndex, imageIndex)}
                  cursor="pointer"
                />
              )),
            )}
          </SimpleGrid>

          <Modal
            isOpen={selectedImageIndex !== null && selectedReviewIndex !== null}
            onClose={handleClose}
          >
            <ModalOverlay mx="auto" />
            <ModalContent>
              <ModalCloseButton />
              {selectedImageIndex !== null && selectedReviewIndex !== null && (
                <PictureDetail
                  src={
                    images[selectedReviewIndex].image_urls[selectedImageIndex]
                  }
                  profileImage={
                    images[selectedReviewIndex].profile_image_url ?? ''
                  }
                  nickname={images[selectedReviewIndex].review_id}
                  title={images[selectedReviewIndex].title}
                  content={images[selectedReviewIndex].content}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onClose={handleClose}
                />
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default Picture;
