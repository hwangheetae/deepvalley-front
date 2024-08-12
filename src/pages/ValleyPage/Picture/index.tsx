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
  Link,
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
      nickname: imageData.member_name,
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
        <Box width="100%" ml={0}>
          <SimpleGrid columns={3} spacing={1}>
            {allImages.map((imageData, index) => (
              <Link key={index} onClick={() => handleClick(index)}>
                <Box mb="0">
                  <Box width="100%" paddingBottom="100%" position="relative">
                    <Image
                      src={imageData.src}
                      alt={imageData.title}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      position="absolute"
                      top="0"
                      left="0"
                    />
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      width="100%"
                      height="100%"
                      boxShadow="inset 0px 0px 10px 5px rgba(0, 0, 0, 0.1)"
                    />
                    <Box
                      position="absolute"
                      top="5px"
                      left="10px"
                      right="10px"
                      color="white"
                    ></Box>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      )}

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
    </Box>
  );
};

export default Picture;
