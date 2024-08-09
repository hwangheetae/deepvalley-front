import { Flex, Spinner } from '@chakra-ui/react';

const LoadingComponent = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="20vh"
    >
      <Spinner
        thickness="4px"
        speed="2s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Flex>
  );
};

export default LoadingComponent;
