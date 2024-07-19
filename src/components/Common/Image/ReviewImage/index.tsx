import React from 'react';
import { Box } from '@chakra-ui/react';

interface ReviewImageProps {
  src: string;
}

const ReviewImage: React.FC<ReviewImageProps> = ({ src }) => (
  <Box
    width="100%"
    paddingBottom="150%"
    background={`url(${src})`}
    backgroundSize="cover"
    backgroundPosition="center"
    backgroundRepeat="no-repeat"
    filter="drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25))"
  />
);

export default ReviewImage;
