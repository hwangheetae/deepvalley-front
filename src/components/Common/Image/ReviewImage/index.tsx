import React from 'react';
import { Box } from '@chakra-ui/react';
import { ReviewImageProps } from '../../../../types/ComponentType';

const ReviewImage: React.FC<ReviewImageProps> = ({ src }) => (
  <Box
    width="100%"
    paddingBottom="150%"
    background={`url(${src})`}
    backgroundSize="cover"
    backgroundPosition="center"
    backgroundRepeat="no-repeat"
    boxShadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
    mb="10px"
  />
);

export default ReviewImage;
