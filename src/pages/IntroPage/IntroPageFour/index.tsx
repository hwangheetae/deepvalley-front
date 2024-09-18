import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import Intro_Background3 from '../../../assets/images/Intro_Background3.png';
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
      position="relative" // Ensure the container is relative
    >
      {/* QR codes positioned at the bottom-left */}
      <Flex
        position="absolute" // Use absolute positioning to move it
        bottom={{ base: 2, md: 4 }} // Adjust position for small and large screens
        left={{ base: 2, md: 4 }} // Adjust position for small and large screens
        direction="row" // Stack QR codes vertically
        gap={4} // Add space between QR codes
      >
        <Image
          src={Notion_QR}
          alt="Notion QR"
          boxSize={{ base: '100px', md: '200px' }} // Smaller size on small screens
        />
        <Image
          src={Github_QR}
          alt="Github QR"
          boxSize={{ base: '100px', md: '200px' }} // Smaller size on small screens
        />
        <Image
          src={Site_QR}
          alt="Site QR"
          boxSize={{ base: '100px', md: '200px' }} // Smaller size on small screens
        />
      </Flex>
    </Box>
  );
};

export default IntroPageFour;
