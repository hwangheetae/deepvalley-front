// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage';
import ImagePage from './pages/ImagePage';


import Review from './components/Common/Review/Review.tsx';
import { fetchReview } from './api/ReviewApi/ReviewApi.ts';
import { mockReview } from './api/ReviewApi/MockData.ts'; //테스트용
import Login from './pages/Auth/Login';
import theme from './theme'; // 추가된 라인
import PrivateRoute from './routes/PrivateRoute';
import Register from './pages/Auth/Register';
import MapPage from './pages/MapPage.tsx';

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};



const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',

    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },

  {
    path: '/imagepage',
    element: (
      <PrivateRoute>
        <ImagePage />
      </PrivateRoute>
    ),
  },
         { path: '/mappage', element: <MapPage /> },
  {
    path: '/login',
    element: <Login />,

    //EX: loader, errorElement 예시
    // 데이터 패칭 및 로더 가능
    // loader: rootLoader,

    //에러처리 페이지 ex)404
    // errorElement: <ErrorPage />
  },
  { path: '/register', element: <Register /> },
  {
    path: 'review/:reviewId',
    element: <Review />,
    loader: async ({ params }) => {
      const reviewId = params.reviewId as string;
      queryClient.setQueryData(['reviewType', 1], mockReview); //테스트용
      const data = mockReview;
      return data;
      // const data = await fetchReview(reviewId);
      // queryClient.setQueryData(['reviewType', reviewId],data);
      // return data;
    },
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
