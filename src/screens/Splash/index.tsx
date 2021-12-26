import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withTiming, 
  Extrapolate,
  interpolate,
  runOnJS
} from 'react-native-reanimated';

import { Container } from './styles';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

export function Splash() {
  const navigation = useNavigation();
  const splashAnimation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [0, -50], Extrapolate.CLAMP),
        }
      ]
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, .3, 1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0], Extrapolate.CLAMP),
        }
      ]
    }
  });

  function startApp() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50, 
      { duration: 1000 }, 
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    )
  }, [])

  return (
    <Container>
      <StatusBar 
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={180} height={60}/>
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}