import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import { Container, ImageIndexes, ImageIndex, CarImageWrapper, CarImage } from './styles';

interface Props {
  imagesUrls: string[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ imagesUrls }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) =>{
    const { viewableItems, changed } = info;

    if (changed.length) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  });

  return (
    <Container>
      <ImageIndexes>
        {
          imagesUrls.map((_, index) => (
            <ImageIndex
              key={index}
              actived={index === currentIndex ? true : false}
            />
          ))
        }
      </ImageIndexes>

      <FlatList 
          data={imagesUrls}
          keyExtractor={(item) => item}
          renderItem={({item}) => 
            <CarImageWrapper>
              <CarImage source={{ uri: item }} />
            </CarImageWrapper>
          }
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={indexChanged.current}
          horizontal
        />  
    </Container>
  );
}