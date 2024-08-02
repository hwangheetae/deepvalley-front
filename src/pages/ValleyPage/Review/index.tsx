import React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Avatar,
  HStack,
  VStack,
  Link,
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

  const handleWriteReview = () => {
    navigate('/reviewWriting', { state: { valley_id, thumbnail } });
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
            boxShadow="md"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <HStack spacing={6} display="inline-flex" justifyContent="center">
              {reviews.map((review) => (
                <Link key={review.review_id} href={`#${review.review_id}`}>
                  <Avatar size="md" src={review.profile_image_url ?? ''} />
                </Link>
              ))}
            </HStack>
          </Box>

          {reviews.map((review) => (
            <Box
              key={review.review_id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              mb={4}
              id={review.review_id}
            >
              <HStack spacing={4} mb={4}>
                <Avatar size="md" src={review.profile_image_url ?? ''} />
                <Text fontSize="lg" fontWeight="bold">
                  {review.member_id}
                </Text>
              </HStack>

              <Flex mb={4}>
                {review.image_urls.map((url, index) => (
                  <Image
                    key={index}
                    boxSize="150px"
                    src={url}
                    alt={`image${index + 1}`}
                    borderRadius="md"
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
          <Button colorScheme="green" width="100%" onClick={handleWriteReview}>
            리뷰작성하기
          </Button>
        </>
      )}
    </Box>
  );
};

export default Review;
