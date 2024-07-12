// routes/PrivateRoute/index.tsx
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';
import { useToast } from '@chakra-ui/react';
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
