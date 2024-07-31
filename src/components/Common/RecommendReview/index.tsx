import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Box, Image, Text, VStack } from '@chakra-ui/react';
const noOfCards = 1;
const chevronWidth = 40;
const carouselItems = [
  {
    imageUrl: '../../../../valley1.png',
    title: '추암계곡',
    location: '경기도 성남시 판교면 11-1',
    hashtag: ['#굳', '#좋아요'],
  },
  {
    imageUrl: '../../../../valley1.png',
    title: '구름계곡',
    location: '서울특별시 도봉구 방학동',
    hashtag: ['#음', '#별로네요'],
  },
];
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

const RecommendReview: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
    <VStack align="start" spacing={4} p={4} m={2}>
      <Text fontSize="xl" fontWeight="bold">
        오늘의 추천 계곡
      </Text>
      <Box position="relative" width="100%">
        <ItemsCarousel
          infiniteLoop
          gutter={0}
          activePosition={'center'}
          disableSwipe={false}
          alwaysShowChevrons={false}
          numberOfCards={noOfCards}
          activeItemIndex={activeItemIndex}
          outsideChevron={false}
          showSlither={true}
          requestToChangeActive={setActiveItemIndex}
          chevronWidth={chevronWidth}
        >
          {carouselItems.map((item, index) => (
            <Box
              key={index}
              position="relative"
              boxShadow=""
              borderRadius="lg"
              overflow="hidden"
              height="34vh"
              backgroundColor={'white'}
              p={2}
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                style={{ height: '90%', width: '100%', objectFit: 'cover' }}
              />
              <Box
                position="absolute"
                bottom="40px"
                width={'95%'}
                height={'20%'}
                bg="rgba(0, 0, 0, 0.6)"
                color="white"
                p={2}
                borderRadius="md"
              >
                <Text fontSize="lg" fontWeight="bold">
                  {item.title}
                </Text>
                <Text fontSize="sm">{item.location}</Text>
              </Box>
              <Text p={4} fontSize="sm" color="teal.500">
                {item.hashtag.join(' ')}
              </Text>
              <Box p={4}></Box>
            </Box>
          ))}
        </ItemsCarousel>
      </Box>
    </VStack>
  );
};

export default RecommendReview;
