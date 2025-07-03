import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { $currentUser } from '../../entities/users';

interface ProviderProps {
    children: React.ReactNode;
}

export const Provider = (props: ProviderProps): React.ReactElement => {
  const { children } = props;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    $currentUser.watch((user) => {
      if (!user && location.pathname !== '/auth') {
        navigate('/auth');
      }
    });
  }, [location]);

  return <>{children}</>;
};