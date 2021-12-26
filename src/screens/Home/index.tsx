import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { 
  CarList, 
  Container, 
  Header, 
  HeaderContent, 
  TotalCars 
} from './styles';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const navigation = useNavigation();
  const theme = useTheme();
  
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive: (event, ctx: any) => {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd: () => {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  const myCarButtonAnimationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  })
  
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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

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

      { loading ? <LoadAnimation /> : 
        <CarList
          data={cars}
          keyExtractor={ item => item.id}
          renderItem={({ item }) => <Car 
            data={item}
            onPress={() => handleCarDetails(item)}
            />}
        />
      }

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
      >
        <Animated.View
          style={[
            myCarButtonAnimationStyle,
            styles.myCarButton,
            {
              backgroundColor: theme.colors.main.default
            }
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
          >
            <Ionicons 
              name='ios-car-sport'
              size={32}
              color={theme.colors.shape.default}
              />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  myCarButton: {
    position: 'absolute',
    bottom: RFValue(20),
    right: RFValue(20),
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(30),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  }
})