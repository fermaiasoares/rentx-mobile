import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import { Container, Footer, Form, Header, SubTitle, Title } from './styles';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function SignIn() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignIn() {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Digite um email válido!')
        .required('E-mail é obrigatório!'),
      password: Yup.string()
        .required('Senha é obrigatória!')
    });

    try {
      await schema.validate({
        email,
        password,
      }, {
        abortEarly: false
      });

      //TODO Realizar Login

    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        Alert.alert('Erro na autenticação!', error.errors.join('\n'));
        return;
      }

      Alert.alert('Erro na autenticação!', 'Ocorreu um erro ao fazer login!\nVerifique suas credenciais');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior='position'
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>
            Estamos {'\n'}
            quase lá
          </Title>

          <SubTitle>
            Faça seu login para começar {'\n'}
            uma experiência incrível.
          </SubTitle>
        </Header>

        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType='email-address'
            iconName="mail"
            placeholder="E-mail"
            onChangeText={setEmail}
            value={email}
            />
          <Input
            type="password"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType='default'
            iconName="lock"
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
            />
        </Form>

        <Footer>
          <Button 
            title="Login"
            enabled={!!email && !!password}
            loading={false}
            onPress={handleSignIn}
            />

          <Button
            title="Criar conta gratuita"
            onPress={() => {}}
            color={theme.colors.background.secondary}
            enabled
            light
            />
        </Footer>
      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}