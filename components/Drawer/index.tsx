import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSnackbar } from 'notistack';
import {
  Box,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import Person4Icon from '@mui/icons-material/Person4';
import classNames from 'classnames';

import { PRIVATE_NAVBAR_ITEMS, PUBLIC_NAVBAR_ITEMS } from '../../constants/header/navbar';
import { PATH_ROUTES } from '../../constants/routes/routes';
import { UserAuth } from '../../context/authContext';
import LogoSmall from '../../assets/img/logo_small.png';
import headerStyles from '../Header/styles.module.css';

import styles from './styles.module.css';

interface IDrawer {
  showDrawer: boolean;
  setShowDrawer: (value: boolean) => void;
}

const Drawer: React.FC<IDrawer> = ({ showDrawer, setShowDrawer }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, logOut } = UserAuth();

  const navbarItems = user
    ? [...PUBLIC_NAVBAR_ITEMS, ...PRIVATE_NAVBAR_ITEMS]
    : PUBLIC_NAVBAR_ITEMS;

  const toggleDrawer = (value: boolean, e?: React.KeyboardEvent<Element>) => {
    const invalidKey = e?.type === 'keydown' && e?.key !== 'Esc';
    !invalidKey && setShowDrawer(value);
  };

  const handleLogOut = () => {
    logOut()
      .then(() =>
        enqueueSnackbar('Session has been closed, see you next time 👋', {
          variant: 'success',
        }),
      )
      .catch(() => {
        enqueueSnackbar('There was an error logging out, please try again', {
          variant: 'error',
        });
      })
      .finally(() => {
        setShowDrawer(false);
      });
  };

  return (
    <MuiDrawer
      anchor="left"
      open={showDrawer}
      onClose={(e: React.KeyboardEvent<Element>) => toggleDrawer(false, e)}
      className={styles.drawer}
    >
      <Box className={styles.list_wrapper} role="presentation">
        <List>
          <ListItem sx={{ userSelect: 'none' }}>
            {user ? (
              <>
                <Avatar
                  sx={{
                    bgcolor: 'var(--fm-alternative-green-1)',
                    width: 32,
                    height: 32,
                  }}
                  alt={user?.displayName || 'account-image'}
                  src={user?.photoURL as string}
                >
                  <Person4Icon fill="var(--fm-main-secondary) !important" />
                </Avatar>

                <Box sx={{ px: 1 }}>
                  <Typography variant="body2" component="p" fontWeight={600} noWrap>
                    Hi{user?.displayName && `, ${user?.displayName}`}!
                  </Typography>
                </Box>
              </>
            ) : (
              <Box className={styles.public_drawer_header}>
                <Image
                  src={LogoSmall}
                  width={24}
                  height={30}
                  alt="logo_small"
                  priority
                  decoding="async"
                />

                <Link href={PATH_ROUTES.LOGIN}>
                  <Button
                    className={classNames(
                      headerStyles.header_button,
                      headerStyles.header_button_outlined,
                    )}
                    variant="outlined"
                    size="large"
                    sx={{ backgroundColor: 'var(--fm-primary-white) !important' }}
                  >
                    Log in
                  </Button>
                </Link>
              </Box>
            )}
          </ListItem>

          <Divider sx={{ my: 1.5 }} />

          {navbarItems?.map(({ label, link = '' }) => (
            <Link
              key={`drawer_menu_list_${label}`}
              className={styles.drawer_item}
              href={link}
              onClick={() => toggleDrawer(false)}
              onKeyDown={(e) => toggleDrawer(false, e)}
            >
              <ListItem key={label} disablePadding>
                <ListItemButton>
                  <Typography
                    variant="body2"
                    component="p"
                    className={styles.list_item}
                    fontWeight={700}
                  >
                    {label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}

          <Divider sx={{ my: 1.5 }} />

          {user && (
            <ListItemButton>
              <ListItem onClick={handleLogOut} disablePadding>
                <Typography variant="body2" component="p" fontWeight={600} noWrap>
                  Log out
                </Typography>
              </ListItem>
            </ListItemButton>
          )}
        </List>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
