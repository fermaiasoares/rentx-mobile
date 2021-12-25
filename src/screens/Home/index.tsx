import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { 
  CarList, 
  Container, 
  Header, 
  HeaderContent, 
  MyCarButton, 
  TotalCars 
} from './styles';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Load } from '../../components/Load';
import { useTheme } from 'styled-components';

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const responseData = await api.get<CarDTO[]>('/cars');
        setCars(responseData.data);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar carros');
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)}
          />

          { cars.length > 0 && 
            <TotalCars>
              Total de {cars.length} carros
            </TotalCars>
          }
        </HeaderContent>
      </Header>

      { loading ? <Load /> : 
        <CarList
          data={cars}
          keyExtractor={ item => item.id}
          renderItem={({ item }) => <Car 
            data={item}
            onPress={() => handleCarDetails(item)}
            />}
        />
      }

      <MyCarButton
        onPress={handleOpenMyCars}
      >
        <Ionicons 
          name='ios-car-sport'
          size={32}
          color={theme.colors.shape.default}
        />
      </MyCarButton>

    </Container>
  );
}