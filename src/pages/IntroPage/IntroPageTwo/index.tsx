import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const IntroPageTwo = () => {
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
    <Box
      ref={sectionRef}
      as="section"
      h="100vh"
      bgGradient="linear(to-b, #ECFFF0, #FFFFFF)"
    >
      <Flex
        direction="column"
        justify="center"
        align="center"
        minH="100vh"
        textAlign="center"
        px={{ base: 4, md: 8 }}
      >
        <Text
          fontSize={'4xl'}
          as={motion.p}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'} // Animate when in view
          variants={textVariants}
        >
          계곡에 가고싶을 때, 어떤 계곡에 갈지 고민하신적 없으신가요?
          <br />
          <br />
          내 주변 계곡을 한눈에 조회하고, 다른 사람들의 리뷰를 확인하세요.
          <br /> <br />
          찾기 힘든 계곡 정보를 한눈에! 깊은산 골짜기와 함께해요.
          <br />
        </Text>
      </Flex>
    </Box>
  );
};

export default IntroPageTwo;
