import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { 
  About, 
  Brand, 
  CarImage, 
  Container, 
  Details, 
  Name, 
  Period, 
  Price, 
  Rent, 
  Type 
} from './styles';

import Gasoline from '../../assets/gasoline.svg';

export interface CarData {
  id: string;
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  },
  thumbnail: string;
}

interface Props extends RectButtonProps {
  data: CarData;
}

export function Car({ data, ...rest }: Props) {
  const priceFormatted = data.rent.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).replace(/^(\D+)/, '$1 ');

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{priceFormatted}</Price>
          </Rent>

          <Type>
            <Gasoline />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} />
    </Container>
  );
}