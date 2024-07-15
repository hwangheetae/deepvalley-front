import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Flex, Text, Tag, useToast } from '@chakra-ui/react';
import ProfileImage from '../Image/ProfileImage';
import ReviewImage from '../Image/ReviewImage';
import CustomButton from '../CustomButton';
import { ReviewType } from '../../../types/ReviewType/ReviewType';
import { fetchReview } from '../../../api/ReviewApi/ReviewApi';
import valley1 from '../../../../valley1.png';

// import { useUserStore } from '../../../stores/userStore'; // 추후 구현
// 여기서 user이름이랑 프로필 사진 받아와야함
import 'tailwindcss/tailwind.css';

const Review: React.FC = () => {
  const initialData = useLoaderData() as ReviewType;
  const { review_id: reviewId } = initialData;
  const toast = useToast();
  // const username = useUserStore((state) => state.username); // 추후 구현

  const { data, error, isLoading } = useQuery<ReviewType>({
    queryKey: ['reviewType', reviewId],
    queryFn: () => fetchReview(reviewId),
    initialData,
    refetchOnWindowFocus: false,
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
    <Box className="p-4">
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          {/* <ProfileImage src={data.profile_image} /> */}
          <ProfileImage src={valley1} />
          <Box ml="4">
            {/* <Text>{username}</Text>  */}
            <Text>김구름</Text>
            <Text>{data.visited_date}</Text>
          </Box>
        </Flex>
        <CustomButton onClick={() => {}} value={data.valley_name} size="md" />
      </Flex>

      <Box className="mt-4">
        <Flex overflowX="scroll">
          {data.image_urls.map((url: string, index: number) => (
            <ReviewImage key={index} src={url} />
          ))}
        </Flex>
      </Box>

      <Box className="mt-4">
        <Text fontSize="2xl" fontWeight="bold">
          {data.title}
        </Text>
        <Text mt="2">{data.content}</Text>
        <Flex mt="2">
          {data.tag_names.map((tag: string, index: number) => (
            <Tag key={index} className="mr-2">
              {tag}
            </Tag>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Review;
