import React, { useState, useEffect } from 'react';

import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScrollView, View, Text, TextInput,TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { colors, style } from "../Styles" 
import fire from '../FirebaseConfig';
import { initAsync } from 'expo-google-sign-in';

function Home(){
    return(
        <ScrollView style={{ backgroundColor: colors.white, ...style.cardWrapperView }} >
            <View style={{ marginVertical: 10, backgroundColor: colors.white, ...style.cardView }}>
                {/* Foto */}
                <View style={{ flex: 1, backgroundColor: colors.secundary, marginRight: 15}}>
                    
                </View>
                <View style={{ flex: 2 }}>
                    <View>
                        {/* Avaliação */}
                    </View>
                    <Text style={{ color: colors.secundary, ...style.cardTitle }}>Samsung Galaxy A21s</Text>
                    <Text style={{ color: colors.secundary, ...style.cardSubtitle }}>R$1299,00</Text>
                    <View style={{ marginVertical: 10, flex: 1, flexDirection: 'row' }}>
                        <View style={ style.cardSpecialWrapper }><Text style={ style.cardSpecial }>Novo</Text></View>
                        <View style={{ marginLeft: 10, ...style.cardSpecialWrapper }}><Text style={ style.cardSpecial }>Frete Gratis</Text></View>
                    </View>
                    <View style={{ marginTop: 20, flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity
                        style={{ backgroundColor: colors.primary, ...style.cardButton}}
                        >
                            <View style={{ flexDirection: 'row'}}>
                                <FontAwesome name="shopping-cart" color={colors.white} size={20} />
                                <Text style={ style.cardButtonText }>Carrinho</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{ marginLeft: 10, backgroundColor: colors.primary, ...style.cardButton}}
                        >
                            <View style={{ flexDirection: 'row'}}>
                                <FontAwesome name="heart" color={colors.white} size={20} />
                                <Text style={ style.cardButtonText }>Favoritos</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

function Conta(){
    const [user, setUser] = useState("");

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
        <View style={{backgroundColor: colors.white, ...style.view}} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="chevron-right" color={colors.primary} size={15} />
                <Text style={{ marginLeft: 10, color: colors.primary, ...style.cardSubtitle}}>angelusrt@gmail.com</Text>
            </View>
            <TouchableOpacity
            style={{ marginVertical: 20, alignItems: "center", backgroundColor: colors.primary, ...style.cardButton}}
            onPress={() => logoutHandler()}
            >
                <View style={{ flexDirection: 'row'}}>
                    <FontAwesome name="exclamation-triangle" color={colors.white} size={20} />
                    <Text style={ style.cardButtonText }>Sair da conta</Text>
                </View>
            </TouchableOpacity>
            <Text style={{ color: colors.secundary, fontSize: 17, fontWeight: "bold"}}>Favoritos</Text>
            <ScrollView 
                horizontal={true}
                contentContainerStyle={{ width: `${100*1}%`}}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled
                style={{height: 30}}
            >
                <View style={{flex: 1, flexDirection: "row", padding: 15, marginVertical: 15}}>
                    <View style={{flex: 1, backgroundColor: colors.secundary, marginRight: 15}}>

                    </View>
                    <View style={{flex: 2}}>
                        <Text style={{ color: colors.secundary, ...style.cardTitle }}>Samsung Galaxy A21s</Text>
                        <Text style={{ color: colors.secundary, ...style.cardSubtitle }}>R$1299,00</Text>
                        <TouchableOpacity
                            style={{ width: "50%", marginVertical: 20, backgroundColor: colors.primary, ...style.cardButton}}
                        >
                            <View style={{ flexDirection: 'row'}}>
                                <FontAwesome name="close" color={colors.white} size={20} />
                                <Text style={ style.cardButtonText }>Excluir</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Text style={{ color: colors.secundary, fontSize: 17, fontWeight: "bold"}}>Carrinho</Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ width: `${100*1}%`}}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled
                style={{height: 30}}
            >

            </ScrollView>
        </View>
    )
}
function Pesquisa(){
    return(
        <View style={{ backgroundColor: colors.white, justifyContent: "flex-end", ...style.view}}>
            <TextInput style={{ borderColor: colors.primary, borderWidth: 1, padding: "3%" }}/>
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

function PesquisaStack(){
    const Stack = createStackNavigator()

    return(
        <Stack.Navigator>
            <Stack.Screen name="Pesquisa" component={Pesquisa} options={{
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
        <Tabs.Navigator 
            tabBarOptions={{tabStyle: { borderTopWidth: 0 }, style: { borderTopWidth: 0, elevation: 0 }, 
            activeTintColor: colors.primary,showLabel: false
        }}>
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
            <Tabs.Screen name="Pesquisa" component={PesquisaStack} options={{
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