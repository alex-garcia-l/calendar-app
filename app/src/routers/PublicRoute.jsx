import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticate, children }) => {
  console.log(isAuthenticate);
  if (isAuthenticate) {
    return <Navigate to="/" replace />;
  }

  return children;
};
