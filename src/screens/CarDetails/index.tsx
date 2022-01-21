import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { 
  About,
  Acessories,
  CarImages, 
  Container, 
  Footer,
  Header, 
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
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';

interface Params {
  car: CarDTO
}

export function CarDetails() {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return { 
      height: interpolate(
        scrollY.value, 
        [0, 200], 
        [220, 40], 
        Extrapolate.CLAMP
      ),
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
      )
    }
  })

  const { car } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  function handleConfirmRental() {
    navigation.navigate('Scheduling', { car });
  }

  return (
    <Container>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
      />

      <Animated.View style={[
        headerStyleAnimation, 
        styles.header,
        { backgroundColor: theme.colors.background.secondary },
      ]}>
        <Header>
          <BackButton onPress={handleBack} style={styles.back} />
        </Header>

        <Animated.View style={[sliderCarsStyleAnimation]}>
          <CarImages>
            <ImageSlider
              imagesUrls={car.photos} 
              />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: RFValue(16),
          paddingTop: getStatusBarHeight() + RFValue(160),
          alignItems: 'center'
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{car.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).replace(/^(\D+)/, '$1 ')}</Price>
          </Rent>
        </Details>

        <Acessories>
          { 
            car.accessories.map(accessory => 
              <Accessory
                key={accessory.id}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ) 
          }
        </Acessories>

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button 
          title='Escolher período de aluguel'
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  },
  back: {
    zIndex: 1
  }
})