import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// I expose the credentials instead of using environment variables in order to perform local testing without the need to request those credentials.
const firebaseConfig = {
  apiKey: 'AIzaSyByQH_r7vk8XgRn7EL2mxaW6Gfb4MXnsHA',
  authDomain: 'frontiers-market-challenge.firebaseapp.com',
  projectId: 'frontiers-market-challenge',
  storageBucket: 'frontiers-market-challenge.appspot.com',
  messagingSenderId: '431589646596',
  appId: '1:431589646596:web:0e223ac2fce3f2d30c3051',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
