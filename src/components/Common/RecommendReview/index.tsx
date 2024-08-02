import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Box, Image, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';
const noOfCards = 1;
const chevronWidth = 40;
const carouselItems = [
  {
    place_id: 'asdfqwer1234',
    image_url: '../../../../valley1.png',
    valley_name: '추암계곡',
    address: '경기도 성남시 판교면 11-1',
    tag_names: ['#굳', '#좋아요'],
  },
  {
    place_id: 'zzxcvasdfqwer',
    image_url: '../../../../valley1.png',
    valley_name: '구름계곡',
    address: '지성특별시 도봉구 방학동',
    tag_names: ['#음', '#별로네요'],
  },
  {
    place_id: 'qwer123zxv',
    image_url: '../../../../valley1.png',
    valley_name: '바보계곡',
    address: '제주특별시 안남구 기성동',
    tag_names: ['#히히', '#으엑'],
  },
  {
    place_id: 'iyuutyudfsawf',
    image_url: '../../../../valley1.png',
    valley_name: '돼지계곡',
    address: '서울특별시 오사카구 교토동',
    tag_names: ['#좋아요', '#소통해요'],
  },
  {
    place_id: 'gfhgfsdaqqe',
    image_url: '../../../../valley1.png',
    valley_name: '해삼계곡',
    address: '서울특별시 나성구 실콘동',
    tag_names: ['#맞팔', '#깊골중'],
  },
];

// interface RecommendReviewInterface {
//   place_id: string;
//   image_url: string;
//   valley_name: string;
//   address: string;
//   tag_names: string[];
// }
const RecommendReview: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  // const fetchRecommendValley = async (): Promise<
  //   RecommendReviewInterface[]
  // > => {
  //   // 실제 API 호출로 대체 필요
  //   const response = await fetch('/api/recommendations');
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const data = await response.json();
  //   return data as RecommendReviewInterface[]; // 반환 타입 명시
  // };

  // const {
  //   isLoading,
  //   isError,
  //   data: carouselItems,
  //   error,
  // } = useQuery<RecommendReviewInterface[], Error>({
  //   queryKey: ['recommendReview'],
  //   queryFn: fetchRecommendValley,
  // });

  // if (isLoading) {
  //   <Spinner
  //     thickness="4px"
  //     speed="0.65s"
  //     emptyColor="gray.200"
  //     color="teal.500"
  //     size="xl"
  //   />;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

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
          {/* isLoading */}
          {false
            ? []
            : carouselItems?.map((item, index) => (
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
                    src={item.image_url}
                    alt={item.valley_name}
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
                      {item.valley_name}
                    </Text>
                    <Text fontSize="sm">{item.address}</Text>
                  </Box>
                  <Text p={3} fontSize="sm" color="teal.500">
                    {item.tag_names.join(' ')}
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
