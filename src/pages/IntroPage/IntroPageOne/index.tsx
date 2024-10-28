import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import Intro_Background_Web from '../../../assets/images/Intro_Background_Web.webp';
import Intro_Background_Mobile from '../../../assets/images/Intro_Background_Mobile.webp';
import { FaGlobe, FaGooglePlay } from 'react-icons/fa';
import { motion } from 'framer-motion';

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5,
      duration: 1,
      ease: 'easeInOut',
    },
  }),
};

const IntroPageOne = () => {
  return (
    <Box
      as="section"
      h="100vh"
      bgImage={{
        md: `url(${Intro_Background_Web})`,
        base: `url(${Intro_Background_Mobile})`,
      }}
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
          fontSize={{ base: '3xl', md: '6xl' }}
          mb={8}
          letterSpacing="wider"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          계곡 갈 땐?
        </Heading>
        <Heading
          as={motion.h1}
          fontSize={{ base: '3xl', md: '6xl' }}
          mb={8}
          letterSpacing="wider"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          깊은산골짜기
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
            bg="blackAlpha.800"
            _hover={{ bg: 'gray.500' }}
            color="white"
            height={'46px'}
            onClick={() => (window.location.href = './login')}
          >
            Web
          </Button>
          <Button
            leftIcon={<FaGooglePlay />}
            colorScheme="blackAlpha"
            mx={{ base: 0, md: 2 }}
            bg="blackAlpha.800"
            _hover={{ bg: 'gray.500' }}
            color="white"
            height={'46px'}
            onClick={() =>
              (window.location.href =
                'https://play.google.com/store/apps/details?id=net.cloudfront.djw9hdrinhwdq.twa')
            }
          >
            Google Play
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default IntroPageOne;
