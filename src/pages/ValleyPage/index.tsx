import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Box,
  Button,
  Divider,
  HStack,
  VStack,
  Text,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Layout from '../../components/Common/Layout';
import Header from '../../components/Common/Header';
import Info from './Info';
import Review from './Review';
import Picture from './Picture';
import { useLoaderData } from 'react-router-dom';
import { ValleyDetailType } from '../../types';

const ValleyPage: React.FC = () => {
  const { valley } = useLoaderData() as { valley: ValleyDetailType };

  const findRoute = () =>
    window.open(
      `https://map.kakao.com/link/to/${valley.name},${valley.latitude},${valley.longitude}`,
    );

  return (
    <Layout>
      <Header
        title="계곡 정보"
        showMenuButton={true}
        showBorderBottom={false}
      />
      <Box mt="78px" w="full">
        <VStack spacing={4} align="flex-start" mb={4} px={4}>
          <HStack>
            <Text fontSize="2xl" fontWeight="bold">
              {valley.name}
            </Text>
            <HStack spacing={1} align="center">
              <StarIcon color="yellow.400" />
              <Text fontSize="lg" fontWeight="bold">
                {valley.avg_rating}
              </Text>
            </HStack>
          </HStack>
          <HStack spacing={4} w="full">
            <Button
              colorScheme="green"
              borderRadius="full"
              flex="1"
              maxW="200px"
              onClick={findRoute}
            >
              길 찾기
            </Button>
            <Button
              colorScheme="green"
              variant="outline"
              borderRadius="full"
              flex="1"
              maxW="200px"
            >
              지도 보기
            </Button>
          </HStack>
        </VStack>
        <Divider mb={4} />
        <Box mt="4">
          <Tabs position="relative" variant="unstyled" align="center">
            <TabList>
              <Tab flex="1" textAlign="center">
                정보
              </Tab>
              <Tab flex="1" textAlign="center">
                리뷰
              </Tab>
              <Tab flex="1" textAlign="center">
                사진
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
            <TabPanels>
              <TabPanel>
                <Info valley={valley} />
              </TabPanel>
              <TabPanel>
                <Review />
              </TabPanel>
              <TabPanel>
                <Picture />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Layout>
  );
};

export default ValleyPage;
