import React, { useState, useEffect } from 'react';

import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScrollView, View, Text, TextInput,TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { colors, style } from "../Styles" 
import fire from '../FirebaseConfig';

function Home(){
    return(
        <ScrollView>
            <Text>a</Text>
        </ScrollView>
    )
}

function Conta(){
    const[user, setUser] = useState("");

    const logoutHandler = () => {
        fire.auth().signOut()
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if(user){
                setUser(user)
            }
            else{
                setUser("")
            }
        })
    }

    useEffect(() => authListener(), []) 
    return(
        <View>
            <Text>a</Text>
        </View>
    )
}

function HomeStack(){
    const Stack = createStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                headerStyle: {backgroundColor: colors.white, shadowColor: 'transparent', elevation: 0 },
                headerTintColor: colors.primary,
                headerTitle: "Mercadia",
                headerTitleAlign: "center",
                headerBackTitleVisible: false
            }}/>
        </Stack.Navigator>
    )        
}


function ContaStack(){
    const Stack = createStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen name="Conta" component={Conta} options={{
                headerStyle: {backgroundColor: colors.white, shadowColor: 'transparent', elevation: 0 },
                headerTintColor: colors.secundary,
                headerTitle: "Mercadia",
                headerTitleAlign: "center",
                headerBackTitleVisible: false
            }}/>
        </Stack.Navigator>
    )    
}

function TabsApp(props) {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator tabBarOptions={{activeTintColor: colors.primary,showLabel: false}}>
            <Tabs.Screen name="Home" component={HomeStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="home" color={color} size={size} />
                ),
            }}/>
            <Tabs.Screen name="Conta" component={ContaStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="user" color={color} size={size} />
                ),
            }}/>
            <Tabs.Screen name="Pesquisa" component={ContaStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="search" color={color} size={size} />
                ),
            }}/>
            {/* {<TouchableOpacity
                style={{ backgroundColor: colors.secundary, ... style.button}}
            >
                <Text style={ style.buttonText }>O</Text>
            </TouchableOpacity>} */}
        </Tabs.Navigator>
    );
}

export default TabsApp;