import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
import { wrapperStyle, slideItemStyle } from '../../../styles/carouselStyle';
import { useQuery } from '@tanstack/react-query';
import { fetchBannerImage } from '../../../api/Review';
// import axios from 'axios';
const noOfItems = 5;
const noOfCards = 1;
const autoPlayDelay = 5000;

const CarouselComponent: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // const { isPending, isError, data, error } = useQuery({
  //   queryKey: ['Banner'],
  //   queryFn: fetchBannerImage,
  // });

  // const fetchedImage = data?.data;
  const carouselItems = '';
  // const carouselItems = range(noOfItems).map((index) => (
  //   <img key={index} style={slideItemStyle} src={fetchedImage[index]} />
  // ));
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItemIndex(
        (prevIndex) => (prevIndex + 1) % (noOfItems - noOfCards + 1),
      );
    }, autoPlayDelay);
    return () => clearInterval(interval);
  }, []);

  const onChange = (value: number) => setActiveItemIndex(value);

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
        showSlither={true}
        firstAndLastGutter={true}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={onChange}
        children={carouselItems}
      />
    </div>
  );
};

export default CarouselComponent;
