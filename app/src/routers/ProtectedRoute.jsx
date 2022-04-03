import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isAuthenticate, children }) => {
  if (!isAuthenticate) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
