import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

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

import { UserDTO } from '../../../dtos/CarDTO';
import * as Yup from 'yup';

interface Params {
  user: UserDTO;
}

export function SignUpSecondStep() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        password: Yup.string()
          .required('Senha é obrigatória'),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Senhas não conferem')
          .required('Confirmar senha é obrigatório'),
      });

      const data = { password, passwordConfirmation };

      await schema.validate(data, {
        abortEarly: false,
      });

      navigation.navigate('Confirmation', {
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar.`,
        nextScreenRoute: 'SignIn',
      });
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
              <Bullet />
              <Bullet actived={true} />
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
            <FormTitle>2. Senha</FormTitle>

            <Input
              type='password'
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />

            <Input 
              type='password'
              iconName="lock"
              placeholder="Confirmar senha"
              onChangeText={setPasswordConfirmation}
              value={passwordConfirmation}
            />
          </Form>

          <Button 
            title="Cadastrar"
            color={theme.colors.main.success}
            onPress={handleRegister}
            />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}