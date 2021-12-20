import React from 'react';

import { Container, ImageIndexes, ImageIndex, CarImageWrapper, CarImage } from './styles';

interface Props {
  imagesUrls: string[];
}

export function ImageSlider({ imagesUrls }: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex actived={true}/>
        <ImageIndex actived={false}/>
        <ImageIndex actived={false}/>
        <ImageIndex actived={false}/>
      </ImageIndexes>

      <CarImageWrapper>
        <CarImage 
          source={{ uri: imagesUrls[0] }}
          resizeMode='contain'
        />
      </CarImageWrapper>
    </Container>
  );
}