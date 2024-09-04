import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AppleIcon from '@mui/icons-material/Apple';
import AdbIcon from '@mui/icons-material/Adb';

import { APP_STORE_LINK } from '../../constants/contacts';
import USCountry2 from '../../assets/img/us_country_2.webp';
import FlagUs from '../../assets/img/flag_us.webp';
import Ranchers from '../../assets/img/ranchers.webp';
import PocketDesktop from '../../assets/img/pocket_desktop.webp';
import PocketMobile from '../../assets/img/pocket_mobile.webp';

import styles from './styles.module.css';

const AppDownloadBanner = () => {
  return (
    <section className={styles.wrapper}>
      <Image
        className={styles.hero_banner}
        src={USCountry2}
        alt="hero-banner"
        decoding="async"
        sizes="100%"
        priority
      />

      <Box className={styles.hero_overlay}>
        <Box className={styles.hero_text_wrapper}>
          <Box className={styles.hero_text_container}>
            <Typography variant="h6" component="p">
              Livestock in your pocket
            </Typography>

            <Typography
              variant="h4"
              component="h6"
              fontWeight={700}
              fontSize={40}
              className={styles.title}
            >
              Get the Frontiers Market companion app
            </Typography>

            <Link href={APP_STORE_LINK}>
              <Button
                variant="contained"
                size="large"
                className={styles.cta_button}
                endIcon={<ArrowOutwardIcon />}
              >
                Download App
              </Button>
            </Link>
          </Box>

          <Typography
            variant="body1"
            component="p"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ verticalAlign: 'center', gap: 0.5, textAlign: 'center', my: 1 }}
            noWrap
          >
            Available on
            <AppleIcon />
            <AdbIcon fill="var(--android-primary) !important" />
          </Typography>

          <Typography
            variant="h6"
            component="p"
            display="flex"
            alignItems="center"
            className={styles.overline}
            sx={{ verticalAlign: 'center', gap: 1 }}
            noWrap
          >
            <Image
              src={Ranchers}
              width={84}
              height={32}
              alt="flag_us"
              loading="lazy"
              decoding="async"
              className={styles.ranchers}
            />
            Trusted by the biggest U.S. ranchers
            <Image
              src={FlagUs}
              width={24}
              height={24}
              alt="flag_us"
              loading="lazy"
              decoding="async"
            />
          </Typography>
        </Box>

        <Image
          src={PocketDesktop}
          alt="mobile-app"
          decoding="async"
          priority
          width={522}
          height={470}
          className={styles.pocket_desktop}
        />

        <Image
          src={PocketMobile}
          alt="mobile-app"
          decoding="async"
          priority
          sizes="100%"
          className={styles.pocket_mobile}
        />
      </Box>
    </section>
  );
};

export default AppDownloadBanner;
