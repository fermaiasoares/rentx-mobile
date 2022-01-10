import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { 
  Button, 
  ButtonText, 
  Container, 
  Content, 
  Footer,
  InfoText,
  InfoTitle
} from './styles';

import Brand from '../../assets/logo_background_gray.svg';
import Done from '../../assets/done.svg';

import { RootStackParamList } from '../../routes/paramList';

interface Params {
  title: string;
  message: string;
  nextScreenRoute?: keyof RootStackParamList;
}

export function Confirmation() {
  const navigation = useNavigation();
  const route = useRoute();

  const { title, message, nextScreenRoute } = route.params as Params;

  function handleToHome() {
    navigation.navigate(nextScreenRoute);
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
        <InfoTitle>{title}</InfoTitle>
        <InfoText>{message}</InfoText>
      </Content>

      <Footer>
        <Button onPress={handleToHome}>
          <ButtonText>Ok</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
}