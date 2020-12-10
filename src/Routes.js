import React from "react"
import { View, Text, TextInput, Button, FlatList,TouchableOpacity, StyleSheet } from "react-native"

import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { color } from "react-native-reanimated"

function FirstPage({navigation}){
    return(
        <View style={{ flex: 1, backgroundColor:colors.primary }}>
            <View style={ style.view }>
                <View style={{flex:3}}>
                    {/*<FlatList>
                        <Text>M</Text>
                        <Text>Mercadia</Text>
                    </FlatList>
                    */}

                    <Text style={ style.title } >Comece sua aventura agora ;)</Text>
                    <Text style={ style.subtitle }>Conheça nosso catalogo, que irá te surpreender!</Text>
                </View>
                <View style={{flex:1, justifyContent: "flex-end"}}>
                    <TouchableOpacity
                        style={{ backgroundColor: colors.primary, ...style.button}}
                        onPress={ () => navigation.navigate("Entrar")}
                    >
                        <Text style={ style.buttonText }>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: colors.secundary, ... style.button}}
                        onPress={ () => navigation.navigate("Registrar")}
                    >
                        <Text style={ style.buttonText }>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

function Login(){
    return(
        <View style={{flex: 1, backgroundColor: colors.primary}}>
            <View style={{justifyContent: "flex-end", ...style.view}}>
                <Text style={ style.semititle }>Email</Text>
                <TextInput style={ style.textInput }/>

                <Text style={ style.semititle }>Senha</Text>
                <TextInput style={ style.textInput }/>

                <TouchableOpacity
                    style={{ backgroundColor: colors.primary}}
                >
                    <Text style={ style.demititle }>Esqueceu sua senha?</Text>
                </TouchableOpacity>
                
                <Text style={{alignSelf: "center", ...style.demititle}}>Ou</Text>

                <TouchableOpacity
                    style={{ backgroundColor: colors.primary, ...style.button}}
                >
                    <Text style={ style.buttonText }>G Entre com o Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: colors.primary, ...style.button}}
                >
                    <Text style={ style.buttonText }>Entre agora</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function Register(){
    return(
        <View style={{flex: 1, backgroundColor: colors.secundary}}>
            <View style={{justifyContent: "flex-end", ...style.view}}>
                <Text style={ style.semititle }>Email</Text>
                <TextInput style={ style.textInput }/>

                <Text style={ style.semititle }>Senha</Text>
                <TextInput style={ style.textInput }/>
                
                <Text style={ style.semititle }>Respita a senha</Text>
                <TextInput style={ style.textInput }/>
                
                <Text style={{alignSelf: "center", ...style.demititle}}>Ou</Text>

                <TouchableOpacity
                    style={{ backgroundColor: colors.secundary, ...style.button}}
                >
                    <Text style={ style.buttonText }>G Comcece com o Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: colors.secundary, ...style.button}}
                >
                    <Text style={ style.buttonText }>Comcece agora</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
    const colors = {
        primary: "#E01A4F",
        secundary: "#690375",
        grey:"#C4C4C4",
        white:"#FFFFFF"
    }
    const style = StyleSheet.create({
        view: {
            width: "100%",
            height: "100%",
            padding: 30,
            alignSelf: "center"
        },
        button: {
            width: "100%",
            marginTop: 15,
            paddingTop: "5%",
            paddingBottom: "5%",
            borderWidth: 1, 
            borderColor: colors.white,   
            textAlign: "center"
        },
        textInput: {
            padding: "3%",
            backgroundColor: colors.white
        },
        buttonText: {
            color: colors.white,
            fontWeight: "bold",
            fontSize: 22,
            textAlign: "center"
        },
        title: {
            marginTop: 70,
            fontSize: 40,
            color: colors.white,
            fontWeight: "bold"
        },
        subtitle: {
            marginTop: 15,
            fontSize: 22,
            color: colors.white,
            fontWeight: "normal"
        },
        semititle: {
            marginTop: 15,
            fontSize: 17,
            color: colors.white,
            fontWeight: "bold"
        },
        demititle: {
            marginTop: 15,
            fontSize: 13,
            color: colors.white,
            fontWeight: "normal"
        }
        
    });

export default function Routes(){
    const Stack = createStackNavigator();

    return(   
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PrimeiraPagina">
                <Stack.Screen name="PrimeiraPagina" component={FirstPage} options={{
                    header: () => null
                }}/>
                <Stack.Screen name="Entrar" component={Login} options={{
                    headerStyle: {backgroundColor: colors.primary, shadowColor: 'transparent', elevation: 0 },
                    headerTintColor: colors.white,
                    headerTitle: "Mercadia",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false
                }}/>
                <Stack.Screen name="Registrar" component={Register} options={{
                    headerStyle: {backgroundColor: colors.secundary, shadowColor: 'transparent', elevation: 0 },
                    headerTintColor: colors.white,
                    headerTitle: "Mercadia",
                    headerTitleAlign: "center",
                    headerBackTitleVisible: false
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}