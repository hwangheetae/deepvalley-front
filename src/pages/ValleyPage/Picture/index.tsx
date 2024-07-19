import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

const Picture: React.FC = () => {
  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold">
        사진
      </Text>
      <Box>
        <Image src="image1_url" alt="image1" mb={2} />
        <Image src="image2_url" alt="image2" mb={2} />
        <Image src="image3_url" alt="image3" />
      </Box>
    </Box>
  );
};

export default Picture;
