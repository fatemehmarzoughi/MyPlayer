import React, {useContext} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {contentColor} from 'src/components';
import Context from 'src/context/context';

import {styles} from './style';

export interface INetworkErrorProps {
  onReload: () => void;
}

export const NetworkError = React.memo<INetworkErrorProps>(({onReload}) => {
  const context = useContext(Context);

  return (
    <View style={styles.container}>
      <Text style={[contentColor(context.theme), styles.text]}>
        NetworkError
      </Text>
      <TouchableOpacity style={styles.mainBtn} onPress={onReload}>
        <Text style={styles.BtnText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
});
