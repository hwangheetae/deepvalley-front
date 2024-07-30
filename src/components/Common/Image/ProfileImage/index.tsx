import React from 'react';
import { Box } from '@chakra-ui/react';
import { ProfileImageProps } from '../../../../types/ComponentType';

const ProfileImage: React.FC<ProfileImageProps> = ({ src }) => (
  <Box
    width="150px"
    height="150px"
    left="65px"
    top="225px"
    background={src ? 'transparent' : '#4B995C'}
    backgroundImage={src ? `url(${src})` : 'none'}
    backgroundSize="cover"
    backgroundPosition="center"
    borderRadius="full"
  />
);

export default ProfileImage;
