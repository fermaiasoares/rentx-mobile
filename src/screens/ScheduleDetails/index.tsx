import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { getPlatformDate } from '../../utils/getPlatformDate';
import { format } from '../../components/Calendar';
import { api } from '../../services/api';

import { 
  Acessories,
  Brand,
  CalendarIcon,
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

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Alert } from 'react-native';

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function ScheduleDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { car, dates } = route.params as Params;

  const rentTotal = car.rent.price * dates.length;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRentalConfirmation() {
    const schedulesByCars = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCars.data.unavailable_dates,
      ...dates,
    ];

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates,
    }).then(() => {
      navigation.navigate('ScheduleConfirmation');
    }).catch((error) => {
      console.log(error);
      Alert.alert('Erro ao reservar o carro', 'Não foi possível realizar a reserva. Tente novamente mais tarde.');
    })
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    })
  }, [])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}/>
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrls={car.photos} 
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{car.rent.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).replace(/(\D+)/, '$1 ')}</Price>
          </Rent>
        </Details>

        <Acessories>
          { car.accessories.map(accessory => 
            <Accessory
              key={accessory.type}
              name={accessory.name} 
              icon={getAccessoryIcon(accessory.type)}
            /> 
          )}
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={24} color={theme.colors.shape.default} />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>
          <Feather name="chevron-right" size={24} color={theme.colors.text.default} />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLable>Total</RentalPriceLable>
          <RentalPriceDetails>
            <RentalPriceQuota>
              {car.rent.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).replace(/(\D+)/, '$1 ')} x {dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>
              {rentTotal.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).replace(/(\D+)/, '$1 ')}
            </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button 
          title='Alugar agora' 
          color={theme.colors.main.success}
          onPress={handleRentalConfirmation}
        />
      </Footer>
    </Container>
  );
}