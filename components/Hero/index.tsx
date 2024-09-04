import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';

import { PATH_ROUTES } from '../../constants/routes/routes';
import HeroBanner from '../../assets/img/hero.webp';

import styles from './styles.module.css';

const Hero = () => {
  return (
    <section className={styles.wrapper}>
      <Image
        className={styles.hero_banner}
        src={HeroBanner}
        alt="login-banner"
        decoding="async"
        sizes="100%"
        priority
      />

      <Box className={styles.hero_overlay}>
        <Typography className={styles.subtitle} variant="body1" component="span">
          Trusted by 10,000+ livestock owners 🐄
        </Typography>

        <Typography variant="h2" component="h1" fontWeight={700} className={styles.title}>
          Search Livestock For Sale
        </Typography>

        <Link href={PATH_ROUTES.CATTLE_FOR_SALE}>
          <Button variant="contained" size="large" className={styles.cta_button}>
            Browse livestock
          </Button>
        </Link>
      </Box>
    </section>
  );
};

export default Hero;
