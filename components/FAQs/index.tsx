import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import classNames from 'classnames';

import { FAQ_TYPES, FAQS_LIST } from '../../constants/faqs';

import styles from './styles.module.css';

const FAQs = () => {
  const [selectedFaqType, setSelectedFaqType] = useState(FAQ_TYPES.SELLING);

  const faqTypes = Object.entries(FAQ_TYPES);

  return (
    <section className={styles.wrapper}>
      <Typography variant="body1" component="p" color="var(--fm-main-primary)">
        Trusted livestock marketplace
      </Typography>

      <Typography variant="h4" component="h2" fontWeight={700} className={styles.title}>
        Why buy & sell on Frontiers Market?
      </Typography>

      <Box className={styles.faq_list_button_wrapper}>
        {faqTypes.map(([key, value]) => (
          <Button
            key={key}
            variant="contained"
            size="medium"
            className={classNames(styles.faq_list_button, {
              [styles.faq_list_button_unselected]: selectedFaqType !== value,
            })}
            onClick={() => setSelectedFaqType(value)}
          >
            I’m here for {value}
          </Button>
        ))}
      </Box>

      <Box className={styles.faq_list_wrapper}>
        {FAQS_LIST[selectedFaqType]?.map(({ title, subtitle, description, image }, index) => (
          <article key={index} className={styles.faq_list_item}>
            <Box className={styles.faq_list_item_text}>
              <Typography
                variant="subtitle2"
                component="p"
                textTransform="uppercase"
                color="var(--fm-main-primary)"
                fontWeight={500}
              >
                {subtitle}
              </Typography>

              <Typography variant="h5" component="h3" fontWeight={600}>
                {title}
              </Typography>

              <Typography variant="body1" component="p" fontSize={18}>
                {description}
              </Typography>
            </Box>

            <Box className={styles.faq_list_item_image}>
              <Image src={image} alt={subtitle} decoding="async" loading="lazy" />
            </Box>
          </article>
        ))}
      </Box>
    </section>
  );
};

export default FAQs;
