import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import VerifiedIcon from '@mui/icons-material/Verified';
import CallMadeIcon from '@mui/icons-material/CallMade';
import classNames from 'classnames';

import { PATH_ROUTES } from '../constants/routes/routes';
import { COMPANY_NAME, PRIVACY_POLICY, TERMS_OF_SERVICE } from '../constants/contacts';
import { userAuth } from '../context/authContext';
import Logo from '../assets/img/logo.png';
import LoginBanner from '../assets/img/login_1350x1800.png';
import styles from '../styles/login.module.css';

const Login = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { user, authLoading, googleSignIn, emailSignIn } = userAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const signInSuccessfully = () => {
    router.push(PATH_ROUTES.HOME);
    enqueueSnackbar('Session started! Welcome', {
      variant: 'success',
    });
  };

  const signInError = (error: { code: string }) => {
    enqueueSnackbar(
      error?.code === 'auth/invalid-login-credentials'
        ? 'Incorrect email or password'
        : 'There was an error logging in, please try again',
      {
        variant: 'error',
      },
    );
  };

  const handleGoogleSignIn = async () => {
    await googleSignIn().then(signInSuccessfully).catch(signInError);
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await emailSignIn(formData?.email, formData?.password)
      .then(signInSuccessfully)
      .catch(signInError);
  };

  useEffect(() => {
    user && router.push(PATH_ROUTES.HOME);
  }, [router, user]);

  return (
    <Box className={styles.login_wrapper}>
      <section className={styles.form_section}>
        <Box className={styles.form_wrapper}>
          <Link href={PATH_ROUTES.HOME} className={styles.logo_link}>
            <Image src={Logo} width={105} height={56} alt="logo" decoding="async" loading="lazy" />
          </Link>

          <Box className={styles.login_title_container}>
            <Typography variant="h4" component="h1" fontWeight={600}>
              Welcome back
            </Typography>

            <Typography variant="body1" component="h3">
              Don’t have an account?{' '}
              <Link href={PATH_ROUTES.REGISTER} className={styles.subtitle_link}>
                Register now <CallMadeIcon sx={{ fontSize: 14, verticalAlign: 'middle' }} />
              </Link>
            </Typography>
          </Box>

          <form className={styles.form_container} onSubmit={(e) => handleEmailSignIn(e)}>
            <TextField
              className={styles.form_input}
              id="login-email"
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              required
              value={formData?.email}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              disabled={authLoading}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'var(--fm-primary-white)',
                  borderRadius: '0.5rem',
                },
              }}
            />

            <TextField
              className={styles.form_input}
              id="login-password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              required
              value={formData?.password}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              helperText={<span className={styles.forgot_password_text}>Forgot password?</span>}
              disabled={authLoading}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor: 'var(--fm-primary-white)',
                  borderRadius: '0.5rem',
                },
              }}
            />

            <Button
              className={styles.form_button}
              variant="contained"
              size="large"
              type="submit"
              disabled={authLoading}
            >
              {authLoading ? 'Loading...' : 'Log in'}
            </Button>

            <Link href={PATH_ROUTES.HOME} className={styles.form_button}>
              <Button variant="outlined" size="large">
                Back to Home
              </Button>
            </Link>

            <Divider>OR</Divider>

            <Button
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              className={classNames(
                styles.form_button,
                styles.social_network_button,
                styles.google_button,
              )}
              onClick={handleGoogleSignIn}
              disabled={authLoading}
            >
              Continue with Google
            </Button>
          </form>
        </Box>

        <Box className={styles.form_footer}>
          <Divider className={styles.form_footer_divider} />

          <Box className={styles.form_footer_link_container}>
            <Link href={TERMS_OF_SERVICE} className={styles.form_footer_link}>
              <Typography variant="subtitle2" component="p">
                Terms of Service
              </Typography>
            </Link>

            <Link href={PRIVACY_POLICY} className={styles.form_footer_link}>
              <Typography variant="subtitle2" component="p">
                Privacy Policy
              </Typography>
            </Link>
          </Box>

          <Typography variant="subtitle2" component="p" color="var(--fm-alternative-grey-1)">
            {`Copyright © ${COMPANY_NAME} ${new Date().getFullYear()}. All Rights Reserved.`}
          </Typography>
        </Box>
      </section>

      <section className={styles.login_banner_wrapper}>
        <Image
          className={styles.login_banner}
          src={LoginBanner}
          alt="login-banner"
          decoding="async"
          sizes="100%"
          priority
        />

        <article className={styles.login_banner_overlay}>
          <Typography
            variant="h6"
            component="p"
            color="var(--fm-primary-white)"
            fontWeight={700}
            lineHeight={1.5}
          >
            John Graham
          </Typography>

          <Typography
            variant="body1"
            component="p"
            color="var(--fm-primary-white)"
            fontWeight={500}
            lineHeight={2}
          >
            Golden Ranch, Texas
          </Typography>

          <Typography
            variant="body1"
            component="p"
            color="var(--fm-primary-white)"
            fontWeight={500}
            lineHeight={2}
          >
            Verified Seller on Frontiers Market{' '}
            <VerifiedIcon
              fill="var(--fm-main-primary) !important"
              sx={{ verticalAlign: 'middle' }}
            />
          </Typography>
        </article>
      </section>
    </Box>
  );
};

export default Login;
