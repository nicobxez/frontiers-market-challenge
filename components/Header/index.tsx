import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppBar, Box, Button, Toolbar, Typography, Skeleton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import AddIcon from '@mui/icons-material/Add';
import Person4Icon from '@mui/icons-material/Person4';
import classNames from 'classnames';

import Drawer from '../Drawer';
import { PATH_ROUTES } from '../../constants/routes/routes';
import { PHONE } from '../../constants/contacts';
import { UserAuth } from '../../context/authContext';
import Logo from '../../assets/img/logo.png';
import LogoSmall from '../../assets/img/logo_small.png';
import globalStyles from '../../styles/global.module.css';

import Banner from './Banner';
import MyAccountButton from './MyAccountButton';
import NotificationsButton from './NotificationsButton';
import styles from './styles.module.css';

const Header = () => {
  const { user, authLoading } = UserAuth();

  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Box>
      <AppBar className={styles.header}>
        <Banner />

        <Toolbar className={classNames(styles.toolbar, globalStyles.document_margin)}>
          <Box className={styles.toolbar_left_content}>
            <Link href="/" className={styles.logo}>
              <Image src={Logo} width={100} height={54} alt="logo" priority decoding="async" />
            </Link>

            <Button
              className={classNames(
                styles.header_button,
                styles.header_button_outlined,
                styles.drawer_menu_button,
              )}
              variant="outlined"
              size="large"
              sx={{
                backgroundColor: 'var(--fm-primary-white) !important',
              }}
              startIcon={
                user ? (
                  <Avatar
                    sx={{
                      bgcolor: 'var(--fm-alternative-green-1)',
                      width: 32,
                      height: 32,
                      mr: 1,
                    }}
                    alt={user?.displayName || 'account-image'}
                    src={user?.photoURL as string}
                  >
                    <Person4Icon fill="var(--fm-main-secondary) !important" />
                  </Avatar>
                ) : (
                  <Image
                    className={styles.logo_small}
                    src={LogoSmall}
                    width={16}
                    height={24}
                    alt="logo_small"
                    priority
                    decoding="async"
                  />
                )
              }
              endIcon={<MenuIcon />}
              onClick={() => setShowDrawer(true)}
            />

            <Link href={PATH_ROUTES.CATTLE_FOR_SALE}>
              <Button
                className={classNames(
                  styles.header_button,
                  styles.header_button_outlined,
                  styles.browse_livestock_button,
                )}
                variant="outlined"
                size="large"
                sx={{
                  ml: 6,
                  fontWeight: 500,
                  backgroundColor: 'var(--fm-primary-white) !important',
                }}
              >
                Browse Livestock
              </Button>
            </Link>
          </Box>

          <Box className={styles.toolbar_right_content}>
            {authLoading ? (
              <>
                <Skeleton variant="rounded" width={90} height={40} animation="wave" />
                <Skeleton variant="rounded" width={90} height={40} animation="wave" />
              </>
            ) : user ? (
              <>
                <Link href={PATH_ROUTES.DASHBOARD}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    sx={{ boxShadow: 'none', height: 40, p: 1.5, borderRadius: '0.38rem' }}
                  >
                    Add listing
                  </Button>
                </Link>

                <MyAccountButton />
                <NotificationsButton />
              </>
            ) : (
              <>
                <Link href={`tel:${PHONE}`} className={styles.toolbar_phone_link}>
                  <Typography variant="body1" component="p" className={styles.toolbar_phone_text}>
                    Call us
                  </Typography>
                  <SmartphoneIcon
                    fill="var(--fm-main-secondary) !important"
                    sx={{ fontSize: 18 }}
                  />
                  <Typography variant="body1" component="p">
                    {PHONE}
                  </Typography>
                </Link>

                <Link href={PATH_ROUTES.LOGIN}>
                  <Button
                    className={classNames(styles.header_button, styles.header_button_outlined)}
                    variant="outlined"
                    size="large"
                  >
                    Log in
                  </Button>
                </Link>

                <Link href={PATH_ROUTES.REGISTER} className={styles.register_button}>
                  <Button className={classNames(styles.header_button)} size="large">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </Box>

          <Drawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
