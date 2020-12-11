import { StyleSheet } from "react-native"

export var colors = {
    primary: "#E01A4F",
    secundary: "#690375",
    grey:"#C4C4C4",
    white:"#FFFFFF"
}
export var style = StyleSheet.create({
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
})