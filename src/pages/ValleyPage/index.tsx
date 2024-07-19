import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from '@chakra-ui/react';
import Layout from '../../components/Common/Layout';
import Header from '../../components/Common/Header';
import Info from './Info';
import Review from './Review';
import Picture from './Picture';

const ValleyPage: React.FC = () => {
  return (
    <Layout>
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab>정보</Tab>
          <Tab>리뷰</Tab>
          <Tab>사진</Tab>
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
    </Layout>
  );
};

export default ValleyPage;
