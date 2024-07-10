import { Input as ChakraInput } from '@chakra-ui/react';
import { FC, CSSProperties } from 'react';

interface InputProps {
  placeholder?: string;
  isDisabled?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  isReadOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
  errorMessage?: string;
  id?: string;
}

const inputStyle: CSSProperties = {
  background: 'white',
  width: '63%',
  color: 'black',
};

const Input: FC<InputProps> = ({
  placeholder,
  isDisabled = false,
  value,
  onChange,
  type = 'text',
  name,
  isReadOnly,
  size = 'md',
  variant = 'outline',
  errorMessage,
  id,
}) => {
  return (
    <div>
      <ChakraInput
        placeholder={placeholder}
        isDisabled={isDisabled}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        isReadOnly={isReadOnly}
        size={size}
        variant={variant}
        id={id}
        borderRadius="full"
        style={inputStyle}
      />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
};

export default Input;
