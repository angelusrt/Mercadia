import React, { useState, useEffect }from "react"
import { NavigationContainer } from "@react-navigation/native"

import fire from "./FirebaseConfig";
import StackApp from "./Screens/StackApp";
import TabsApp from "./Screens/TabsApp";


export default function Routes(){
    const[user, setUser] = useState("")

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
        <NavigationContainer>
            { user ? (
                <TabsApp/>
            ) : (
                <StackApp/>
            )}
        </NavigationContainer>
    )
}