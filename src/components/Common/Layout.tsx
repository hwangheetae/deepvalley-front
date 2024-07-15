import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from './Header';
import TapBar from './TapBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const headerHeight = 73; // 헤더의 높이
  const tapBarHeight = 73; // TapBar의 높이
  return (
    <Box
      maxW="430px" // iPhone 14 Pro Max 기준 너비
      mx="auto" // 중앙 정렬
      p={0} // 패딩 설정
      h="100vh"
      border="1px"
      borderColor="gray.200"
      pt={`${headerHeight}px`} // 헤더 높이만큼 패딩
      pb={`${tapBarHeight}px`} // TapBar 높이만큼 패딩
    >
      <Header
        title={'testpage'}
        showBorderBottom={true}
        showMenuButton={true}
      />
      {children}
      <TapBar />
    </Box>
  );
};

export default Layout;
