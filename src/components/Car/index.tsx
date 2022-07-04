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

import { Car } from '../../database/models/Car';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Props extends RectButtonProps {
  data: Car;
}

export function CarCard({ data, ...rest }: Props) {
  const priceFormatted = data.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).replace(/^(\D+)/, '$1 ');

  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{priceFormatted}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: data.thumbnail }} />
    </Container>
  );
}