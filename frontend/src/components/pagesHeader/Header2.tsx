import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import context from 'src/context/context';
import {titleFontSize, width} from 'src/assets';
import * as Colors from 'src/assets/constants/Colors';
import {contentColor} from 'src/components/lightDarkTheme';

export interface IHeader2Props {
  onSave: () => void;
  onCancel: () => void;
  title: string;
}

export interface IHeader2State {}
export class Header2 extends React.PureComponent<IHeader2Props, IHeader2State> {
  declare context: React.ContextType<typeof context>;

  override render() {
    return (
      <View style={styles.header}>
        <View style={styles.row1}>
          <TouchableOpacity onPress={this.props.onSave} style={styles.btn}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onCancel} style={styles.btn}>
            <Text style={[styles.cancelText, contentColor(this.context.theme)]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </View>
    );
  }
}

const usedWidth = width - 20;

const styles = StyleSheet.create({
  header: {
    width: usedWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: usedWidth,
    flexDirection: 'row-reverse',
  },
  saveText: {
    color: Colors.mainColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  cancelText: {
    fontSize: 18,
  },
  btn: {
    padding: 20,
  },
  title: {
    fontSize: titleFontSize,
  },
});
