import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screen/HomeScreen';
import DictionaryPage from '../screen/DictionaryPage';


const Tabs = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tabs.Navigator

                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'HomeScreen') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        } else if (route.name === 'DictionaryPage') {
                            iconName = focused ? 'book' : 'book-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })}
            >
                <Tabs.Screen name='HomeScreen' component={HomeScreen}></Tabs.Screen>
                <Tabs.Screen name='DictionaryPage' component={DictionaryPage}></Tabs.Screen>
            </Tabs.Navigator>
        </NavigationContainer>
    )
}

export default Navigation