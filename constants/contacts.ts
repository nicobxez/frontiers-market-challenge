import EmailIcon from '@mui/icons-material/Email';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import InstagramIcon from '@mui/icons-material/Instagram';
import facebookIcon from '@mui/icons-material/facebook';
import linkedInIcon from '@mui/icons-material/linkedIn';

export const COMPANY_NAME = 'Frontiers Market';
export const EMAIL = 'info@frontiersmarket.com';
export const PHONE = '+1 512-387-4314';

export const INSTAGRAM = {
  user: '@frontiersmarket',
  link: 'https://www.instagram.com/frontiersmarket/',
};

export const FACEBOOK = {
  user: 'FrontiersMarket',
  link: 'https://www.facebook.com/FrontiersMarket',
};

export const LINKED_IN = {
  user: 'frontiersmarket',
  link: 'https://www.linkedin.com/company/frontiersmarket',
};

export const CONTACT_LIST = [
  {
    label: EMAIL,
    icon: EmailIcon,
  },
  {
    label: PHONE,
    icon: PhoneInTalkIcon,
  },
  {
    label: INSTAGRAM.user,
    icon: InstagramIcon,
    link: INSTAGRAM.link,
  },
  {
    label: FACEBOOK.user,
    icon: facebookIcon,
    link: FACEBOOK.link,
  },
  {
    label: LINKED_IN.user,
    icon: linkedInIcon,
    link: LINKED_IN.link,
  },
];
