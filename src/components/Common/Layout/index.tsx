// Layout.tsx
import React, { FC } from 'react';
import { LayoutProps } from '../../../types/ComponentType';
import { Box } from '@chakra-ui/react';
import MainPageHeader from '../MainPageHeader';
const Layout: FC<LayoutProps> = ({
  children,
  hasHeader = false,
  hasTapBar = false,
  showMenuButton = false,
}: LayoutProps) => {
  const headerHeight = 73; // 헤더의 높이
  const tapBarHeight = 73; // TapBar의 높이
  return (
    <Box
      maxW="430px" // iPhone 14 Pro Max 기준 너비
      h="100vh"
      mx="auto"
      position="relative"
      overflow="hidden"
    >
      {hasHeader && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          height={`${headerHeight}px`}
          zIndex={1000}
        >
          <MainPageHeader
            title="깊은산 골짜기"
            fontFamily="Cafe24Ssurround"
            showMenuButton={showMenuButton}
          />
        </Box>
      )}
      <Box
        as="main"
        position="absolute"
        top={hasHeader ? `${headerHeight}px` : 0}
        bottom={hasTapBar ? `${tapBarHeight}px` : 0}
        left={0}
        right={0}
        overflowY="auto"
      >
        {children}
      </Box>
      {hasTapBar && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          zIndex={1000}
        ></Box>
      )}
    </Box>
  );
};

export default React.memo(Layout);
