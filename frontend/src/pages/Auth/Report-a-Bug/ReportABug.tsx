import {NavigationProp} from '@react-navigation/native';
import {Spinner} from 'native-base';
import React, {useCallback, useContext, useState} from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import {reportBug} from 'src/API';
import {toastMessageDuration} from 'src/assets';
import * as Colors from 'src/assets/constants/Colors';
import {contentColor, Header, PageWrapper} from 'src/components';
import Context from 'src/context/context';
import {getData} from 'src/LocalStorage';

import {styles} from './style';

interface IReportABugProps {
  navigation: NavigationProp<any, any>;
}

export const ReportABug = React.memo(({navigation}: IReportABugProps) => {
  const context = useContext(Context);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReport = useCallback(async () => {
    setLoading(true);

    const userId = await getData('userId');
    if (!userId) {
      setLoading(false);
      return;
    }

    await reportBug({
      reqBody: {
        data: {
          description: input,
          user: {
            connect: [{id: Number(userId)}],
          },
        },
      },
      onSuccess: () => {
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
        setLoading(false);
        navigation.navigate('Profile');
      },
      onError: () => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Text input is empty',
          text2: 'Please explain the bug.',
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        setLoading(false);
      },
    });
  }, [input, navigation]);

  return (
    <ScrollView>
      <PageWrapper>
        <Header title="Report a Bug" customClick={() => navigation.goBack()} />
        <TextInput
          placeholder="Your explanation goes here ... "
          placeholderTextColor={
            context.theme === 'light' ? Colors.dark : Colors.white
          }
          style={[styles.input, contentColor(context.theme)]}
          onChangeText={(text) => {
            console.log(text);
            setInput(text)
            
          }}
        />
        <TouchableOpacity style={styles.btn} onPress={handleReport}>
          {loading ? (
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
});
