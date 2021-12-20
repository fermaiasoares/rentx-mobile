import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import { 
  Acessories,
  Brand,
  CarImages, 
  Container, 
  Content, 
  DateInfo, 
  DateTitle, 
  DateValue, 
  Description, 
  Details, 
  Footer,
  Header, 
  Name, 
  Period, 
  Price,
  Rent, 
  RentalPeriod,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLable,
  RentalPriceQuota,
  RentalPriceTotal, 
} from './styles';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';

import Speed from '../../assets/speed.svg';
import Gasoline from '../../assets/gasoline.svg';
import { CalendarIcon } from './styles';

export function ScheduleDetails() {
  const theme = useTheme();

  const accessories = [
    {
      name: 'Automático',
      icon: Speed
    },
    {
      name: 'Gasoline',
      icon: Gasoline
    },
    {
      name: 'Pessoas',
      icon: Gasoline
    },
    {
      name: 'Automático',
      icon: Speed
    },
    {
      name: 'Gasoline',
      icon: Gasoline
    },
    {
      name: 'Pessoas',
      icon: Gasoline
    },
  ]

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}}/>
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrls={['https://cdn.picpng.com/audi/small/audi-face-28582.png']} 
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Audi</Brand>
            <Name>RS 5 Coupé</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580,00</Price>
          </Rent>
        </Details>

        <Acessories>
          { accessories.map(accessory => <Accessory name={accessory.name} icon={accessory.icon} />) }
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={24} color={theme.colors.shape.default} />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>10/12/2021</DateValue>
          </DateInfo>
          <Feather name="chevron-right" size={24} color={theme.colors.text.default} />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>18/12/2021</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLable>Total</RentalPriceLable>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580,00 x 3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900,00</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button 
          title='Alugar agora' 
          color={theme.colors.main.success}
        />
      </Footer>
    </Container>
  );
}