import { Button } from '@chakra-ui/react';
import { CSSProperties, FC } from 'react';
interface CommonButtonProps {
  onClick: () => void;
  value: string;
  onSubmit?: () => void;
  isLoading?: boolean;
}

const gradientStyle: CSSProperties = {
  background: 'linear-gradient(90deg, #39643B 0%, #59B86E 100%)',
  width: '63%',
  height: '48px',
  color: 'white',
};

const CommonButton: FC<CommonButtonProps> = ({
  onClick,
  value,
  onSubmit,
  isLoading,
}) => {
  return (
    <Button
      style={gradientStyle}
      onClick={onClick}
      type={onSubmit ? 'submit' : 'button'}
      borderRadius="full"
      isLoading={isLoading}
    >
      {value}
    </Button>
  );
};

export default CommonButton;
