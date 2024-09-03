import React from 'react';
import classNames from 'classnames';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import globalStyles from '../../styles/global.module.css';

import styles from './styles.module.css';

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className={classNames(styles.layout_container, globalStyles.document_margin)}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
