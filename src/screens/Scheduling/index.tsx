import React, { useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

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
import { Calendar, MarkedDateProps, DateData, generateInterval, getPlatformDate, format } from '../../components/Calendar';

import { CarDTO } from '../../dtos/CarDTO';

interface Params {
  car: CarDTO;
}

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

export function Scheduling() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params;

  const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: DateData) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy')
    })
  }

  function rentalConfirmHandle() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert('Aviso', 'Selecione um período para a reserva');
    } else {
      navigation.navigate('ScheduleDetails', {
        car,
        dates: Object.keys(markedDates),
      });
    }
  }

  return (
    <Container>
      <Header>
        <StatusBar 
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        <BackButton onPress={handleBack}/>

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue selected={!!rentalPeriod.start}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <Arrow />
          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue selected={!!rentalPeriod.end}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title='Confirmar'
          onPress={rentalConfirmHandle}
        />
      </Footer>
    </Container>
  );
}