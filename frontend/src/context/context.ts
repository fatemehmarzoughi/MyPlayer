import React from 'react';
import {User} from 'src/API';

export type Theme = 'dark' | 'light';

export type ContextType = {
  isRotate: boolean;
  setIsRotate: (value: boolean) => void;

  isLogin: boolean;
  setIsLogin: (value: boolean) => void;

  isFirstInstallation: false | null;
  setIsFirstInstallation: (value: false | null) => void;

  theme: Theme;
  setTheme: (value: Theme) => void;

  userInfo: User | undefined;
  setUserInfo: (value: User) => void;
};

export default React.createContext<ContextType>({
  isRotate: false,
  setIsRotate: (value) => {},

  isLogin: false,
  setIsLogin: (value) => {},

  isFirstInstallation: false,
  setIsFirstInstallation: (value) => {},

  theme: 'dark',
  setTheme: (value) => {},

  userInfo: undefined,
  setUserInfo: (value) => {},
});
