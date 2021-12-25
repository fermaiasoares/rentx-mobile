import React from 'react';

import { Container, Loading, Text } from './styles';

interface Props {
  text?: string;
  size?: 'small' | 'large';
  color?: string;
}

export function Load({text, ...rest}: Props) {
  return (
    <Container>
      <Loading {...rest}/>
      { text && <Text {...rest}>{text}</Text> }
    </Container>
  );
}