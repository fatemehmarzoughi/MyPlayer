import {View} from 'native-base';
import React from 'react';
import {styles} from './styles';

export type PageWrapperProps = {
  children: React.ReactNode;
};

export const PageWrapper: React.FC<PageWrapperProps> = React.memo(
  ({children}) => {
    return <View style={styles.container}>{children}</View>;
  },
);
