import {NavigationProp} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, Text, TouchableOpacity,View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {height, mainColor, white, width} from 'src/assets';
import Context from 'src/context/context';

import {styles} from './style';

const unset = '#70757a00';
import animation2Source from '../../assets/Images/bookmark.json';
import animation4Source from '../../assets/Images/live2.json';
import animation1Source from '../../assets/Images/offline2.json';
import animation3Source from '../../assets/Images/premium.json';

interface Props {
  navigation: NavigationProp<any, any>;
}

export const OnBoarding = React.memo<Props>(({navigation}) => {
  const context = useContext(Context);

  const [currentStatus, setCurrentStatus] = useState(1);
  const [caseColors, setCaseColors] = useState([
    mainColor,
    unset,
    unset,
    unset,
  ]);
  const [nextText, setNextText] = useState('Next');
  const [lastPage, setLastPage] = useState(false);
  const [visibleCase1, setVisibleCase1] = useState(false);

  const translateXValue = useRef(new Animated.Value((3 * width) / 2)).current;
  const translateXValueIsRotate = useRef(
    new Animated.Value((3 * height) / 2),
  ).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('progress', progress);
    Animated.timing(progress, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start();

    const onChange = ({window: {width, height}}) => {
      context.setIsRotate(width > height);
    };

    Dimensions.addEventListener('change', onChange);
    return () => (Dimensions as any).removeEventListener('change', onChange);
  }, [context, progress]);

  const swipeLeft = () => {
    if (currentStatus >= 4) return;

    const toX = [width / 2, -width / 2, (-3 * width) / 2];
    const toY = [height / 2, -height / 2, (-3 * height) / 2];

    Animated.timing(translateXValue, {
      toValue: toX[currentStatus - 1],
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateXValueIsRotate, {
      toValue: toY[currentStatus - 1],
      duration: 200,
      useNativeDriver: true,
    }).start();

    const newColors = caseColors.map((_, idx) =>
      idx === currentStatus ? mainColor : unset,
    );

    setCaseColors(newColors);
    setCurrentStatus(prev => prev + 1);
    setNextText(currentStatus === 3 ? 'Get Started' : 'Next');
    setLastPage(currentStatus === 3);
  };

  const swipeRight = () => {
    if (currentStatus <= 1) return;

    const toX = [(3 * width) / 2, width / 2, -width / 2];
    const toY = [(3 * height) / 2, height / 2, -height / 2];

    Animated.timing(translateXValue, {
      toValue: toX[currentStatus - 2],
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateXValueIsRotate, {
      toValue: toY[currentStatus - 2],
      duration: 200,
      useNativeDriver: true,
    }).start();

    const newColors = caseColors.map((_, idx) =>
      idx === currentStatus - 2 ? mainColor : unset,
    );

    setCaseColors(newColors);
    setCurrentStatus(prev => prev - 1);
    setNextText('Next');
    setLastPage(false);
    setVisibleCase1(currentStatus - 1 === 1);

    if (currentStatus - 1 === 1) {
      Animated.timing(progress, {
        toValue: 0,
        duration: 6000,
        useNativeDriver: true,
      }).start();
    }
  };

  const gotoNextComponent = () => {
    navigation.navigate('EntriesOptions');
  };

  const pageData = [
    {
      animation: animation1Source,
      text: 'You can enjoy listening to Musics or Watching Videos by saving your lovly items and using the MyPlayer Offline feature',
    },
    {animation: animation2Source, text: 'Second page'},
    {animation: animation3Source, text: 'Third page'},
    {animation: animation4Source, text: 'Fourth page'},
  ];

  return (
    <View
      style={context.isRotate ? styles.containerIsRotate : styles.container}>
      <StatusBar backgroundColor="#333" translucent={false} hidden />
      <GestureRecognizer
        style={styles.GestureRecognizerStyle}
        onSwipeRight={swipeRight}
        onSwipeLeft={swipeLeft}>
        <Animated.View
          style={[
            context.isRotate ? styles.AllpagesIsRotate : styles.Allpages,
            {
              transform: [
                {
                  translateX: context.isRotate
                    ? translateXValueIsRotate
                    : translateXValue,
                },
              ],
            },
          ]}>
          {pageData.map((page, index) => (
            <View
              key={index}
              style={
                context.isRotate ? styles.pageStyleIsRotate : styles.pageStyle
              }>
              <View style={styles.content}>
                <LottieView
                  loop
                  autoPlay
                  style={context.isRotate ? styles.ImageIsRotate : styles.image}
                  source={page.animation}
                />
                <Text style={styles.contentText}>{page.text}</Text>
              </View>
            </View>
          ))}
        </Animated.View>
      </GestureRecognizer>

      <View style={styles.dots}>
        {caseColors.map((color, idx) => (
          <View key={idx} style={[styles.dot, {backgroundColor: color}]} />
        ))}
      </View>

      <View style={styles.bottomBarStyle}>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={nextText === 'Get Started' ? gotoNextComponent : swipeLeft}>
          <Text style={{color: white}}>{nextText}</Text>
        </TouchableOpacity>

        {!lastPage && (
          <TouchableOpacity onPress={gotoNextComponent}>
            <Text style={styles.skipBtn}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});
