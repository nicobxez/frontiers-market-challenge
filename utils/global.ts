export const isLocalEnvironment = () => {
  return window?.location?.hostname === 'localhost';
};
