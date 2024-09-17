import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import Intro_Background3 from '../../../assets/images/Intro_Background3.png';
import { FaGlobe, FaGooglePlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Github_QR from '../../../assets/images/Github_QR.png';
import Notion_QR from '../../../assets/images/Notion_QR.png';
import Site_QR from '../../../assets/images/Site_QR.png';

const textVariants = {
  hidden: { opacity: 0, y: 50 }, // Start hidden and shifted down
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 1,
      duration: 1,
      ease: 'easeInOut',
    },
  }),
};

const IntroPageFour = () => {
  return (
    <Box
      as="section"
      h="100vh"
      bgImage={`url(${Intro_Background3})`}
      bgSize="cover"
      bgPosition="center"
    >
      <Flex
        direction="column"
        justify="center"
        align="center"
        minH="100vh"
        textAlign="center"
        px={{ base: 4, md: 8 }}
      >
        <Heading
          as={motion.h1}
          size="4xl"
          mb={8}
          letterSpacing="wider"
          custom={1}
        >
          깊은산 골짜기
        </Heading>
        <Flex
          as={motion.div}
          direction={{ base: 'column', md: 'row' }}
          variants={textVariants}
          justify="center"
          align="center"
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <Button
            leftIcon={<FaGlobe />}
            colorScheme="blackAlpha"
            mx={{ base: 0, md: 2 }}
            mb={{ base: 4, md: 0 }}
            bgImage={Github_QR}
            _hover={{ bg: 'gray.500' }}
            color="white"
            height={'46px'}
            onClick={() => (window.location.href = './login')}
          ></Button>
          <Button
            leftIcon={<FaGlobe />}
            colorScheme="blackAlpha"
            mx={{ base: 0, md: 2 }}
            mb={{ base: 4, md: 0 }}
            bgImage={Notion_QR}
            _hover={{ bg: 'gray.500' }}
            color="white"
            height={'46px'}
            onClick={() => (window.location.href = './login')}
          ></Button>
          <Button
            leftIcon={<FaGlobe />}
            colorScheme="blackAlpha"
            mx={{ base: 0, md: 2 }}
            mb={{ base: 4, md: 0 }}
            bgImage={Site_QR}
            _hover={{ bg: 'gray.500' }}
            color="white"
            height={'46px'}
            onClick={() => (window.location.href = './login')}
          ></Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default IntroPageFour;
