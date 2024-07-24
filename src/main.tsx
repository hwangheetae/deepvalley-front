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
import ReviewPage from './pages/ReviewPage.tsx';
import { fetchReview } from './api/ReviewApi/ReviewApi.ts';
import { fetchReviews } from './api/ReviewsApi/ReviewsApi.ts';
import MyPage from './pages/MyPage.tsx';
import Login from './pages/Auth/Login';
import theme from './theme'; // 추가된 라인
import PrivateRoute from './routes/PrivateRoute';
import Register from './pages/Auth/Register';
import MapPage from './pages/MapPage';
import ReviewWritingPage from './pages/ReviewWritingPage.tsx';
import ReviewFixpage from './pages/ReviewFixPage.tsx';
import { updateReview } from './api/ReviewUpdateApi/ReviewUpdateApi.ts';

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
  {
    path: 'review/:reviewId',
    element: <ReviewPage />,
    loader: async ({ params }) => {
      // const reviewId = params.reviewId as string;
      const reviewId = '834f2871-6cce-4c3a-9744-dede59d38be8';
      const data = await fetchReview(reviewId);
      queryClient.setQueryData(['reviewDetail', reviewId], data);
      return { reviewId, initialData: data };
    },
  },
  {
    path: 'myPage',
    element: <MyPage />,
    loader: async () => {
      const memberId = '실제 memberId 기입';
      const reviews = await fetchReviews(memberId);
      queryClient.setQueryData(['reviews', memberId], reviews);
      return reviews;
    },
  },
  { path: '/register', element: <Register /> },
  {
    path: 'reviewWriting',
    element: (
      <PrivateRoute>
        <ReviewWritingPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/reviewUpdate/:reviewId',
    element: <ReviewFixpage />,
    loader: async ({ params }) => {
      const { reviewId } = params;
      if (!reviewId) throw new Error('Review ID is required');
      const review = await fetchReview(reviewId);
      return { review, reviewId };
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
