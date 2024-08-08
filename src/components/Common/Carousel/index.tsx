import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Flex, Image, Box, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchBannerImage } from '../../../api/Review';
import 산잉_슬픈 from '../../../assets/images/산잉_슬픈.png';
import { wrapperStyle, slideItemStyle } from '../../../styles/carouselStyle';

const noOfItems = 5;
const noOfCards = 1;
const autoPlayDelay = 5000;

const CarouselComponent: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const { isPending, isError, data } = useQuery({
    queryKey: ['Banner'],
    queryFn: fetchBannerImage,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItemIndex(
        (prevIndex) => (prevIndex + 1) % (noOfItems - noOfCards + 1),
      );
    }, autoPlayDelay);
    return () => clearInterval(interval);
  }, []);

  const onChange = (value: number) => setActiveItemIndex(value);
  const imageArray = data?.data.image_urls;
  const carouselItems = imageArray?.map((item: string, index: number) => (
    <Flex align={'center'} justify={'center'} key={index}>
      <Image style={slideItemStyle} src={item} alt={`banner-${index}`} />
    </Flex>
  ));

  if (isError) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="40vh"
        p={5}
      >
        <Image src={산잉_슬픈} alt="슬픈 이미지" boxSize="100px" />
        <Box textAlign="center" py={6} px={2}>
          <Text color={'gray.500'} mb={6}>
            현재 컨텐츠를 이용할 수 없어요!
          </Text>
        </Box>
      </Flex>
    );
  }

  if (isPending) {
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
  }

  return (
    <div style={wrapperStyle}>
      <ItemsCarousel
        infiniteLoop={true}
        gutter={12}
        activePosition={'center'}
        disableSwipe={false}
        alwaysShowChevrons={false}
        numberOfCards={1}
        slidesToScroll={1}
        outsideChevron={false}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={onChange}
        children={carouselItems}
      />
    </div>
  );
};

export default React.memo(CarouselComponent);
