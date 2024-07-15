import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import Review from './components/Common/Review/Review';
import { fetchReview } from './api/ReviewApi/ReviewApi';
import { mockReview } from './api/ReviewApi/MockData'; //테스트용

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: 'review/:reviewId',
    element: <Review />,
    loader: async ({ params }) => {
      const reviewId = params.reviewId as string;
      const data = await fetchReview(reviewId);
      queryClient.setQueryData(['reviewType', reviewId], data);
      return data;
    }
  }
]);

const App: React.FC = () => {
  queryClient.setQueryData(['reviewType', 1], mockReview); //테스트용
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;