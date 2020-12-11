import React from "react"
import { NavigationContainer } from "@react-navigation/native"

import StackApp from "./Screens/StackApp";
import TabsApp from "./Screens/TabsApp";


export default function Routes(){
    return(   
        <NavigationContainer>
            <StackApp/>
        </NavigationContainer>
    )
}