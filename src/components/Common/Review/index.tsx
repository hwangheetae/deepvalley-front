import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Flex, Text, useToast, Button } from '@chakra-ui/react';
import ProfileImage from '../Image/ProfileImage';
import ReviewImage from '../Image/ReviewImage';
import { ReviewType } from '../../../types/ReviewType';
import { fetchReview } from '../../../api/Review/index';
import { useMe } from '../../../stores/meStore';
import 산잉 from '../../../assets/images/산잉.png';
import { Link } from 'react-router-dom';

import 'tailwindcss/tailwind.css';

interface ReviewProps {
  initialData: ReviewType;
  reviewId: string;
}

const Review: React.FC<ReviewProps> = ({ initialData, reviewId }) => {
  const toast = useToast();
  const { me } = useMe();

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
            <ProfileImage src={me.profile_image_url || 산잉} />
          </Box>
          <Box ml="4">
            <Text
              fontSize="24px"
              fontWeight="bold"
              fontFamily="Gmarket Sans TTF"
              color="black"
            >
              {me.name}
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
          <Button
            as={Link}
            to={`/valley/${data.place_id}/detail`}
            style={{
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
            size="md"
          >
            {data.valley_name}
          </Button>
        </Flex>
      </Flex>

      <Box mt={4}>
        {data.image_urls && data.image_urls.length > 0 && (
          <Flex overflowX="scroll" gap="4">
            {data.image_urls.map((url: string, index: number) => (
              <Box key={index} minW="300px">
                <ReviewImage src={url} />
              </Box>
            ))}
          </Flex>
        )}
      </Box>

      <Box mt="4">
        <Text fontSize="2xl" fontWeight="bold" fontFamily="Gmarket Sans TTF">
          {data.title}
        </Text>
        <Text mt="2" fontFamily="Gmarket Sans TTF" fontWeight="light">
          {data.content}
        </Text>
        {data.tag_names && data.tag_names.length > 0 && (
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
        )}
      </Box>
    </Box>
  );
};

export default Review;
