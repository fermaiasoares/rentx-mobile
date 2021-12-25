import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, ButtonText, Container, Content, Footer, ScheduleInfoText, ScheduleInfoTitle } from './styles';

import Brand from '../../assets/logo_background_gray.svg';
import Done from '../../assets/done.svg';

export function ScheduleConfirmation() {
  const navigation = useNavigation();

  function handleToHome() {
    navigation.navigate('Home');
  }

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />

      <Brand width={useWindowDimensions().width}/>

      <Content>
        <Done />
        <ScheduleInfoTitle>Carro alugado!</ScheduleInfoTitle>
        <ScheduleInfoText>
          Agora você só precisa ir {'\n'}
          até a concessionária da RENTX {'\n'}
          pegar o seu automóvel.
        </ScheduleInfoText>
      </Content>

      <Footer>
        <Button onPress={handleToHome}>
          <ButtonText>Ok</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
}