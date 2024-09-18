import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const IntroPageThree = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
      { threshold: 0.3 },
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);
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
