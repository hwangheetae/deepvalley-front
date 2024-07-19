import { Input as ChakraInput } from '@chakra-ui/react';
import { FC } from 'react';
import { CustomInputProps } from '../../../types/ComponentType';

const CustomInput: FC<CustomInputProps> = ({ inputStyle, ...props }) => {
  return <ChakraInput {...props} sx={inputStyle} />;
};

export default CustomInput;
