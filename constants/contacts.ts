import InstagramIcon from '@mui/icons-material/Instagram';
import facebookIcon from '@mui/icons-material/facebook';
import linkedInIcon from '@mui/icons-material/linkedIn';

export const COMPANY_NAME = 'Frontiers Market';
export const EMAIL = 'info@frontiersmarket.com';
export const PHONE = '+1 512-387-4314';
export const TERMS_OF_SERVICE = 'https://frontiersmarket.com/terms-of-service';
export const PRIVACY_POLICY = 'https://frontiersmarket.com/privacy-policy';
export const APP_STORE_LINK = 'https://apps.apple.com/pl/app/frontiers-market/id6448396170';

type socialNetworkProps = {
  user: string;
  link: string;
  icon: React.ElementType;
};

export const INSTAGRAM: socialNetworkProps = {
  user: '@frontiersmarket',
  link: 'https://www.instagram.com/frontiersmarket/',
  icon: InstagramIcon,
};

export const FACEBOOK: socialNetworkProps = {
  user: 'FrontiersMarket',
  link: 'https://www.facebook.com/FrontiersMarket',
  icon: facebookIcon,
};

export const LINKED_IN: socialNetworkProps = {
  user: 'frontiersmarket',
  link: 'https://www.linkedin.com/company/frontiersmarket',
  icon: linkedInIcon,
};

export const SOCIAL_NETWORKS = [FACEBOOK, INSTAGRAM, LINKED_IN];
