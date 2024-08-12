import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Avatar,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { ValleyDetailReviewType } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface ReviewProps {
  reviews: ValleyDetailReviewType[];
  valley_id: string;
  thumbnail: string;
}

const Review: React.FC<ReviewProps> = ({ reviews, valley_id, thumbnail }) => {
  const navigate = useNavigate();
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const handleWriteReview = () => {
    navigate('/reviewWriting', { state: { valley_id, thumbnail } });
  };

  const handleAvatarClick = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    const element = document.getElementById(reviewId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box p={4}>
      {reviews.length === 0 ? (
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            작성된 리뷰가 없습니다.
          </Text>
          <Text mb={4}>첫 번째 리뷰를 작성해보세요!</Text>
          <Button colorScheme="green" width="100%" onClick={handleWriteReview}>
            리뷰작성하기
          </Button>
        </Box>
      ) : (
        <>
          <Box
            mb={4}
            overflowX="auto"
            whiteSpace="nowrap"
            p={4}
            borderRadius="md"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              position: 'sticky',
              top: 0,
              backgroundColor: 'white',
              zIndex: 10,
            }}
          >
            <HStack spacing={6} justifyContent="flex-start">
              {reviews.map((review) => (
                <Box
                  key={review.review_id}
                  onClick={() => handleAvatarClick(review.review_id)}
                  cursor="pointer"
                >
                  <Avatar
                    size="md"
                    src={review.profile_image_url ?? ''}
                    borderWidth={
                      selectedReviewId === review.review_id ? '4px' : '0.5px'
                    }
                    borderColor={
                      selectedReviewId === review.review_id
                        ? 'green.500'
                        : 'gray.300'
                    }
                    transition="border-color 0.3s ease, transform 0.3s ease"
                    _hover={{
                      transform: 'scale(1.05)',
                      borderColor: 'green.500',
                    }}
                  />
                </Box>
              ))}
            </HStack>
          </Box>
          <Button
            colorScheme="green"
            width="100%"
            onClick={handleWriteReview}
            mb={4}
          >
            리뷰작성하기
          </Button>

          {reviews.map((review) => (
            <Box
              key={review.review_id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              mb={4}
              id={review.review_id}
              css={{
                scrollMarginTop: '140px',
              }}
            >
              <HStack spacing={4} mb={4}>
                <Avatar size="md" src={review.profile_image_url ?? ''} />
                <Text fontSize="lg" fontWeight="bold">
                  {review.member_id}
                </Text>
              </HStack>

              <Flex mb={4} overflowX="auto">
                {review.image_urls.map((url, index) => (
                  <Image
                    key={index}
                    boxSize="250px"
                    height="280px"
                    src={url}
                    alt={`image${index + 1}`}
                    mr={2}
                  />
                ))}
              </Flex>

              <VStack align="start" mb={4}>
                <Text fontSize="md" fontWeight="bold">
                  {review.title}
                </Text>
                <Text>{review.content}</Text>
              </VStack>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default Review;
