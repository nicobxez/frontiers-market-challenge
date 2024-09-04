import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import AdbIcon from '@mui/icons-material/Adb';
import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames';

import { BANNER_STORAGE_KEY, DISTANCE_TO_CHANGE } from '../../constants/header/rules';
import { PATH_ROUTES } from '../../constants/routes/routes';
import FlagUs from '../../assets/img/flag_us.webp';
import globalStyles from '../../styles/global.module.css';

import styles from './styles.module.css';

const Banner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [wasScrolled, setWasScrolled] = useState(false);

  const closeBanner = () => {
    setShowBanner(false);
    sessionStorage?.setItem(BANNER_STORAGE_KEY, 'false');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > DISTANCE_TO_CHANGE) {
        setWasScrolled(true);
      } else {
        setWasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedBannerStatus = sessionStorage?.getItem(BANNER_STORAGE_KEY);

    if (storedBannerStatus === 'false') {
      setShowBanner(false);
    } else {
      sessionStorage?.setItem(BANNER_STORAGE_KEY, 'true');
      setShowBanner(!wasScrolled);
    }
  }, [wasScrolled]);

  return (
    <Box className={styles.banner} sx={{ mt: showBanner ? 0 : -6 }}>
      <Link
        href={PATH_ROUTES.MOBILE_APP}
        className={classNames(styles.banner_text_container, globalStyles.document_margin)}
      >
        <Typography
          variant="body1"
          component="p"
          display="flex"
          sx={{ verticalAlign: 'center', gap: 1 }}
          className={styles.banner_text_description}
        >
          <Image
            src={FlagUs}
            width={24}
            height={24}
            alt="flag_us"
            loading="lazy"
            decoding="async"
          />
          Join our Early Access program to test our cattle management app on your ranch.
        </Typography>

        <Typography
          variant="body1"
          component="p"
          display="flex"
          sx={{ verticalAlign: 'center', gap: 0.5 }}
          className={styles.banner_text_description}
        >
          Available on
          <AppleIcon />
          <AdbIcon fill="var(--android-primary) !important" />
        </Typography>

        <Typography
          variant="body1"
          component="p"
          display="flex"
          sx={{ verticalAlign: 'center', gap: 0.5 }}
          className={styles.banner_text_description_xs}
        >
          <AppleIcon />
          <AdbIcon fill="var(--android-primary) !important" />
          Test our cattle weight app.
        </Typography>
      </Link>

      <CloseIcon className={styles.banner_close_icon} onClick={closeBanner} />
    </Box>
  );
};

export default Banner;
