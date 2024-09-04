import React from 'react';
import Link from 'next/link';
import { Box, Divider, Typography } from '@mui/material';
import classNames from 'classnames';

import {
  COMPANY_NAME,
  EMAIL,
  PHONE,
  PRIVACY_POLICY,
  SOCIAL_NETWORKS,
  TERMS_OF_SERVICE,
} from '../../constants/contacts';
import globalStyles from '../../styles/global.module.css';

import styles from './styles.module.css';

const Footer = () => {
  return (
    <footer className={classNames(styles.wrapper, globalStyles.document_margin)}>
      <Box className={styles.container}>
        <Box>
          <Typography
            variant="subtitle1"
            component="p"
            color="var(--fm-main-secondary)"
            fontWeight={700}
            lineHeight={2.5}
          >
            Let’s keep in touch!
          </Typography>

          <Link href={`mailto:${EMAIL}`} className={styles.utils_link}>
            <Typography
              className={styles.contact}
              variant="h5"
              component="p"
              color="var(--fm-primary-black) !important"
              fontWeight={700}
            >
              {EMAIL}
            </Typography>
          </Link>

          <Link href={`tel:${PHONE}`} className={styles.utils_link}>
            <Typography
              className={styles.contact}
              variant="h5"
              component="p"
              color="var(--fm-primary-black) !important"
              fontWeight={700}
            >
              {PHONE}
            </Typography>
          </Link>
        </Box>

        <Box className={styles.social_networks}>
          {SOCIAL_NETWORKS.map(({ link, icon: Icon }) => (
            <Link key={link} href={link} className={styles.utils_link}>
              <Icon />
            </Link>
          ))}
        </Box>
      </Box>

      <Divider sx={{ width: '100%', mt: 1 }} />

      <Box className={styles.utils_container}>
        <Box className={styles.utils_left_content}>
          <Link href={TERMS_OF_SERVICE} className={styles.utils_link}>
            <Typography variant="subtitle2" component="p">
              Terms of Service
            </Typography>
          </Link>

          <Link href={PRIVACY_POLICY} className={styles.utils_link}>
            <Typography variant="subtitle2" component="p">
              Privacy Policy
            </Typography>
          </Link>
        </Box>

        <Typography variant="subtitle2" component="p">
          {`Copyright © ${COMPANY_NAME} ${new Date().getFullYear()}. All Rights Reserved.`}
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;
