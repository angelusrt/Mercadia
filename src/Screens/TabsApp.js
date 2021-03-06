import React, { useState, useEffect } from 'react';

import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ScrollView, View, Text, Image, TextInput,TouchableOpacity, LogBox } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { colors, style } from "../Styles" 
import fire from '../FirebaseConfig';

function Home(){
    const[components, setComponents] = useState([])
    
    let userId = fire.auth().currentUser.uid;
    var myObject = {}

    LogBox.ignoreLogs(['Setting a timer']);

    useEffect( () => {
        let isMounted = true;
        fire.database().ref('itens/').on('value', snapshot => {
            let data = snapshot.val()
            let itens = Object.values(data)
            
            if(isMounted) setComponents(itens)
        })
        return () => {isMounted = false}
    },[])   

    function writeCarts(userId, item) {
        fire.database().ref('users/' + userId + "/carrinho/").update(
            myObject = {
                [item]: item
            }
        )
    }

    function writeFavorites(userId, item) {
        fire.database().ref('users/' + userId + "/favorito/").update(
            myObject = {
                [item]: item
            }
        )
    }

    return(
        <ScrollView style={{ backgroundColor: colors.white, ...style.cardWrapperView }} >
            {
                components.map((item, index) => {
                    return(
                        <View key={ index } style={{ marginVertical: 10, backgroundColor: colors.white, ...style.cardView }}>
                            <View style={{ flex: 1, marginRight: 15}}>
                                <Image style={{ flex: 1, width: "100%" }} source={{ uri : item.image }} />
                            </View>
                            <View style={{ flex: 2 }}>
                                <View>
                                </View>
                                <Text style={{ color: colors.secundary, ...style.cardTitle }}>{ item.nome }</Text>
                                <Text style={{ color: colors.secundary, ...style.cardSubtitle }}>{ item.preço }</Text>
                                <View style={{ marginVertical: 10, flex: 1, flexDirection: 'row' }}>
                                    { (item.categorias.primeiras != " ") && <View style={ style.cardSpecialWrapper }><Text style={ style.cardSpecial }>{ item.categorias.primeiras }</Text></View>}
                                    { (item.categorias.segundas != " ") && <View style={{ marginLeft: 10, ...style.cardSpecialWrapper }}><Text style={ style.cardSpecial }>{ item.categorias.segundas }</Text></View>}
                                </View>
                                <View style={{ marginTop: 20, flex: 1, flexDirection: 'row' }}>
                                    <TouchableOpacity
                                    style={{ backgroundColor: colors.primary, ...style.cardButton}}
                                    onPress={() => writeCarts(userId, index)}
                                    >
                                        <View style={{ flexDirection: 'row'}}>
                                            <FontAwesome name="shopping-cart" color={colors.white} size={20} />
                                            <Text style={ style.cardButtonText }>Carrinho</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={{ marginLeft: 10, backgroundColor: colors.primary, ...style.cardButton}}
                                    onPress={() => writeFavorites(userId, index)}
                                    >
                                        <View style={{ flexDirection: 'row'}}>
                                            <FontAwesome name="heart" color={colors.white} size={20} />
                                            <Text style={ style.cardButtonText }>Favoritos</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }) 
            }
        </ScrollView>
    )
}

function Conta(){
    const[components, setComponents] = useState([])
    const[chart, setChart] = useState([])
    const[favorite, setFavorite] = useState([])
    const [user, setUser] = useState("")

    LogBox.ignoreLogs(['Setting a timer']);

    let userId = fire.auth().currentUser.uid;
    let userEmail = fire.auth().currentUser.email;

    const logoutHandler = () => {
        fire.auth().signOut()
    }

    const authListener = () => {
        let isMounted = true;
        fire.auth().onAuthStateChanged(user => {
            if(user){
                if(isMounted) setUser(user)
            }
            else{
                if(isMounted) setUser("")
            }
        })
        return () => {isMounted = false}
    }

    useEffect( () => {
        let isMounted = true;
        fire.database().ref('itens/').on('value', snapshot => {
            let data = snapshot.val()
            let itens = Object.values(data)
            
            if(isMounted) setComponents(itens)
    
        })
        return () => {isMounted = false}
    },[])   

    useEffect( () => { 
        let isMounted = true;
        fire.database().ref('users/' + userId + "/carrinho/").on('value', snapshot => {
            let data = snapshot.val()
            let itens = Object.values(data || "")
            
            if(isMounted) setChart(itens)
    
        })

        fire.database().ref('users/' + userId + "/favorito/").on('value', snapshot => {
            let data = snapshot.val()
            let itens = Object.values(data || "")
            
            if(isMounted) setFavorite(itens)
    
        })
        return () => {isMounted = false}
    },[])   

    let carrinhoQuantidade = Object.keys(chart).length;
    let favoritoQuantidade = Object.keys(favorite).length;

    useEffect(() => authListener(), []) 

    function deleteCharts(userId, item) {
        fire.database().ref('users/' + userId + "/carrinho/").child(item).remove()
    }

    function deleteFavorites(userId, item) {
        fire.database().ref('users/' + userId + "/favorito/").child(item).remove()
    }
    
    //console.log(favorite.filter( item => item !== undefined && item != null).map( item => components[item].nome))

    return(
        <View style={{backgroundColor: colors.white, ...style.view}} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="chevron-right" color={colors.primary} size={15} />
                <Text style={{ marginLeft: 10, color: colors.primary, ...style.cardSubtitle}}>{userEmail}</Text>
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
                contentContainerStyle={{ width: `${ 100 * favoritoQuantidade}%`}}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled
                style={{height: 30}}
            >
                { 
                    favorite.filter( item => item !== undefined && item != null).map((item, index) => {
                        return(
                            <View key={index} style={{flex: 1, flexDirection: "row", padding: 15, marginVertical: 15}}>
                                <View style={{flex: 1, marginRight: 15}}>
                                <Image style={{ flex: 1, width: "100%"}} source={{ uri : components[item].image }} />
                                </View>
                                <View style={{flex: 2}}>
                                    <Text style={{ color: colors.secundary, ...style.cardTitle }}>{components[item].nome}</Text>
                                    <Text style={{ color: colors.secundary, ...style.cardSubtitle }}>{components[item].preço}</Text>
                                    <TouchableOpacity
                                        style={{ width: "50%", marginVertical: 20, backgroundColor: colors.primary, ...style.cardButton}}
                                        onPress={ () => deleteFavorites(userId, item)}
                                    >
                                        <View style={{ flexDirection: 'row'}}>
                                            <FontAwesome name="close" color={colors.white} size={20} />
                                            <Text style={ style.cardButtonText }>Excluir</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <Text style={{ color: colors.secundary, fontSize: 17, fontWeight: "bold"}}>Carrinho</Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ width: `${ 100 * carrinhoQuantidade }%`}}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
                decelerationRate="fast"
                pagingEnabled
                style={{height: 30}}
            >
                { 
                    chart.filter( item => item !== undefined && item != null).map((item, index) => {
                        return (
                            <View key={index} style={{flex: 1, flexDirection: "row", padding: 15, marginVertical: 15}}>
                                <View style={{flex: 1, marginRight: 15}}>
                                <Image style={{ flex: 1, width: "100%"}} source={{ uri : components[item].image }} />
                                </View>
                                <View style={{flex: 2}}>
                                    <Text style={{ color: colors.secundary, ...style.cardTitle }}>{components[item].nome}</Text>
                                    <Text style={{ color: colors.secundary, ...style.cardSubtitle }}>{components[item].preço}</Text>
                                    <TouchableOpacity
                                        style={{ width: "50%", marginVertical: 20, backgroundColor: colors.primary, ...style.cardButton}}
                                        onPress={ () => deleteCharts(userId, item)}
                                    >
                                        <View style={{ flexDirection: 'row'}}>
                                            <FontAwesome name="close" color={colors.white} size={20} />
                                            <Text style={ style.cardButtonText }>Excluir</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

function Pesquisa(){
    return(
        <View style={{ backgroundColor: colors.white, justifyContent: "center", ...style.view}}>
            <TextInput placeholder="clique e pesquise!" style={{ borderColor: colors.primary, borderWidth: 1, padding: "3%" }}/>
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
            activeTintColor: colors.primary,showLabel: false, keyboardHidesTabBar: true
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
        </Tabs.Navigator>
    );
}

export default TabsApp;