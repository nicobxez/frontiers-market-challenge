/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, createContext, useState, useEffect, PropsWithChildren } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';

import { auth } from '../services/firebase';
import { authContextProvider } from '../constants/console';
import { isLocalEnvironment } from '../utils/global';

interface IAuthContext {
  user: User | null;
  authLoading: boolean;
  googleSignIn: () => Promise<void>;
  emailSignIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const googleSignIn = async () => {
    setAuthLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const emailSignIn = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logOut = async () => {
    setAuthLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    setAuthLoading(true);

    const authLoadingTimeout = setTimeout(() => {
      setAuthLoading(false);
    }, 500);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      clearTimeout(authLoadingTimeout);
      unsubscribe();
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        emailSignIn,
        googleSignIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    isLocalEnvironment() && console.error(authContextProvider.missingProviderErrorMessage);

    return {
      user: null,
      authLoading: false,
      emailSignIn: async () => {},
      googleSignIn: async () => {},
      logOut: async () => {},
    };
  }

  return context as IAuthContext;
};
