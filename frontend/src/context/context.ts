import React from 'react';
import {User} from 'src/API';

export type Theme = 'dark' | 'light';

export type ContextType = {
  isRotate: boolean;
  setIsRotate: (value: boolean) => void;

  isLogin: boolean;
  setIsLogin: (value: boolean) => void;

  theme: Theme;
  setTheme: (value: Theme) => void;

  userInfo: User | undefined;
  setUserInfo: (value: User) => void;
};

export default React.createContext<ContextType>({
  isRotate: false,
  setIsRotate: (value: boolean) => {},

  isLogin: false,
  setIsLogin: (value: boolean) => {},

  theme: 'dark',
  setTheme: (value: 'dark' | 'light') => {},

  userInfo: undefined,
  setUserInfo: (value: User) => {},
});
