import React from 'react';
import { StatusBar } from 'react-native';

import { 
  Container, 
  Content, 
  DateInfo, 
  DateTitle, 
  DateValue, 
  Footer, 
  Header, 
  RentalPeriod, 
  Title 
} from './styles';

import Arrow from '../../assets/arrow.svg';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

export function Scheduling() {
  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <BackButton onPress={() => {}}/>

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={true}>
              10 Dezembro 2021
            </DateValue>
          </DateInfo>
          <Arrow />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={false}>
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button title='Confirmar' />
      </Footer>
    </Container>
  );
}