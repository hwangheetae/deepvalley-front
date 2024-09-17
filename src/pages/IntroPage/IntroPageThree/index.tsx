import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const IntroPageThree = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 }, // Start hidden and shifted down
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 2,
        duration: 1,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <Box as="section" h="100vh">
      <Flex
        direction="column"
        justify="center"
        align="center"
        minH="100vh"
        textAlign="center"
        px={{ base: 4, md: 8 }}
      ></Flex>
    </Box>
  );
};

export default IntroPageThree;
