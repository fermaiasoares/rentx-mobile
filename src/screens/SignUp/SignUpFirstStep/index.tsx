import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { 
  Container,
  Header, 
  Steps
} from './styles';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet/index';
import { Button } from '../../../components/Button';
import { Title, SubTitle, Form, FormTitle } from './styles';
import { Input } from '../../../components/Input/index';

export function SignUpFirstStep() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  function handleBack() {
    navigation.goBack();
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup
          .string().email('E-mail inválido')
          .required('E-mail é obrigatório'),
        driverLicense: Yup.string().required('CNH é obrigatório'),
      })

      const data = { name, email, driverLicense };
      await schema.validate(data, {
        abortEarly: false,
      });
      
      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Ops!', error.errors.join('\n'));
      }
    } 
  }
  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle='dark-content'
            backgroundColor="transparent"
            translucent 
            />
          <Header>
            <BackButton onPress={handleBack}/>

            <Steps>
              <Bullet actived={true}/>
              <Bullet />
            </Steps>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>

          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>

            <Input 
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />

            <Input 
              iconName="mail" 
              placeholder="E-mail"
              autoCapitalize='none'
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />

            <Input 
              iconName="credit-card"
              placeholder="CNH" 
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button 
            title="Próximo"
            onPress={handleNextStep}
            />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}