import React from 'react';
import {
  Attributes,
  POST,
  Plan,
  PlanType,
  User,
  getPlans,
  updateUser,
} from 'src/API';
import Icon from 'react-native-vector-icons/Ionicons';
import Context from 'src/context/context';
import Toast from 'react-native-toast-message';
import {Header, contentColor} from 'src/components';
import {NavigationProp} from '@react-navigation/native';
import {gray, mainColor, toastMessageDuration} from 'src/assets';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {styles} from './style';

export interface IUpgradeToPremiumProps {
  navigation: NavigationProp<any, any>;
}

export interface IUpgradeToPremiumStates {
  selectedPlan?: number;
  plans?: Attributes<Plan>[];
}
export class UpgradeToPremium extends React.PureComponent<
  IUpgradeToPremiumProps,
  IUpgradeToPremiumStates
> {
  static override contextType = Context;
  declare context: React.ContextType<typeof Context>;

  constructor(props: IUpgradeToPremiumProps) {
    super(props);
    this.state = {};
  }

  override componentDidMount(): void {
    getPlans({
      onSuccess: ({data: plans}) => {
        this.setState({
          plans,
        });
      },
      onError: err => {},
    });
  }

  handleSelectPlan = async () => {
    updateUser({
      reqBody: {
        plan: {
          connect: [{id: this.state.selectedPlan ?? 3}],
        },
      },
      onSuccess: data => {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Saved changes',
          autoHide: true,
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
        this.props.navigation.navigate('Profile');
      },
      onError: err => {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: String(err),
          text2: 'Please try again later',
          autoHide: true,
          visibilityTime: toastMessageDuration,
          topOffset: 30,
          bottomOffset: 40,
        });
      },
    });
  };

  override render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Header
            title="Choose Your Plan"
            customClick={() => this.props.navigation.navigate('Profile')}
          />
          <Text style={styles.subTitle}>
            By choosing our premium account, you can watch with no ads.
          </Text>

          <View style={styles.plans}>
            {this.state.plans?.map(p => {
              if (p.attributes.type === PlanType.free) return null;
              else
                return (
                  <TouchableOpacity
                    key={p.id}
                    onPress={() =>
                      this.setState({
                        selectedPlan: p.id,
                      })
                    }
                    style={[
                      styles.plan,
                      this.state.selectedPlan === p.id
                        ? {borderColor: mainColor, borderWidth: 3}
                        : {borderColor: gray, borderWidth: 1},
                    ]}>
                    <Icon
                      name="checkmark-outline"
                      size={45}
                      color={
                        this.state.selectedPlan === p.id ? mainColor : gray
                      }
                    />
                    <View style={styles.planTitle}>
                      <Text
                        style={[
                          styles.planTitleText,
                          contentColor(this.context.theme),
                          this.state.selectedPlan === p.attributes.id
                            ? {fontWeight: 'bold'}
                            : {fontWeight: 'normal'},
                        ]}>
                        {p.attributes.title}
                      </Text>
                      <Text
                        style={[
                          styles.planTitleText,
                          contentColor(this.context.theme),
                          this.state.selectedPlan === p.id
                            ? {fontWeight: 'bold'}
                            : {fontWeight: 'normal'},
                        ]}>
                        {p.attributes.price} $
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.planSubTitle,
                        this.state.selectedPlan === p.id
                          ? {color: mainColor}
                          : {color: gray},
                      ]}>
                      {p.attributes.subTitle} Account
                    </Text>
                  </TouchableOpacity>
                );
            })}
          </View>
          <TouchableOpacity
            onPress={() => this.handleSelectPlan()}
            style={styles.btn}>
            <Text style={styles.btnText}>Select Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
