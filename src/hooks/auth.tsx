import React, { createContext, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';
import { database } from '../database';
import { User } from '../database/models/User';

interface IUser {
    id: string;
    user_id: string;
    name: string;
    email: string;
    driver_license: string;
    avatar: string;
    token: string;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: IUser;
    loading: boolean;
    updateUser: (user: IUser) => Promise<void>;
    error: boolean;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<IUser>({} as IUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function signIn({ email, password }: SignInCredentials): Promise<void> {
        try {
            setLoading(true);
            setError(false);
            const response = await api.post('/sessions', {
                email,
                password
            });

            const { token, user } = response.data;
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const userCollection = database.get<User>('users');
            await database.write(async () => {
                const userRecord = await userCollection.create((newUser) => {
                    newUser.user_id = user.id;
                    newUser.name = user.name;
                    newUser.email = user.email;
                    newUser.avatar = user.avatar;
                    newUser.driver_license = user.driver_license;
                    newUser.token = token;
                })

                const userData = userRecord._raw as unknown as IUser;
                setData(userData);
            })
        } catch (error) {
            throw new Error();
        } finally {
            setLoading(false);
        }
    }

    async function signOut(): Promise<void> {
        try {
            const userCollection = database.get<User>('users');
            await database.write(async () => {
                await userCollection.query().destroyAllPermanently();
                setData({} as User);
            })
        } catch (error) {
            throw new Error(error);
        }
    }

    async function updateUser(user: IUser): Promise<void> {
        try {
            const userCollection = database.get<User>('users');
            const userSelected = await userCollection.find(data.id);

            await database.write(async () => {
                await userSelected.update((userData) => {
                    userData.name = user.name;
                    userData.driver_license = user.driver_license;
                    userData.avatar = user.avatar;
                })
            })
            setData(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        async function loadUserData() {
            const userCollection = database.get<User>('users');
            const users = await userCollection.query().fetch();

            if (users.length > 0) {
                const userData = users[0]._raw as unknown as IUser;
                api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
                setData(userData);
            }
        }

        loadUserData();
    }, [])

    return (
        <AuthContext.Provider value={{
            user: data,
            loading,
            error,
            signIn,
            signOut,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };