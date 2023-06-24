import {View} from 'native-base';
import React from 'react';
import {styles} from './styles';

export type PageWrapperProps = {
  children: React.ReactNode;
  withStatusBar?: boolean;
  customStyles?: Object;
};

export const PageWrapper: React.FC<PageWrapperProps> = React.memo(
  ({children, withStatusBar = true, customStyles}) => {
    return (
      <View
        {...customStyles}
        style={[styles.container, withStatusBar ? styles.statusBar : {}]}
        >
        {children}
      </View>
    );
  },
);
