import { Button } from '@chakra-ui/react';
import { CSSProperties, FC } from 'react';

interface CommonButtonProps {
  onClick: () => void;
  value: string;
  onSubmit?: () => void;
}

const gradientStyle: CSSProperties = {
  background: 'linear-gradient(90deg, #39643B 0%, #59B86E 100%)',
  width: '636px',
  height: '139px',
  color: 'white',
};

const CommonButton: FC<CommonButtonProps> = ({ onClick, value, onSubmit }) => {
  return (
    <Button
      style={gradientStyle}
      onClick={onClick}
      type={onSubmit ? 'submit' : 'button'}
    >
      {value}
    </Button>
  );
};

export default CommonButton;
