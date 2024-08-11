import { useToast } from '@chakra-ui/react';

interface useRatingErrorToastProps {
  title: string;
  description: string;
}
const useRatingErrorToast = () => {
  const toast = useToast();
  const ratingErrorToast = ({ title, description }: useRatingErrorToastProps) =>
    toast({
      title: title,
      description: description,
      status: 'error',
      position: 'top-right',
      isClosable: true,
      duration: 5000,
    });
  return { ratingErrorToast };
};

export default useRatingErrorToast;
