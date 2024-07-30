import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

const useErrorToast = () => {
  const toast = useToast();
  const [error, setError] = useState<string | null>(null);

  const errorToast = (errorMessage: string) => {
    setError(errorMessage);
    toast({
      title: '에러!',
      description: errorMessage,
      status: 'error',
      position: 'top-right',
      isClosable: true,
      duration: 5000,
    });
  };

  return { error, errorToast };
};

export default useErrorToast;
