import React from 'react';
import LottieView from 'lottie-react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Container } from './styles';

import loadingCar from '../../assets/loading-car.json';

export function LoadAnimation(){
  return (
    <Container>
      <LottieView
        style={{
          height: RFValue(200),
        }}
        resizeMode='contain'
        source={loadingCar}
        autoPlay
        loop
      />
    </Container>
  );
}