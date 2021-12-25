import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { 
  About,
  Acessories,
  CarImages, 
  Container, 
  Footer,
  Header, 
  Content, 
  Details, 
  Description, 
  Brand, 
  Name, 
  Rent, 
  Period, 
  Price, 
} from './styles';

import { CarDTO } from '../../dtos/CarDTO';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
  car: CarDTO
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const { car } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

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
            }).replace(/^(\D+)/, '$1 ')}</Price>
          </Rent>
        </Details>

        <Acessories>
          { 
            car.accessories.map(accessory => 
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ) 
          }
        </Acessories>

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button 
          title='Escolher período de aluguel'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}