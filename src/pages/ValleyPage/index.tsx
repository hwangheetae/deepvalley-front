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
  Flex,
  HStack,
} from '@chakra-ui/react';
import Layout from '../../components/Common/Layout';
import Header from '../../components/Common/Header';
import Info from './Info';
import Review from './Review';
import Picture from './Picture';

const ValleyPage: React.FC = () => {
  return (
    <Layout>
      <Header
        title="계곡 정보"
        showMenuButton={true}
        showBorderBottom={false}
      />
      <Box mt="78px" w="full">
        <HStack spacing={4} justify="center" mb={4}>
          <Button colorScheme="green">길 찾기</Button>
          <Button colorScheme="green">지도 보기</Button>
        </HStack>
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
                <Info />
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
