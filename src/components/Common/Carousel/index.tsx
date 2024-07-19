import React, { useState, useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
// import axios from 'axios';
const noOfItems = 5;
const noOfCards = 1;
const autoPlayDelay = 5000;

const wrapperStyle = {
  padding: '0px',
  maxWidth: 400,
  margin: '0 auto',
};

const slideItemStyle = {
  height: '13vh',
  width: 'full',
  background: '#eee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 'bold',
  transition: 'transform 0.5s ease-in-out',
};

const carouselItems = range(noOfItems).map((index) => (
  <div key={index} style={slideItemStyle}>
    {index + 1}
  </div>
));

const CarouselComponent: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  // const [carouselItems, setCarouselItems] = useState<React.ReactNode[]>([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('backend end point');
  //     const data = response.data;
  //     const items = data.map((item: any, index: number) => (
  //       <div key={index} style={slideItemStyle}>
  //         {item.name}
  //       </div>
  //     ));
  //     setCarouselItems(items);
  //   } catch (error) {
  //     console.log('Error fetching data', error);
  //   }
  // };

  useEffect(() => {
    // fetchData();
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
