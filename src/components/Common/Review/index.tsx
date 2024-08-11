import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Flex,
  Text,
  useToast,
  Button,
  Icon,
  Image,
} from '@chakra-ui/react';
import ProfileImage from '../Image/ProfileImage';
import { ReviewType } from '../../../types/ReviewType';
import { fetchReview } from '../../../api/Review/index';
import { useMe } from '../../../stores/meStore';
import 산잉 from '../../../assets/images/산잉.png';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

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
    <Box>
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <Box>
            <ProfileImage
              src={me.profile_image_url || 산잉}
              width="50px"
              height="50px"
            />
          </Box>
          <Box mt={2}>
            <Text
              fontSize="20px"
              fontWeight="bold"
              fontFamily="Gmarket Sans TTF"
              color="black"
            >
              {me.name}
            </Text>
            <Text
              mt={-2}
              ml={0.5}
              fontSize="10px"
              fontWeight="light"
              fontFamily="Gmarket Sans TTF"
              color="black"
            >
              {data.visited_date}
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center" mt={2}>
          <Button
            as={Link}
            to={`/valley/${data.place_id}/detail`}
            style={{
              background: 'white',
              color: 'black',
              borderRadius: '28px',
              border: '0.5px solid black',
              fontFamily: 'Gmarket Sans TTF',
              fontWeight: 'medium',
              width: '80px',
              height: '20px',
              fontSize: '10px',
            }}
            size="md"
          >
            <Icon as={MdLocationOn} mr={0.5} color={'black'} />
            {data.valley_name}
          </Button>
        </Flex>
      </Flex>

      <Box mt={4} ml={-4}>
        {data.image_urls && data.image_urls.length > 0 && (
          <Flex overflowX="scroll" gap="2">
            {data.image_urls.map((url: string, index: number) => (
              <Box key={index} minW="300px">
                <Box
                  width="100%"
                  backgroundSize="cover"
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  height="350"
                  mb="10px"
                  boxShadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
                >
                  <Image
                    src={url}
                    objectFit="contain"
                    width="100%"
                    height="100%"
                    maxWidth="300px"
                    maxHeight="300px"
                  />
                </Box>
              </Box>
            ))}
          </Flex>
        )}
      </Box>

      <Box mt="4">
        <Text fontSize="20px" fontWeight="bold" fontFamily="Gmarket Sans TTF">
          {data.title}
        </Text>
        <Text
          mt="2"
          fontSize="15px"
          fontFamily="Gmarket Sans TTF"
          fontWeight="light"
        >
          {data.content}
        </Text>
        {data.tag_names && data.tag_names.length > 0 && (
          <Flex mt="2" wrap="wrap">
            {data.tag_names.map((tag: string, index: number) => (
              <Text
                key={index}
                className="mr-2"
                fontFamily="Gmarket Sans TTF"
                fontWeight="light"
                fontSize="15px"
                color="#00430F"
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
