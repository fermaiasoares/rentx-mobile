import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';

import {
    Container,
    Content,
    Header,
    HeaderTitle,
    HeaderTop,
    LogoutButton,
    Option,
    Options,
    OptionTitle,
    Photo,
    PhotoButton,
    PhotoContainer,
    Section
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input/index';
import { Button } from '../../components/Button';

type IOptions = 'dataEdit' | 'passwordEdit';

export function Profile() {
    const [option, setOption] = useState<IOptions>('dataEdit');

    const { user } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    function handleOptionChange(option: IOptions) {
        setOption(option);
    }

    function handleSignOut() { }

    return (
        <KeyboardAvoidingView
            enabled
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <HeaderTop>
                        <BackButton color={theme.colors.shape.default} onPress={handleBack} />
                        <HeaderTitle>Editar Perfil</HeaderTitle>
                        <LogoutButton onPress={handleSignOut}>
                            <Feather name='power' size={24} color={theme.colors.shape.default} />
                        </LogoutButton>
                    </HeaderTop>

                    <PhotoContainer>
                        <Photo source={{ uri: 'https://github.com/fermaiasoares.png' }} />
                        <PhotoButton onPress={() => { }}>
                            <Feather name='camera' size={24} color={theme.colors.shape.default} />
                        </PhotoButton>
                    </PhotoContainer>
                </Header>

                <Content>
                    <Options>
                        <Option
                            active={option === 'dataEdit'}
                            onPress={() => handleOptionChange('dataEdit')}
                        >
                            <OptionTitle active={option === 'dataEdit'}>
                                Dados
                            </OptionTitle>
                        </Option>
                        <Option
                            active={option === 'passwordEdit'}
                            onPress={() => handleOptionChange('passwordEdit')}
                        >
                            <OptionTitle active={option === 'passwordEdit'}>
                                Troar senha
                            </OptionTitle>
                        </Option>
                    </Options>

                    {
                        option === 'dataEdit'
                            ? (
                                <Section>
                                    <Input
                                        iconName="user"
                                        defaultValue={user.name}
                                        autoCorrect={false}
                                    />
                                    <Input
                                        iconName='mail'
                                        editable={false}
                                        defaultValue={user.email}
                                    />
                                    <Input
                                        iconName='credit-card'
                                        defaultValue={user.driver_license}
                                        keyboardType='numeric'
                                    />
                                </Section>
                            )
                            : (
                                <Section>
                                    <Input
                                        iconName="lock"
                                        placeholder='Senha atual'
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        type='password'
                                    />
                                    <Input
                                        iconName="lock"
                                        placeholder='Nova senha'
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        type='password'
                                    />
                                    <Input
                                        iconName="lock"
                                        placeholder='Confirmar senha'
                                        autoCorrect={false}
                                        autoCapitalize='none'
                                        type='password'
                                    />
                                </Section>
                            )
                    }

                    <Button title='Aplicar mudanças'/>
                </Content>
            </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}