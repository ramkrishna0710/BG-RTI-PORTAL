import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@utils/NavigationUtils';
import HomeScreen from '@screens/HomeScreen';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import DashboardScreen from '@screens/DashboardScreen';
import FileRTIScreen from '@screens/FileRTIScreen';
import ViewAllScreen from '@screens/ViewAllScreen';
import SettingsScreen from '@screens/SettingsScreen';
import ProfileScreen from '@screens/ProfileScreen';
import ApplicationScreen from '@screens/ApplicationScreen';
import { useAuth } from '@contexts/AuthContext';
import Splash from '@components/splash/Splash';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen options={{ animation: 'fade' }}  name="LoginScreen" component={LoginScreen} />
        <Stack.Screen options={{ animation: 'fade' }}  name="RegisterScreen" component={RegisterScreen} />
        {/* <Stack.Screen name="AppStack" component={AppStack} /> */}
    </Stack.Navigator>
);

const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="FileRTIScreen" component={FileRTIScreen} />
        <Stack.Screen name="ViewAllScreen" component={ViewAllScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ApplicationScreen" component={ApplicationScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
);

const Navigation = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Splash/>;
    }

    return (
        <NavigationContainer ref={navigationRef}>
            {isAuthenticated ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Navigation