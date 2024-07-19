import { Button as ChakraButton } from '@chakra-ui/react';
import { FC } from 'react';
import { CustomButtonProps } from '../../../types/ComponentType';

const CustomButton: FC<CustomButtonProps> = ({ ButtonStyle, ...props }) => {
  return <ChakraButton {...props} sx={ButtonStyle} />;
};

export default CustomButton;
