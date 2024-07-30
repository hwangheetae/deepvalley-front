// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage/index.tsx';

import { ChangePassword, ImageUploadTest, ReviewPage } from './pages/index.tsx';
import { fetchReview } from './api/Review/index.ts';
import { fetchReviews } from './api/Review/index.ts';
import MyPage from './pages/MyPage/index.tsx';
import Login from './pages/Auth/Login';
import theme from './theme'; // 추가된 라인
import PrivateRoute from './routes/PrivateRoute';
import Register from './pages/Auth/Register';
import SocialKakaoRedirectPage from './pages/Auth/SocialLogin/KaKao/SocialKakaoRedirectPage/index.tsx';
import MapPage from './pages/Map/MapPage/index.tsx';
import Logout from './pages/Auth/Logout/index.tsx';
import { ChangeProfile } from './pages/index.tsx';
import WithdrawalSuccessPage from './pages/MyPage/WithdrawalSuccessPage';
import ReviewWritingPage from './pages/ReviewWritingPage/index.tsx';
import ReviewFixpage from './pages/ReviewFixPage/index.tsx';
import ValleyPage from './pages/ValleyPage';

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
  { path: '/auth', element: <SocialKakaoRedirectPage /> },
  { path: '/register', element: <Register /> },
  { path: '/logout', element: <Logout /> },

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
  { path: '/logout', element: <Logout /> },
  { path: '/ChangePassword', element: <ChangePassword /> },
  { path: '/ChangeProfile', element: <ChangeProfile /> },
  { path: '/ImageUploadTest', element: <ImageUploadTest /> },

  { path: '/ValleyPage', element: <ValleyPage /> },
        {
    path: '/WithdrawalSuccessPage',
    element: (
      <PrivateRoute>
        <WithdrawalSuccessPage />
      </PrivateRoute>
    ),
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
