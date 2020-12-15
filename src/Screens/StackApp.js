import React, { useState } from 'react';
import { View, Text, TextInput,TouchableOpacity, LogBox} from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { colors, style } from "../Styles"
import * as GoogleSignin from "expo-google-sign-in";
import fire from "./../FirebaseConfig";

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
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    LogBox.ignoreLogs(['Setting a timer']);
    //Funcionando
    function loginHandler(){
        fire
        .auth()
        .signInWithEmailAndPassword(email.trim(), password)
    }

    return(
        <View style={{flex: 1, backgroundColor: colors.primary}}>
            <View style={{justifyContent: "flex-end", ...style.view}}>
                <Text style={ style.semititle }>Email</Text>
                <TextInput onChangeText={ (email) => setEmail(email)} style={ style.textInput }/>

                <Text style={ style.semititle }>Senha</Text>
                <TextInput onChangeText={ (pass) => setPassword(pass)} style={ style.textInput }/>

                {/* <TouchableOpacity
                    style={{ backgroundColor: colors.primary}}
                >
                    <Text style={ style.demititle }>Esqueceu sua senha?</Text>
                </TouchableOpacity> */}
                
                <Text style={{alignSelf: "center", ...style.demititle}}>Ou</Text>

                <TouchableOpacity
                    style={{ backgroundColor: colors.primary, ...style.button}}
                >
                    <Text style={ style.buttonText }>G Entre com o Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: colors.primary, ...style.button}}
                    onPress={ () => loginHandler()}
                >
                    <Text style={ style.buttonText }>Entre agora</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function Register(){    
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    LogBox.ignoreLogs(['Setting a timer']);
    //Funcionando
    function signinHandler(){
        fire.auth()
        .createUserWithEmailAndPassword(email, password)
    }
    // async function onGoogleButtonPress() {
    //     // Get the users ID token
    //     const { idToken } = GoogleSignin.signInAsync();
    
    //     // Create a Google credential with the token
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
    //     // Sign-in the user with the credential
    //     return auth().signInWithCredential(googleCredential);
    // }

    return(
        <View style={{flex: 1, backgroundColor: colors.secundary}}>
            <View style={{justifyContent: "flex-end", ...style.view}}>
                <Text style={ style.semititle }>Email</Text>
                <TextInput onChangeText={ text => setEmail(text)} style={ style.textInput }/>

                <Text style={ style.semititle }>Senha</Text>
                <TextInput onChangeText={ text => setPassword(text)} style={ style.textInput }/>
                
                {/* <Text style={ style.semititle }>Respita a senha</Text>
                <TextInput style={ style.textInput }/> */}
                
                <Text style={{alignSelf: "center", ...style.demititle}}>Ou</Text>

                <TouchableOpacity
                    style={{ backgroundColor: colors.secundary, ...style.button}}
                    onPress={() => onGoogleButtonPress() }
                >
                    <Text style={ style.buttonText }>G Comece com o Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: colors.secundary, ...style.button}}
                    onPress={() => signinHandler() }
                >
                    <Text style={ style.buttonText }>Comece agora</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function StackApp() {
    const Stack = createStackNavigator();
    
    return (
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
    );
}

export default StackApp;