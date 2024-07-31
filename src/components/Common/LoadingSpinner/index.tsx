import React from 'react';
import { Layout } from '..';
import '../../../styles/LoadingSpinner.css';
import 산잉 from '../../../assets/images/산잉.png';
import 바다잉 from '../../../assets/images/바다잉.png';
import 계곡잉 from '../../../assets/images/계곡잉.png';
import { Text } from '@chakra-ui/react';
const LoadingSpinner: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex items-center space-x-4 mb-4">
          <img src={산잉} alt="산잉" className="dot animate-jump1 w-16 h-16" />
          <img
            src={계곡잉}
            alt="계곡잉"
            className="dot animate-jump2 w-16 h-16"
          />
          <img
            src={바다잉}
            alt="바다잉"
            className="dot animate-jump3 w-16 h-16"
          />
        </div>
        <Text className="text-center text-2xl ">로딩중!</Text>
      </div>
    </Layout>
  );
};

export default LoadingSpinner;
