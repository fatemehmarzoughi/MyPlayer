import {
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import {NavigationProp} from '@react-navigation/native';
import Context from 'src/context/context';
import * as Colors from 'src/assets/constants/Colors';
import {styles} from './style';
import {toastMessageDuration} from 'src/assets';
import {POST, reportBug} from 'src/API';
import {Header, PageWrapper} from 'src/components';
import {getData} from 'src/LocalStorage';
import {Spinner} from 'native-base';

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
              this.context.theme ? Colors.dark : Colors.white
            }
            style={styles.input}
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
