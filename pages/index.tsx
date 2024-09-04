import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

import Hero from '../components/Hero';
import FAQs from '../components/FAQs';
import CattleBrowser from '../components/CattleBrowser';
import Onboarding from '../components/Onboarding';
import AboutUs from '../components/AboutUs';
import AppDownloadBanner from '../components/AppDownloadBanner';
import Logo from '../assets/img/logo.png';
import styles from '../styles/index.module.css';
import ChatBot from '../components/ChatBot';

const Home = () => {
  return (
    <Box className={styles.home_container}>
      <Hero />
      <FAQs />
      <CattleBrowser />
      <Onboarding />
      <AboutUs />
      <Image src={Logo} width={100} height={54} alt="logo" priority decoding="async" />
      <AppDownloadBanner />
      <ChatBot />
    </Box>
  );
};

export default Home;
