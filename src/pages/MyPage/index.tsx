import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Flex,
  Text,
  useToast,
  SimpleGrid,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { useMe } from '../../stores/meStore';
import Layout from '../../components/Common/Layout';
import InstaImage from '../../components/Common/Image/InstaImage';
import { fetchReviews } from '../../api/Review';
import { Link } from 'react-router-dom';
import { ReviewType } from '../../types/ReviewType';
import ProfileImage from '../../components/Common/Image/ProfileImage';
import TapBar from '../../components/Common/TapBar';
import Header from '../../components/Common/Header';
import 산잉 from '../../assets/images/산잉.png';
import { MdLocationOn } from 'react-icons/md';

const DEFAULT_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvQNXE66kR9nlnWK3Lv_ZBsMYJYDpiqs7eyVw_tZFY2OZpaNU0vTSpLVhNfTGNdoOxOVk&usqp=CAU';

const MyPage: React.FC = () => {
  const { me } = useMe();
  const reviewsData = useLoaderData() as { reviews: ReviewType[] };

  const login_email = me.login_email;
  const nickname = me.name;
  const profile_image_url = me.profile_image_url;

  const toast = useToast();

  const { data, error, isLoading } = useQuery<{ reviews: ReviewType[] }>({
    queryKey: ['reviews', login_email],
    queryFn: () => fetchReviews(login_email),
    initialData: reviewsData,
  });

  console.log('data:', data);
  console.log('error:', error);

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

  const reviews = data?.reviews || [];

  const sortedReviews = [...reviews].reverse();

  return (
    <Layout>
      <Header
        title="마이페이지"
        showMenuButton={true}
        showBorderBottom={false}
      />
      <Box p="4" pt="20" pb="20">
        <Flex alignItems="center" mb="4">
          <Box>
            <ProfileImage
              src={profile_image_url || 산잉}
              width="80px"
              height="80px"
            />
          </Box>
          <Box mt={2}>
            <Text
              fontSize="24px"
              fontWeight="medium"
              fontFamily="Gmarket Sans TTF"
              color="black"
            >
              {nickname}님
            </Text>
            <Text
              mt={-2}
              ml={0.5}
              fontSize="15px"
              fontWeight="light"
              fontFamily="Gmarket Sans TTF"
              color="black"
            >
              {login_email}
            </Text>
          </Box>
        </Flex>
        <Divider
          borderColor="#EFEFEF"
          my="4"
          borderWidth="1px"
          width="107.5%"
          ml={-4}
        />
        <Text
          fontSize="15px"
          fontWeight="medium"
          fontFamily="Gmarket Sans TTF"
          color="black"
          mb="2"
          mt={5}
        >
          최근 리뷰들
        </Text>
        <Box width="108%" ml={-4}>
          <SimpleGrid columns={3} spacing={1}>
            {sortedReviews.map((review) => (
              <Link to={`/review/${review.review_id}`} key={review.review_id}>
                <Box mb="0.2">
                  <Box width="100%" position="relative">
                    <InstaImage
                      src={
                        review.image_urls.length > 0
                          ? review.image_urls[0]
                          : DEFAULT_IMAGE_URL
                      }
                    />
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      width="100%"
                      height="100%"
                      boxShadow="inset 0px 0px 10px 5px rgba(0, 0, 0, 0.25)"
                    />

                    {/* <Box
                    width="140.61px"
                    height="140.61px"
                    position="relative"
                    boxShadow="inset 0px 0px 50px rgba(0, 0, 0, 0.25)"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    overflow="hidden"
                  >
                    <Image
                      src={
                        review.image_urls.length > 0
                          ? review.image_urls[0]
                          : DEFAULT_IMAGE_URL
                      }
                      objectFit="contain"
                      width="100%"
                      height="100%"
                    /> */}
                    <Box
                      position="absolute"
                      top="5px"
                      left="10px"
                      right="10px"
                      color="white"
                    >
                      <Text
                        fontSize="15px"
                        fontWeight="bold"
                        fontFamily="Gmarket Sans TTF"
                        style={{ WebkitTextStroke: '0.5px black' }}
                      >
                        {review.title}
                      </Text>
                    </Box>
                    <Box
                      position="absolute"
                      bottom="4px"
                      left="5px"
                      color="white"
                    >
                      <Text
                        fontSize="11px"
                        fontWeight="bold"
                        fontFamily="Gmarket Sans TTF"
                        style={{ WebkitTextStroke: '0.5px black' }}
                      >
                        <Icon
                          as={MdLocationOn}
                          mb={0.5}
                          mr={0.5}
                          color={'black'}
                        />
                        {review.valley_name}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
      <TapBar />
    </Layout>
  );
};

export default MyPage;
