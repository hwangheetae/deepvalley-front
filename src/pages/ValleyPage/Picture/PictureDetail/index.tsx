import React from 'react';
import {
  Box,
  Image,
  Text,
  HStack,
  VStack,
  Avatar,
  IconButton,
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

interface PictureDetailProps {
  src: string;
  profileImage: string | null;
  nickname: string;
  title: string;
  content: string;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

const PictureDetail: React.FC<PictureDetailProps> = ({
  src,
  profileImage,
  nickname,
  title,
  content,
  onPrev,
  onNext,
  onClose,
}) => {
  return (
    <Box position="relative" p={4} textAlign="center">
      <IconButton
        icon={<ArrowLeftIcon />}
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        onClick={onPrev}
        aria-label="Previous"
      />
      <Image
        src={src}
        mx="auto"
        maxH="80vh"
        onClick={onClose}
        cursor="pointer"
      />
      <IconButton
        icon={<ArrowRightIcon />}
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        onClick={onNext}
        aria-label="Next"
      />
      <VStack mt={4} spacing={2}>
        <HStack>
          <Avatar src={profileImage ?? ''} />
          <Text fontWeight="bold">{nickname}</Text>
        </HStack>
        <Text fontWeight="bold">{title}</Text>
        <Text noOfLines={2}>{content}</Text>
      </VStack>
    </Box>
  );
};

export default PictureDetail;
