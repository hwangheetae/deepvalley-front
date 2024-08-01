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

interface PictureProps {
  images: { review_id: string; image_urls: string[] }[];
  reviews: {
    review_id: string;
    profile_image_url: string | null;
    member_id: string;
    content: string;
    title: string;
  }[];
}

const Picture: React.FC<PictureProps> = ({ images, reviews }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + allImages.length) % allImages.length,
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % allImages.length);
    }
  };

  const allImages = images.flatMap((imageData) => imageData.image_urls);

  return (
    <Box p={4}>
      {allImages.length === 0 ? (
        <Box textAlign="center" mt="20%">
          <Text fontSize="lg" fontWeight="bold">
            사진이 없습니다.
          </Text>
          <Text mb={4}>첫 번째 사진을 업로드 해보세요!</Text>
        </Box>
      ) : (
        <>
          <SimpleGrid columns={[2, null, 3]} spacing={1}>
            {allImages.map((src, index) => (
              <Image
                key={index}
                src={src}
                onClick={() => handleClick(index)}
                cursor="pointer"
              />
            ))}
          </SimpleGrid>

          <Modal isOpen={selectedIndex !== null} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              {selectedIndex !== null && (
                <PictureDetail
                  src={allImages[selectedIndex]}
                  profileImage={reviews[selectedIndex]?.profile_image_url ?? ''}
                  nickname={reviews[selectedIndex]?.member_id ?? ''}
                  title={reviews[selectedIndex]?.title ?? ''}
                  content={reviews[selectedIndex]?.content ?? ''}
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
