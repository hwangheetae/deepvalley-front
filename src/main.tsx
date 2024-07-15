import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import TestPage from './TestPage.tsx';
import ImagePage from './pages/ImagePage';
import Review from './components/Common/Review/Review.tsx';
import { fetchReview } from './api/ReviewApi/ReviewApi.ts';
import { mockReview } from './api/ReviewApi/MockData.ts'; //테스트용

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({ breakpoints });

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/test',
        element: <TestPage />
      },
      {
        path: 'imagepage',
        element: <ImagePage />,
      },
      {
        path: 'review/:reviewId',
        element: <Review />,
        loader: async({ params }) => {
          const reviewId = params.reviewId as string;
          queryClient.setQueryData(['reviewType', 1], mockReview); //테스트용
          const data = mockReview;
          return data;
          // const data = await fetchReview(reviewId);
          // queryClient.setQueryData(['reviewType', reviewId],data);
          // return data;
        }
      }
    ],
    //EX: loader, errorElement 예시
    // 데이터 패칭 및 로더 가능
    // loader: rootLoader,

    //에러처리 페이지 ex)404
    // errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);