import React from 'react';
import {Modal, StyleSheet, View, Text} from 'react-native';

import {height, width} from 'src/assets/constants';
import * as Colors from 'src/assets/constants/Colors';
import { Spinner } from 'native-base';

export interface ISavingModalProps {
  modalVisible: boolean;
  cancelModal?: () => void;
}

export interface ISavingModalStates {}
export class SavingModal extends React.PureComponent<
  ISavingModalProps,
  ISavingModalStates
> {
  override render() {
    return (
      <Modal
        visible={this.props.modalVisible}
        transparent={true}
        onRequestClose={this.props.cancelModal}>
        <View style={styles.container}>
          <View style={styles.modalStyle}>
            <Spinner
              size="sm"
              accessibilityLabel="Loading posts"
              color="warning.100"
              style={{
                alignSelf: 'center',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            />
            <Text style={styles.text}>Saving</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: Colors.mainColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 150,
    height: 150,
    padding: 30,
    borderRadius: 10,
    borderColor: Colors.mainColor,
    borderStyle: 'solid',
    borderWidth: 5,
  },
  text: {
    color: Colors.white,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    height,
    width,
  },
});
