import { StaticImageData } from 'next/image';

import sellingFaq1 from '../assets/img/faqs/selling-faq-1.webp';
import sellingFaq2 from '../assets/img/faqs/selling-faq-2.webp';
import sellingFaq3 from '../assets/img/faqs/selling-faq-3.webp';
import buyingFaq1 from '../assets/img/faqs/buying-faq-1.webp';
import buyingFaq2 from '../assets/img/faqs/buying-faq-2.webp';
import buyingFaq3 from '../assets/img/faqs/buying-faq-3.webp';

export const FAQ_TYPES = {
  SELLING: 'selling',
  BUYING: 'buying',
};

type FAQsProps = {
  title: string;
  subtitle: string;
  description: string;
  image: StaticImageData;
};

export const SELLING_FAQS: FAQsProps[] = [
  {
    title: 'Sell to a National Market',
    subtitle: 'Free to list',
    description:
      'Sell to anyone from industry giants to small-scale operations wanting to buy your product. Ensure fair, competitive prices in the national market with buyers you can trust. Get listings seen for free.',
    image: sellingFaq1,
  },
  {
    title: 'Make More Sales',
    subtitle: 'Get more details',
    description:
      'Access to Frontiers Market’s marketplace means you are seen by thousands of potential buyers. As soon as you are verified to sell, get offers from all over the country.',
    image: sellingFaq2,
  },
  {
    title: 'Quick & Easy Process',
    subtitle: 'Instant messaging',
    description:
      'Connect quickly with buyers and negotiate directly until you are satisfied. Your cattle don’t leave the ranch until you meet a buyer you like.',
    image: sellingFaq3,
  },
];

export const BUYING_FAQS: FAQsProps[] = [
  {
    title: 'Top Classes and Breeds',
    subtitle: 'Large selection',
    description:
      'Find the cattle you’re looking for with our large catalog of livestock across the United States. Search for breed, weight, age, and more to add only the highest quality cattle to your ranch.',
    image: buyingFaq1,
  },
  {
    title: 'Informed Purchasing',
    subtitle: 'Get more details',
    description:
      'Discuss animal health and history, negotiate prices, and learn about operations directly from the seller. View reviews from previous buyers.',
    image: buyingFaq2,
  },
  {
    title: 'Hassle-Free Transactions',
    subtitle: 'Buy & Sell safely',
    description:
      'Making an offer and closing a deal with sellers is safe and easy through Frontiers Market. Each listing is verified for authenticity and our team is available for support.',
    image: buyingFaq3,
  },
];

export const FAQS_LIST = {
  [FAQ_TYPES.SELLING]: SELLING_FAQS,
  [FAQ_TYPES.BUYING]: BUYING_FAQS,
};
