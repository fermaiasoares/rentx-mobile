import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

// const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import {
    CarList,
    Container,
    Header,
    HeaderContent,
    TotalCars
} from './styles';

import Logo from '../../assets/logo.svg';

import { CarCard } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { database } from '../../database/index';
import { Car } from '../../database/models/Car';

export function Home() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { isConnected } = useNetInfo();
    const navigation = useNavigation();
    const theme = useTheme();

    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);

    // const onGestureEvent = useAnimatedGestureHandler({
    //   onStart: (_, ctx: any) => {
    //     ctx.positionX = positionX.value;
    //     ctx.positionY = positionY.value;
    //   },
    //   onActive: (event, ctx: any) => {
    //     positionX.value = ctx.positionX + event.translationX;
    //     positionY.value = ctx.positionY + event.translationY;
    //   },
    //   onEnd: () => {
    //     positionX.value = withSpring(0);
    //     positionY.value = withSpring(0);
    //   }
    // });

    const myCarButtonAnimationStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value }
            ]
        }
    })

    function handleCarDetails(car: Car) {
        navigation.navigate('CarDetails', { car });
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars');
    }

    async function offlineSynchronize() {
        try {
            await synchronize({
                database,
                pullChanges: async ({ lastPulledAt }) => {
                    const { data } = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
                    const { changes, latestVersion } = data;
                    return { changes, timestamp: latestVersion };
                },
                pushChanges: async ({ changes }) => {
                    const user = changes.users;
                    await api.post(`/users/sync`, user);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let isMounted = true;
        async function fetchCars() {
            try {
                const carsCollection = database.get<Car>('cars');
                const cars = await carsCollection.query().fetch();

                if (isMounted) setCars(cars);
            } catch (error) {
                Alert.alert('Erro', 'Erro ao buscar carros');
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchCars();
        return () => {
            isMounted = false
        };
    }, [])

    useEffect(() => {
        if (isConnected) {
            offlineSynchronize();
        }
    }, [isConnected])

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

                    {cars.length > 0 &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>

            {loading ? <LoadAnimation /> :
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <CarCard
                        data={item}
                        onPress={() => handleCarDetails(item)}
                    />}
                />
            }

            {/* <PanGestureHandler
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
      </PanGestureHandler> */}
        </Container>
    );
}

// const styles = StyleSheet.create({
//   myCarButton: {
//     position: 'absolute',
//     bottom: RFValue(20),
//     right: RFValue(20),
//     width: RFValue(60),
//     height: RFValue(60),
//     borderRadius: RFValue(30),
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 5,
//   }
// })