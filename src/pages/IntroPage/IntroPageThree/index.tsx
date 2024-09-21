import { Box, Flex, Text, Heading, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Map_Example from '../../../assets/images/Map_Example.webp';

const IntroPageThree = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5, // Delay to make the image appear after the text
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }, // Trigger when 50% of the section is visible
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <Box as="section" h="100vh" ref={sectionRef}>
      <Flex
        direction="row"
        justify="space-around"
        align="center"
        minH="100vh"
        textAlign="left"
        px={{ base: 4, md: 8 }}
      >
        <Flex
          direction="column"
          justify="center"
          minH="100vh"
          px={{ base: 4, md: 8 }}
        >
          <Heading
            as={motion.h1}
            fontSize={{ base: 'xl', md: '3xl' }}
            mb={8}
            letterSpacing="wider"
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={textVariants}
          >
            지도에서 탐색하기
          </Heading>
          <Text
            fontSize={{ base: 'xm', md: 'xl' }}
            as={motion.p}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            variants={textVariants}
            maxW={{ base: '100%', md: '80%', lg: '60%' }} // Responsive max width for text
            wordBreak="break-word" // Ensures long words break correctly
            whiteSpace="normal" // Allows wrapping of lines
          >
            지도를 움직여 자신이 원하는 계곡을 탐색하세요!
            <br /> 계곡의 정확한 위치와 주차장, 혹시나 다쳤을 때를 대비해 병원의
            위치를 확인할 수 있어요
          </Text>
        </Flex>
        <Image
          as={motion.img}
          src={Map_Example}
          alt="Map_Example"
          height={{ md: '500px', base: '300px' }}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={imageVariants}
        />
      </Flex>
    </Box>
  );
};

export default IntroPageThree;
