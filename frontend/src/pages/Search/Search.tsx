import React from 'react';
import {dark, white} from 'src/assets';
import Context from 'src/context/context';
import {TextInput} from 'react-native';
import {Header, PageWrapper, surfaceColor} from 'src/components';
import {NavigationProp} from '@react-navigation/native';

import {styles} from './style';

export interface ISearchProps {
  navigation: NavigationProp<any, any>;
}
export class Search extends React.PureComponent<ISearchProps, {}> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  override render() {
    return (
      <PageWrapper>
        <Header
          title="Search"
          customClick={() => this.props.navigation.goBack()}
        />
        <TextInput
          placeholder="Search"
          style={[surfaceColor(this.context.theme), styles.input]}
          placeholderTextColor={this.context.theme === 'light' ? dark : white}
        />
      </PageWrapper>
    );
  }
}
