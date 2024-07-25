import { FC } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import {
  InstaImage,
  ProfileImage,
  ReviewImage,
} from '../../components/Common/Image';

const ImagePage: FC = () => {
  const imageSrcs = [
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
    'valley1.png',
  ];

  return (
    <Box
      w="100%"
      maxW="430px"
      mx="auto"
      overflowY="scroll"
      height="932px"
      bg="gray.100"
      p={2}
    >
      <Box mb={4} marginBottom={4}>
        <ProfileImage src="valley1.png" />
      </Box>

      <SimpleGrid columns={3} spacing={1}>
        {imageSrcs.map((src, index) => (
          <InstaImage key={index} src={src} />
        ))}
      </SimpleGrid>

      <Box mt={4} marginTop={4}>
        <ReviewImage src="valley1.png" />
      </Box>
    </Box>
  );
};

export default ImagePage;
