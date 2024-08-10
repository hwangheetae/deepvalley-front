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
    <Box position="relative" p={10} textAlign="center">
      <IconButton
        icon={<ArrowLeftIcon />}
        position="absolute"
        left="1px"
        top="50%"
        transform="translateY(-50%)"
        onClick={onPrev}
        aria-label="Previous"
        bg="transparent"
        _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}
      />
      <Image
        src={src}
        mx="auto"
        maxH="50vh"
        onClick={onClose}
        cursor="pointer"
      />
      <IconButton
        icon={<ArrowRightIcon />}
        position="absolute"
        right="1px"
        top="50%"
        transform="translateY(-50%)"
        onClick={onNext}
        aria-label="Next"
        bg="transparent"
        _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}
      />
      <VStack
        mt={3}
        spacing={0}
        align="start"
        bg="rgba(0, 0, 0, 0.5)"
        p={5}
        borderRadius="md"
      >
        <HStack>
          <Avatar src={profileImage ?? ''} />
          <Text color="white" fontWeight="bold" align="start">
            {nickname}
          </Text>
        </HStack>
        <Text color="white" fontWeight="bold">
          {title}
        </Text>
        <Text color="white" noOfLines={2}>
          {content}
        </Text>
      </VStack>
    </Box>
  );
};

export default PictureDetail;
