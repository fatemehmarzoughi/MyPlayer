import {NavigationProp} from '@react-navigation/native';
import {Spinner} from 'native-base';
import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {POST, reportBug} from 'src/API';
import {toastMessageDuration} from 'src/assets';
import * as Colors from 'src/assets/constants/Colors';
import {contentColor, Header, PageWrapper} from 'src/components';
import Context from 'src/context/context';
import {getData} from 'src/LocalStorage';

import {styles} from './style';

export interface IReportABugProps {
  navigation: NavigationProp<any, any>;
}

export interface IReportABugStates {
  input: string;
  loading: boolean;
}
export class ReportABug extends React.PureComponent<
  IReportABugProps,
  IReportABugStates
> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  constructor(props: IReportABugProps) {
    super(props);
    this.state = {
      input: '',
      loading: false,
    };
  }

  handleTextInput = (input: string) => {
    this.setState({
      input,
    });
  };

  handleReport = async () => {
    this.setState({
      loading: true,
    });
    const userId = await getData('userId');

    if (!userId) return;

    await reportBug({
      reqBody: {
        data: {
          description: this.state.input,
          user: {
            connect: [{id: Number(userId)}],
          },
        },
      },
      onSuccess: data => {
        Toast.show({
          type: 'success',
          position: 'top',
          autoHide: true,
          text1: 'Bug reported successfully',
          text2: 'Thanks for the feedback',
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.setState({
          loading: false,
        });
        this.props.navigation.navigate('Profile');
      },
      onError: err => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Text input is empty',
          text2: 'Please explain the bug.',
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.setState({
          loading: false,
        });
      },
    });
  };

  override render() {
    return (
      <ScrollView>
        <PageWrapper>
          <Header
            title="Report a Bug"
            customClick={() => this.props.navigation.goBack()}
          />
          <TextInput
            placeholder="Your explenation goes here ... "
            placeholderTextColor={
              this.context.theme === 'light' ? Colors.dark : Colors.white
            }
            style={[styles.input, contentColor(this.context.theme)]}
            onChangeText={input => this.handleTextInput(input)}
          />
          <TouchableOpacity style={styles.btn} onPress={this.handleReport}>
            {this.state.loading ? (
              <Spinner
                size={'lg'}
                accessibilityLabel="Loading posts"
                color="warning.500"
                style={{
                  alignSelf: 'center',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              />
            ) : (
              <Text style={styles.btnText}>Report</Text>
            )}
          </TouchableOpacity>
        </PageWrapper>
      </ScrollView>
    );
  }
}
