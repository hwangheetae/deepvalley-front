import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { FC, CSSProperties } from 'react';

interface CustomButtonProps extends ChakraButtonProps {
  ButtonStyle?: CSSProperties;
}

const CustomButton: FC<CustomButtonProps> = ({ ButtonStyle, ...props }) => {
  return <ChakraButton {...props} sx={ButtonStyle} />;
};

export default CustomButton;
