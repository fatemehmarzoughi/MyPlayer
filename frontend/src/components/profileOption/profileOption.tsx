import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {dark, gray, mainColor} from 'src/assets';
import {contentColor} from 'src/components';
import Context from 'src/context/context';
import ToggleSwitch from 'toggle-switch-react-native';

import {styles} from './styles';

export type IProfileOption = {
  title: string;
  subTitle?: string;
  action: () => void;
  leftIcon: React.ReactNode | string;
  rightIcon?: React.ReactNode | string;
  isDisable: boolean;
  toggle?: {
    isOn: boolean;
    onToggle?: () => void;
  };
};

export const ProfileOption = React.memo<IProfileOption>(
  ({title, subTitle, action, isDisable, leftIcon, rightIcon, toggle}) => {
    const context = useContext(Context);

    return (
      <TouchableOpacity style={styles.option} onPress={action}>
        <View style={styles.wrapper}>
          <View style={styles.optionTitleIcon}>
            {typeof leftIcon == 'string' ? (
              <Icon2
                name={leftIcon}
                size={20}
                color={isDisable ? gray : contentColor(context.theme).color}
              />
            ) : (
              leftIcon
            )}
            <Text
              style={
                isDisable
                  ? styles.disabledOptionTitle
                  : [styles.optionTitle, contentColor(context.theme)]
              }>
              {title}
            </Text>
          </View>
          {toggle ? (
            <ToggleSwitch
              isOn={toggle.isOn}
              onColor={isDisable ? gray : mainColor}
              offColor={isDisable ? gray : dark}
              size="small"
              onToggle={toggle.onToggle}
            />
          ) : (
            <></>
          )}
          {rightIcon ? (
            typeof rightIcon === 'string' ? (
              <Icon
                name={rightIcon}
                size={35}
                color={isDisable ? gray : contentColor(context.theme).color}
              />
            ) : (
              rightIcon
            )
          ) : (
            <></>
          )}
        </View>
        {subTitle !== undefined ? (
          <Text
            style={[
              styles.subTitleOptionText,
              isDisable ? {color: gray} : contentColor(context.theme),
            ]}>
            {subTitle}
          </Text>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    );
  },
);
