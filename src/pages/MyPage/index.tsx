import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Flex,
  Text,
  useToast,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';
// import { useUserStore } from '주소'; //여기다가 유저데이터 store 넣으면 됨.
import Layout from '../../components/Common/Layout';
import InstaImage from '../../components/Common/Image/InstaImage';
import { fetchReviews } from '../../api/Review';
import { Link } from 'react-router-dom';
import { ReviewType } from '../../types/ReviewType';
import ProfileImage from '../../components/Common/Image/ProfileImage';
import valley1 from '../../../valley1.png';
import TapBar from '../../components/Common/TapBar';
import Header from '../../components/Common/Header';

const MyPage: React.FC = () => {
  const reviews = useLoaderData() as ReviewType[];

  const login_email = 'dlwoqls4280@naver.com';
  const nickname = '이재빈';
  const profile_image_url = valley1; // 사용할 이미지 URL

  const memberId = login_email;
  const toast = useToast();

  const { data, error, isLoading } = useQuery<ReviewType[]>({
    queryKey: ['reviews', memberId],
    queryFn: () => fetchReviews(memberId),
    initialData: reviews,
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    toast({
      title: 'Error fetching reviews',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return <Box>Error loading reviews...</Box>;
  }

  return (
    <Layout>
      <Header
        title="마이페이지"
        showMenuButton={true}
        showBorderBottom={false}
      />
      <Box p="4" pt="20" pb="20">
        <Flex alignItems="center" mb="4">
          <Box mb={4} marginBottom={4}>
            <ProfileImage src={profile_image_url} />
          </Box>
          <Box ml="4">
            <Text
              fontSize="24px"
              fontWeight="medium"
              fontFamily="Gmarket Sans TTF"
              color="black"
            >
              {nickname}님
            </Text>
            <Text
              fontSize="16px"
              fontWeight="light"
              fontFamily="Gmarket Sans TTF"
              color="black"
            >
              {login_email}
            </Text>
          </Box>
        </Flex>
        <Divider borderColor="#EFEFEF" my="4" borderWidth="1px" />
        <Text
          fontSize="20px"
          fontWeight="medium"
          fontFamily="Gmarket Sans TTF"
          color="black"
          mb="4"
        >
          최근 리뷰들
        </Text>
        <Box>
          {data && data.length > 0 && (
            <SimpleGrid columns={3} spacing={1}>
              {data.map((review) => (
                <Link to={`/review/${review.review_id}`} key={review.review_id}>
                  <Box mb="4">
                    <Box
                      width="100%"
                      position="relative"
                      mb="4"
                      boxShadow="inset 0px 0px 10px rgba(0, 0, 0, 0.25)"
                    >
                      <InstaImage src={review.image_urls[0]} />
                      {/* 대표 사진만 표시 */}
                      <Box
                        position="absolute"
                        top="4px"
                        left="4px"
                        color="white"
                      >
                        <Text
                          fontSize="20px"
                          fontWeight="bold"
                          fontFamily="Gmarket Sans TTF"
                        >
                          {review.title}
                        </Text>
                      </Box>
                      <Box
                        position="absolute"
                        bottom="4px"
                        left="4px"
                        color="white"
                      >
                        <Text
                          fontSize="10px"
                          fontWeight="light"
                          fontFamily="Gmarket Sans TTF"
                        >
                          {review.valley_name}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Box>
      <TapBar />
    </Layout>
  );
};

export default MyPage;
