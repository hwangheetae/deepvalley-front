import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import ProfileImage from '../Image/ProfileImage';
import ReviewImage from '../Image/ReviewImage';
import CustomButton from '../CustomButton';
import { ReviewType } from '../../../types/ReviewType/ReviewType';
import { fetchReview } from '../../../api/ReviewApi/ReviewApi';
import valley1 from '../../../../valley1.png';

// import { useUserStore } from '../../../stores/userStore'; // 추후 구현
// 여기서 user이름이랑 프로필 사진 받아와야함
import 'tailwindcss/tailwind.css';

interface ReviewProps {
  initialData: ReviewType;
  reviewId: string;
}

const Review: React.FC<ReviewProps> = ({ initialData, reviewId }) => {
  const toast = useToast();
  // const username = useUserStore((state) => state.username); // 추후 구현

  const { data, error, isLoading } = useQuery<ReviewType>({
    queryKey: ['reviewDetail', reviewId],
    queryFn: () => fetchReview(reviewId),
    initialData,
  });

  console.log('Data:', data);
  console.log('Error', error);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    toast({
      title: 'Error fetching review details',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return <Box>Error loading data...</Box>;
  }

  if (!data) {
    return <Box>No review found</Box>;
  }

  return (
    <Box p="4">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Box mb={4}>
            <ProfileImage src={valley1} />
          </Box>
          <Box ml="4">
            <Text
              fontSize="24px"
              fontWeight="bold"
              fontFamily="Gmarket Sans TTF"
              color="black"
            >
              김구름
            </Text>
            <Text
              fontSize="10px"
              fontWeight="light"
              fontFamily="Gmarket Sans TTF"
              color="black"
              mt="-2"
            >
              {data.visited_date}
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <CustomButton
            ButtonStyle={{
              background: 'white',
              color: 'black',
              borderRadius: '28px',
              border: '1px solid black',
              fontFamily: 'Gmarket Sans TTF',
              fontWeight: 'medium',
              width: '100px',
              height: '30px',
              fontSize: '10px',
            }}
            onClick={() => {}}
            size="md"
          >
            {data.valley_name}
          </CustomButton>
        </Flex>
      </Flex>

      <Box mt={4}>
        <Flex overflowX="scroll" gap="4">
          {data.image_urls.map((url: string, index: number) => (
            <Box key={index} minW="300px">
              <ReviewImage src={url} />
            </Box>
          ))}
        </Flex>
      </Box>

      <Box mt="4">
        <Text fontSize="2xl" fontWeight="bold" fontFamily="Gmarket Sans TTF">
          {data.title}
        </Text>
        <Text mt="2" fontFamily="Gmarket Sans TTF" fontWeight="light">
          {data.content}
        </Text>
        <Flex mt="2">
          {data.tag_names.map((tag: string, index: number) => (
            <Text
              key={index}
              className="mr-2"
              fontFamily="Gmarket Sans TTF"
              fontWeight="light"
              color="#1E4C28"
            >
              #{tag}
            </Text>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Review;
