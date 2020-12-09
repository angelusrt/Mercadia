import React from "react"
import { View, Text, TextInput, Button, FlatList,TouchableOpacity, StyleSheet } from "react-native"

import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { color } from "react-native-reanimated"

function FirstPage({navigation}){
    return(
        <View style={{ flex: 1, backgroundColor:colors.primary }}>
            <View style={ style.view }>
                <View style={{flex:5}}>
                    {/*<FlatList>
                        <Text>M</Text>
                        <Text>Mercadia</Text>
                    </FlatList>
                    */}

                    <Text style={ style.title } >Comece sua aventura agora ;)</Text>
                    <Text style={ style.subtitle }>Conheça nosso catalogo, que irá te surpreender!</Text>
                </View>
                <View style={{flex:1}}>
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
        <View style={ style.view }>
            <Text>Email</Text>
            <TextInput/>

            <Text>Senha</Text>
            <TextInput/>
            <Button color={colors.primary} title="Esqueceu sua senha?"/>

            <Text>Ou</Text>

            <Button color={colors.primary} title="G Entre com o Google"/>
            <Button color={colors.primary} title="Entre agora"/>
        </View>
    )
}

function Register(){
    return(
        <View style={ style.view }>
            <Text>Email</Text>
            <TextInput/>

            <Text>Senha</Text>
            <TextInput/>
            
            <Text>Respita a senha</Text>
            <TextInput/>
            
            <Text>Ou</Text>

            <Button color={colors.secundary} title="G Comece com o Google"/>
            <Button color={colors.secundary} title="Comece agora"/>
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
            height:"80%",
            width:"80%",
            alignSelf: "center",
            marginTop: "auto",
            marginBottom: "auto" 
        },
        button: {
            width: "100%",
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderWidth: 1, 
            borderColor: colors.white,   
            textAlign: "center"
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
        }
    });

export default function Routes(){
    const Stack = createStackNavigator();

    return(   
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PrimeiraPagina">
                <Stack.Screen name="PrimeiraPagina" options={{
                    header: () => null
                }} component={FirstPage} />
                <Stack.Screen name="Entrar" component={Login} />
                <Stack.Screen name="Registrar" component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}