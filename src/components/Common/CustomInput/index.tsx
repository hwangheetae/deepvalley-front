import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { FC, CSSProperties } from 'react';

interface CustomInputProps extends ChakraInputProps {
  inputStyle?: CSSProperties;
}

const CustomInput: FC<CustomInputProps> = ({ inputStyle, ...props }) => {
  return <ChakraInput {...props} sx={inputStyle} />;
};

export default CustomInput;
