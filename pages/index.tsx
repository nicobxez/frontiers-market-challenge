import React from 'react';
import { Box } from '@mui/material';

import Hero from '../components/Hero';
import styles from '../styles/index.module.css';

const Home = () => {
  return (
    <Box className={styles.home_container}>
      <Hero />
    </Box>
  );
};

export default Home;
