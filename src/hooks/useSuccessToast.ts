import { useToast } from '@chakra-ui/react';

interface SuccessToastProps {
  title: string;
  description: string;
}
const useSuccessToast = () => {
  const toast = useToast();
  const successToast = ({ title, description }: SuccessToastProps) =>
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
