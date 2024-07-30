// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/global.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './pages/HomePage/index.tsx';
import { ChangePassword, ReviewPage } from './pages/index.tsx';
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
import ReviewWritingPage from './pages/ReviewWritingPage/index.tsx';
import ReviewFixpage from './pages/ReviewFixPage/index.tsx';
import { useMe } from './stores/meStore.ts';
import WithdrawalSuccessPage from './pages/MyPage/WithdrawalSuccessPage';

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
    path: 'review/:review_id',
    element: <ReviewPage />,
    loader: async ({ params }) => {
      const review_id = params.review_id as string;
      const data = await fetchReview(review_id);
      queryClient.setQueryData(['reviewDetail', review_id], data);
      return { reviewId: review_id, initialData: data };
    },
  },
  {
    path: 'myPage',
    element: <MyPage />,
    loader: async () => {
      const { me } = useMe.getState();
      const memberId = me.login_email;
      const reviewsData = await fetchReviews(memberId);
      queryClient.setQueryData(['reviews', memberId], reviewsData);
      return reviewsData;
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
    path: '/ChangePassword',
    element: (
      <PrivateRoute>
        <ChangePassword />
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
  {
    path: '/ChangeProfile',
    element: (
      <PrivateRoute>
        <ChangeProfile />
      </PrivateRoute>
    ),
  },
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
