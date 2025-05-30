import { NavigationProp } from '@react-navigation/native';
import React, { useContext } from 'react';
import { TextInput } from 'react-native';
import { dark, white } from 'src/assets';
import { Header, PageWrapper, surfaceColor } from 'src/components';
import Context from 'src/context/context';

import { styles } from './style';

export interface ISearchProps {
  navigation: NavigationProp<any, any>;
}

export const Search = React.memo<ISearchProps>(({ navigation }) => {
  const context = useContext(Context);

  return (
    <PageWrapper>
      <Header title="Search" customClick={() => navigation.goBack()} />
      <TextInput
        placeholder="Search"
        style={[surfaceColor(context.theme), styles.input]}
        placeholderTextColor={context.theme === 'light' ? dark : white}
      />
    </PageWrapper>
  );
});
