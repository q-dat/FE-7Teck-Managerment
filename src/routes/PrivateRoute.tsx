import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';
import { LoadingLocal } from '../components/orther/loading';

const PrivateRoute = ({
  children,
  requiredRole
}: {
  children: JSX.Element;
  requiredRole: string;
}) => {
  const { user, token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <LoadingLocal/>;
  }

  if (user.role !== requiredRole) {
    return <Navigate to="*" replace />;
  }

  return children;
};

export default PrivateRoute;
