import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

import { PATH_ROUTES } from '../routes/routes';

type NavbarItemsProps = {
  label: string;
  link?: (typeof PATH_ROUTES)[keyof typeof PATH_ROUTES];
};

export const PUBLIC_NAVBAR_ITEMS: NavbarItemsProps[] = [
  {
    label: 'Homepage',
    link: PATH_ROUTES.HOME,
  },
  {
    label: 'Browse Livestock',
    link: PATH_ROUTES.CATTLE_FOR_SALE,
  },
  {
    label: 'Add Listing',
    link: PATH_ROUTES.DASHBOARD,
  },
];

export const PRIVATE_NAVBAR_ITEMS: NavbarItemsProps[] = [
  {
    label: 'Dashboard',
    link: PATH_ROUTES.DASHBOARD,
  },
  {
    label: 'Account',
    link: PATH_ROUTES.ACCOUNT,
  },
  {
    label: 'Messages',
    link: PATH_ROUTES.MESSAGES,
  },
  {
    label: 'Bookmarks',
    link: PATH_ROUTES.BOOKMARKS,
  },
  {
    label: 'Update password',
    link: PATH_ROUTES.FORGOT_PASSWORD,
  },
];

export const ACCOUNT_MENU_ITEMS: {
  label: string;
  icon?: React.ElementType;
}[] = [
  {
    label: 'Dashboard',
    icon: PetsOutlinedIcon,
  },
  {
    label: 'Account',
    icon: PersonOutlineOutlinedIcon,
  },
  {
    label: 'Messages',
    icon: EmailOutlinedIcon,
  },
  {
    label: 'Bookmarks',
    icon: BookmarkBorderOutlinedIcon,
  },
];
