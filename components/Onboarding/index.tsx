import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Button, Grid, Typography } from '@mui/material';
import classNames from 'classnames';

import { PATH_ROUTES } from '../../constants/routes/routes';
import { ONBOARDING_STEPS } from '../../constants/onboarding';
import { userAuth } from '../../context/authContext';
import USCountry from '../../assets/img/us_country.webp';

import styles from './styles.module.css';

const Onboarding = () => {
  const { user } = userAuth();

  return (
    <section className={styles.wrapper}>
      <Image
        className={styles.onboarding_banner}
        src={USCountry}
        alt="onboarding-banner"
        decoding="async"
        sizes="100%"
        priority
      />

      <Box className={styles.onboarding_overlay}>
        <Typography
          variant="body1"
          component="p"
          color="var(--fm-main-primary)"
          textTransform="uppercase"
          fontWeight={700}
        >
          How to start
        </Typography>

        <Typography variant="h4" component="h2" fontWeight={700}>
          Start selling around the country
        </Typography>

        <Grid container spacing={2} sx={{ my: 8 }}>
          {ONBOARDING_STEPS.map(({ title, description }, index) => (
            <Grid key={title} item xs={12} md={6} lg={3}>
              <Box className={styles.onboarding_card}>
                <Box className={styles.onboarding_title_container}>
                  <Typography
                    variant="h4"
                    component="p"
                    fontWeight={700}
                    color="var(--fm-main-primary)"
                    className={styles.onboarding_step_number}
                  >
                    {index + 1}
                  </Typography>

                  <Typography
                    variant="body1"
                    component="p"
                    fontWeight={700}
                    fontSize={18}
                    className={styles.onboarding_step_title}
                  >
                    {title}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  component="p"
                  className={styles.onboarding_step_description}
                  sx={{ mt: 1 }}
                >
                  {description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Link
          href={user ? '' : PATH_ROUTES.REGISTER}
          scroll={false}
          className={classNames({ [styles.cta_button_disabled]: user })}
        >
          <Button
            variant="contained"
            size="large"
            className={styles.cta_button}
            disabled={Boolean(user)}
          >
            Create Account
          </Button>
        </Link>
      </Box>
    </section>
  );
};

export default Onboarding;
