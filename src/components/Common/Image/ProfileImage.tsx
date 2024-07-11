import React from 'react';
import { Box } from '@chakra-ui/react';

interface ProfileImageProps {
  src?: string;
}
const ProfileImage: React.FC<ProfileImageProps> = ({ src }) => (
  <Box
    width="150px"
    height="150px"
    left="65px"
    top="225px"
    background={src ? `url(${src})` : '#4B995C'}
    borderRadius="full"
  />
);

export default ProfileImage;
