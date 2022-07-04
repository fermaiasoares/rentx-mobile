import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

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
import * as Yup from 'yup';

type IOptions = 'dataEdit' | 'passwordEdit';

export function Profile() {
    const { user, signOut, updateUser } = useAuth();

    const [option, setOption] = useState<IOptions>('dataEdit');
    const [avatar, setAvatar] = useState<string>(user.avatar);
    const [name, setName] = useState<string>(user.name);
    const [driverLicense, setDriverLicense] = useState<string>(user.driver_license);

    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    function handleOptionChange(option: IOptions) {
        setOption(option);
    }

    async function handleAvatarSelect() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.cancelled) {
            const { uri } = result as { uri: string };
            setAvatar(uri);
        }
    }

    async function handleProfileUpdate() {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigatório'),
                driverLicense: Yup.string().required('CNH é obrigatório'),
            })
            const data = { name, driverLicense };
            await schema.validate(data);

            await updateUser({
                id: user.id,
                user_id: user.user_id,
                email: user.email,
                name,
                driver_license: driverLicense,
                avatar,
                token: user.token
            })

            Alert.alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.log(error);
            if (error instanceof Yup.ValidationError) {
                Alert.alert('Opa', error.message);
            }
            Alert.alert('Não foi possível atualizar o perfil.');
        }
    }

    async function handleSignOut() {
        Alert.alert(
            'Tem certeza?',
            'Se você sair, irá precisar de internet para conectar-se novamente',
            [
                {
                    text: 'Sair',
                    onPress: () => signOut()
                },
                {
                    text: 'Cancelar',
                    onPress: () => {},
                    style: 'cancel'
                }
            ]
        )
    }

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
                        { !!avatar && <Photo source={{ uri: avatar }} /> }
                        <PhotoButton onPress={handleAvatarSelect}>
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
                                Trocar senha
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
                                        onChangeText={setName}
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
                                        onChangeText={setDriverLicense}
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

                    <Button
                        onPress={handleProfileUpdate}
                        title='Salvar alterações'
                    />
                </Content>
            </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}