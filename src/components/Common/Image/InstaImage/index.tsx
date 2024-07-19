import React from 'react';
import { Box } from '@chakra-ui/react';
import { InstaImageProps } from '../../../../types/ComponentType';

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
