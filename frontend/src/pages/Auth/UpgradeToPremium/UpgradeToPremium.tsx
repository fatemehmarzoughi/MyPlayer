import {NavigationProp} from '@react-navigation/native';
import React, {useCallback, useContext,useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {Attributes,getPlans, Plan, PlanType, updateUser} from 'src/API';
import {gray, mainColor, toastMessageDuration} from 'src/assets';
import {contentColor,Header, PageWrapper} from 'src/components';
import Context from 'src/context/context';

import {styles} from './style';

interface IUpgradeToPremiumProps {
  navigation: NavigationProp<any, any>;
}

export const UpgradeToPremium = React.memo(
  ({navigation}: IUpgradeToPremiumProps) => {
    const context = useContext(Context);

    const [selectedPlan, setSelectedPlan] = useState<number>();
    const [plans, setPlans] = useState<Attributes<Plan>[]>();

    useEffect(() => {
      getPlans({
        onSuccess: ({data}) => setPlans(data),
        onError: () => {},
      });
    }, []);

    const handleSelectPlan = useCallback(() => {
      updateUser({
        reqBody: {
          plan: {
            connect: [{id: selectedPlan ?? 3}],
          },
        },
        onSuccess: () => {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Saved changes',
            autoHide: true,
            visibilityTime: toastMessageDuration,
            topOffset: 30,
            bottomOffset: 40,
          });
          navigation.navigate('Profile');
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
    }, [selectedPlan, navigation]);

    return (
      <ScrollView>
        <PageWrapper>
          <Header
            title="Choose Your Plan"
            customClick={() => navigation.goBack()}
          />
          <Text style={styles.subTitle}>
            By choosing our premium account, you can watch with no ads.
          </Text>

          <View style={styles.plans}>
            {plans?.map(p => {
              if (p.attributes.type === PlanType.free) return null;

              const isSelected = selectedPlan === p.id;

              return (
                <TouchableOpacity
                  key={p.id}
                  onPress={() => setSelectedPlan(p.id)}
                  style={[
                    styles.plan,
                    isSelected
                      ? {borderColor: mainColor, borderWidth: 3}
                      : {borderColor: gray, borderWidth: 1},
                  ]}>
                  <Icon
                    name="checkmark-outline"
                    size={45}
                    color={isSelected ? mainColor : gray}
                  />
                  <View style={styles.planTitle}>
                    <Text
                      style={[
                        styles.planTitleText,
                        contentColor(context.theme),
                        isSelected
                          ? {fontWeight: 'bold'}
                          : {fontWeight: 'normal'},
                      ]}>
                      {p.attributes.title}
                    </Text>
                    <Text
                      style={[
                        styles.planTitleText,
                        contentColor(context.theme),
                        isSelected
                          ? {fontWeight: 'bold'}
                          : {fontWeight: 'normal'},
                      ]}>
                      {p.attributes.price} $
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.planSubTitle,
                      {color: isSelected ? mainColor : gray},
                    ]}>
                    {p.attributes.subTitle} Account
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity onPress={handleSelectPlan} style={styles.btn}>
            <Text style={styles.btnText}>Select Plan</Text>
          </TouchableOpacity>
        </PageWrapper>
      </ScrollView>
    );
  },
);
