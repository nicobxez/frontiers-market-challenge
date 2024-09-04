import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Box, CircularProgress } from '@mui/material';

import { PATH_ROUTES } from '../../constants/routes/routes';
import { UserAuth } from '../../context/authContext';

interface IPrivateRoute extends PropsWithChildren {
  isPrivate?: boolean;
}

const PrivateRoute = ({ isPrivate, children }: IPrivateRoute) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { user, authLoading } = UserAuth();

  useEffect(() => {
    if (isPrivate && !authLoading && !user) {
      router.push(PATH_ROUTES.HOME);
      enqueueSnackbar('You must log in to access this route', {
        variant: 'warning',
      });
    }
  }, [user, authLoading, isPrivate, router, enqueueSnackbar]);

  return isPrivate && authLoading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <CircularProgress
        color="primary"
        sx={{ width: '64px !important', height: '64px !important' }}
      />
    </Box>
  ) : (
    children
  );
};

export default PrivateRoute;
