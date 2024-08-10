import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Flex, Image } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchBannerImage } from '../../../api/Review';
import { wrapperStyle, slideItemStyle } from '../../../styles/carouselStyle';
import ErrorComponent from '../ErrorComponent';
import LoadingComponent from '../LoadingComponent';

const noOfItems = 5;
const noOfCards = 1;
const autoPlayDelay = 5000;
const chevronWidth = 40;

const CarouselComponent: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  //fetching
  const { isPending, isError, data } = useQuery({
    queryKey: ['Banner'],
    queryFn: fetchBannerImage,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  // 자동 넘어가기
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

  //에러처리
  if (isError) {
    return <ErrorComponent />;
  }
  //로딩처리
  if (isPending) {
    return <LoadingComponent />;
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
        chevronWidth={chevronWidth}
        rightChevron
        leftChevron
      >
        {carouselItems}
      </ItemsCarousel>
    </div>
  );
};

export default React.memo(CarouselComponent);
