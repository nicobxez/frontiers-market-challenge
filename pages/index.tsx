import React from 'react';
import { Box } from '@mui/material';

import Hero from '../components/Hero';
import FAQs from '../components/FAQs';
import CattleBrowser from '../components/CattleBrowser';
import styles from '../styles/index.module.css';

const Home = () => {
  return (
    <Box className={styles.home_container}>
      <Hero />
      <FAQs />
      <CattleBrowser />
    </Box>
  );
};

export default Home;
