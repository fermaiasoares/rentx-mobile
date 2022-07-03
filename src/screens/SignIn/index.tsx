import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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

import { useAuth } from '../../hooks/auth';

import { database } from '../../database';

export function SignIn() {
  const theme = useTheme();
  const navigation = useNavigation();
  const { signIn, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function loadData() {
      const userCollection = database.get('users');
      const users = await userCollection.query().fetch();
      console.log(users);
    }

    loadData();
  }, [])

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep');
  }

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

      await signIn({ email, password });

      navigation.navigate('Home');
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
            loading={loading}
            onPress={handleSignIn}
            />

          <Button
            title="Criar conta gratuita"
            onPress={handleNewAccount}
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