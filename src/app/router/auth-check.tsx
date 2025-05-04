import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { $currentUser } from '../../entities/users';

interface AuthCheckProps {
    children: React.ReactNode;
}

export const AuthCheck = (props: AuthCheckProps): React.ReactElement => {
  const { children } = props;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    $currentUser.watch((user) => {
      if (!user && location.pathname !== '/') {
        navigate('/');
      }
    });
  }, [location]);

  return <>{children}</>;
};