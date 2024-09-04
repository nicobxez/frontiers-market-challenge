import React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

import { COMPANY_NAME } from '../../constants/contacts';
import Team from '../../assets/img/team.webp';
import Signature from '../../assets/img/signature.png';

import styles from './styles.module.css';

const AboutUs = () => {
  return (
    <section className={styles.wrapper}>
      <figure className={styles.banner_container}>
        <Image
          src={Team}
          alt={`${COMPANY_NAME}-team`}
          decoding="async"
          width={528}
          height={554}
          priority
        />
        <figcaption className={styles.banner_label}>
          Joe Draper, happy Frontiers Market rancher
        </figcaption>
      </figure>

      <Box className={styles.text_container}>
        <Box>
          <Typography
            variant="body1"
            component="p"
            color="var(--fm-main-primary)"
            textTransform="uppercase"
            fontWeight={700}
          >
            Who We Are
          </Typography>

          <Typography variant="h4" component="h2" fontWeight={700}>
            The Frontiers Market Family
          </Typography>
        </Box>

        <Typography variant="body1" component="p" fontSize={18} className={styles.description}>
          Frontiers Market got its start in Texas with one goal: provide farmers and ranchers with
          digital solutions to help them become more efficient, profitable, and competitive in
          national markets.
        </Typography>

        <Typography variant="body1" component="p" fontSize={18} className={styles.description}>
          Our team of ranchers and tech innovators is helping build a stronger future for
          agriculture, as a trusted partner of operations across the country.
        </Typography>

        <Typography variant="body1" component="p" fontSize={18} className={styles.description}>
          We are driven by the belief that agriculture is the backbone of this country and without
          farmers and ranchers creating a secure and independent food supply, there is no United
          States.
        </Typography>

        <Image
          className={styles.signature}
          src={Signature}
          alt={`${COMPANY_NAME}-team-signature`}
          decoding="async"
          loading="lazy"
          width={322}
          height={40}
        />
      </Box>
    </section>
  );
};

export default AboutUs;
