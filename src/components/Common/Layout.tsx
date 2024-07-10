import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      maxW="428px" // iPhone 14 Pro Max 기준 너비
      mx="auto" // 중앙 정렬
      p={4} // 패딩 설정
      border="1px"
      borderColor="gray.200"
    >
      {children}
    </Box>
  );
};

export default Layout;
