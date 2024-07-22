import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { InstaImage } from '../../../components/Common/Image';

const Picture: React.FC = () => {
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
    <Box p={4}>
      <SimpleGrid columns={3} spacing={1}>
        {imageSrcs.map((src, index) => (
          <InstaImage key={index} src={src} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Picture;
