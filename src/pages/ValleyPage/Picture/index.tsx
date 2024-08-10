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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const allImages = images.flatMap((imageData) =>
    imageData.image_urls.map((src) => ({
      src,
      profileImage: imageData.profile_image_url,
      nickname: imageData.review_id,
      title: imageData.title,
      content: imageData.content,
    })),
  );

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

  return (
    <Box p={4}>
      {allImages.length === 0 ? (
        <Box textAlign="center" mt="20%">
          <Text fontSize="lg" fontWeight="bold">
            사진이 없습니다.
          </Text>
        </Box>
      ) : (
        <>
          <SimpleGrid columns={[2, null, 3]} spacing={1}>
            {allImages.map((imageData, index) => (
              <Image
                key={index}
                src={imageData.src}
                onClick={() => handleClick(index)}
                cursor="pointer"
                boxShadow="inset 0px 1px 3px rgba(0, 0, 0, 0.12), inset 0px -1px 3px rgba(0, 0, 0, 0.06)"
                borderRadius="md"
                overflow="hidden"
              />
            ))}
          </SimpleGrid>

          <Modal isOpen={selectedIndex !== null} onClose={handleClose}>
            <ModalOverlay mx="auto" />
            <ModalContent bg="transparent" mx="auto" my="auto">
              <ModalCloseButton
                zIndex={4}
                bg="transparent"
                _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}
              />
              {selectedIndex !== null && (
                <PictureDetail
                  src={allImages[selectedIndex].src}
                  profileImage={allImages[selectedIndex].profileImage ?? ''}
                  nickname={allImages[selectedIndex].nickname}
                  title={allImages[selectedIndex].title}
                  content={allImages[selectedIndex].content}
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
