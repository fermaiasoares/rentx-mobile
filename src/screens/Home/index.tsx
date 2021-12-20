import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';

import Logo from '../../assets/logo.svg';

import { Car, CarData } from '../../components/Car';

export function Home(){
  const navigation = useNavigation();

  const carData: CarData[] = [
    {
      id: '1',
      brand: 'Fiat',
      name: 'Uno',
      rent: {
        period: 'Ao dia',
        price: 100,
      },
      thumbnail: 'https://i.imgur.com/7jtQW9A.png',
    }
  ];

  function handleCarDetails() {
    navigation.navigate('CarDetails');
    console.log('Clicou');
  }

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

          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={carData}
        keyExtractor={car => car.id}
        renderItem={({ item }) => 
          <Car 
            data={item} 
            onPress={handleCarDetails}
          />
        }
      />

    </Container>
  );
}