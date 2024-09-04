import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
} from '@mui/material';
import Person4Icon from '@mui/icons-material/Person4';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import MenuIcon from '@mui/icons-material/Menu';
import classNames from 'classnames';

import { ACCOUNT_MENU_ITEMS } from '../../constants/header/navbar';
import { UserAuth } from '../../context/authContext';

import styles from './styles.module.css';

const MyAccountButton = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user, logOut } = UserAuth();

  const [anchorElAccount, setAnchorElAccount] = useState<HTMLButtonElement | null>(null);

  const handleOpenMenu = (e?: React.MouseEvent<HTMLButtonElement> | null) => {
    setAnchorElAccount(e?.currentTarget || null);
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
      });
  };

  return (
    <>
      <Button
        className={classNames(
          styles.header_button,
          styles.header_button_outlined,
          styles.my_account_button,
        )}
        variant="outlined"
        size="large"
        sx={{
          backgroundColor: 'var(--fm-primary-white) !important',
        }}
        endIcon={<MenuIcon />}
        onClick={handleOpenMenu}
      >
        My account
      </Button>

      <Menu
        sx={{ '& .MuiPaper-root': { mt: 2, minWidth: 280 } }}
        id="account-menu"
        anchorEl={anchorElAccount}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElAccount)}
        onClose={() => handleOpenMenu(null)}
        onClick={() => handleOpenMenu(null)}
        disableScrollLock
      >
        <MenuItem disabled sx={{ opacity: '1 !important' }}>
          <Avatar
            sx={{ bgcolor: 'var(--fm-alternative-green-1)' }}
            variant="rounded"
            alt={user?.displayName || 'account-image'}
            src={user?.photoURL as string}
          >
            <Person4Icon fill="var(--fm-main-secondary) !important" />
          </Avatar>

          <Box sx={{ px: 1 }}>
            <Typography variant="body2" component="p" fontWeight={600} noWrap>
              Hi{user?.displayName && `, ${user?.displayName}`}!
            </Typography>

            <Typography variant="caption" component="p" noWrap>
              {user?.email}
            </Typography>
          </Box>
        </MenuItem>

        <Divider />

        {ACCOUNT_MENU_ITEMS.map(({ label, icon: Icon }) => (
          <MenuItem key={label}>
            {Icon && (
              <ListItemIcon className={styles.list_item}>
                <Icon sx={{ fontSize: 20 }} />
              </ListItemIcon>
            )}

            <Typography variant="body1" component="p">
              {label}
            </Typography>
          </MenuItem>
        ))}

        <Divider />

        <MenuItem onClick={handleLogOut}>
          <ListItemIcon className={styles.list_item}>
            <PowerSettingsNewIcon sx={{ fontSize: 20 }} />
          </ListItemIcon>

          <Typography variant="body1" component="p">
            Log out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MyAccountButton;
