import React from 'react';
import { Box } from '@chakra-ui/react';

interface InstaImageProps {
  src: string;
}

const InstaImage: React.FC<InstaImageProps> = ({ src }) => (
  <Box
    width="100%"
    paddingBottom="100%"
    background={`url(${src})`}
    backgroundSize="cover"
    backgroundPosition="center"
    backgroundRepeat="no-repeat"
  />
);

export default InstaImage;
