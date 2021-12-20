import React from 'react';

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

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';

import Speed from '../../assets/speed.svg';
import Gasoline from '../../assets/gasoline.svg';
import { Button } from '../../components/Button';

export function CarDetails(){
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

        <About>
          Este é automóvel desportivo. 
          Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. 
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>

      <Footer>
        <Button title='Escolher período de aluguel' />
      </Footer>
    </Container>
  );
}