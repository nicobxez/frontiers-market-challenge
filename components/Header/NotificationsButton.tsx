import React, { useState } from 'react';
import { Box, Menu, MenuItem, Typography, Divider, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

import styles from './styles.module.css';

const NotificationsButton = () => {
  const [anchorElNotifications, setAnchorElNotifications] = useState<HTMLButtonElement | null>(
    null,
  );

  const handleOpenMenu = (e?: React.MouseEvent<HTMLButtonElement> | null) => {
    setAnchorElNotifications(e?.currentTarget || null);
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
        <NotificationsIcon fill="var(--fm-main-alternative) !important" />
      </IconButton>

      <Menu
        sx={{ '& .MuiPaper-root': { mt: 2, minWidth: 280 } }}
        id="notifications-menu"
        anchorEl={anchorElNotifications}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElNotifications)}
        onClose={() => handleOpenMenu(null)}
        onClick={() => handleOpenMenu(null)}
        disableScrollLock
      >
        <MenuItem disabled sx={{ opacity: '1 !important' }}>
          <Typography variant="body2" component="p" noWrap fontWeight={700}>
            Notifications
          </Typography>
        </MenuItem>

        <Divider />

        <MenuItem disabled sx={{ opacity: '1 !important' }}>
          <Box className={styles.notifications_empty} alignItems="center" justifyContent="center">
            <Typography
              variant="body2"
              component="p"
              fontWeight={500}
              color="var(--fm-alternative-grey-1)"
            >
              No new notifications
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationsButton;
