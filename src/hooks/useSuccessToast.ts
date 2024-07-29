import { useToast } from '@chakra-ui/react';

const useSuccessToast = () => {
  const toast = useToast();
  const successToast = (title: string, description: string) =>
    toast({
      title: title,
      description: description,
      status: 'success',
      position: 'top-right',
      isClosable: true,
      duration: 5000,
    });
  return { successToast };
};

export default useSuccessToast;
