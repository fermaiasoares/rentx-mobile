import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import { 
  Appointments, 
  AppointmentsList, 
  AppointmentsQuantity, 
  AppointmentsTitle, 
  CarFooter, 
  CarFooterDate, 
  CarFooterPeriod, 
  CarFooterTitle, 
  CarWrapper, 
  Container, 
  Content, 
  Header, 
  SubTitle, 
  Title 
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import ArrowSvg from '../../assets/arrow.svg';

export interface CarProps {
  car: CarDTO;
  user_id: number;
  id: number;
}

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser/?user_id=1');
        setCars(response.data);
      } catch (error) {
        console.log(error);
        Alert.alert('Erro', 'Erro ao listar seu carros.');
      } finally {
        setLoading(false);
        console.log(cars);
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar />

        <BackButton 
          onPress={handleBack}
        />
        <Title>
          Seus agendamentos, {`\n`} 
          estão aqui
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      <Content>
        <Appointments>
           <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
           <AppointmentsQuantity>05</AppointmentsQuantity>
        </Appointments>

        { loading ? <Load /> : 
          <AppointmentsList 
            data={cars}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>25/12/2021</CarFooterDate>
                    <ArrowSvg color={theme.colors.text.default}/>
                    <CarFooterDate>31/12/2021</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        }
      </Content>
    </Container>
  );
}