import { LAYOUT_TYPES } from '../layouts';

export const PATH_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  CATTLE_FOR_SALE: '/cattle-for-sale',
  MOBILE_APP: '/mobile-app',
  DASHBOARD: '/dashboard',
  ACCOUNT: '/account',
  MESSAGES: '/messages',
  BOOKMARKS: '/bookmarks',
};

export const CUSTOM_ROUTES = [
  { path: PATH_ROUTES.LOGIN, layout: LAYOUT_TYPES.EMPTY, private: false },
  { path: PATH_ROUTES.CATTLE_FOR_SALE, layout: LAYOUT_TYPES.DEFAULT, private: true },
];
