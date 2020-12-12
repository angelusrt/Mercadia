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
    cardWrapperView:{
        width: "100%",
        height: "100%",
        alignSelf: "center"
    },
    cardView: {
        flex: 1,
        flexDirection: "row",
        padding: 15,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "bold"
    },
    cardSubtitle: {
        fontSize: 17,
        fontWeight: "normal"
    },
    cardSpecialWrapper: {
        paddingHorizontal: 5,
        borderColor: colors.primary,
        borderWidth: 1
    },
    cardSpecial: {
        fontSize: 14,
        fontWeight: "normal",
        color: colors.primary
    },
    cardButton: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        textAlign: "center"
    },
    cardButtonText: {
        fontSize: 14,
        fontWeight: "normal",
        marginLeft: 10,
        color: colors.white
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
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center"
    },
    title: {
        marginTop: 70,
        fontSize: 40,
        fontWeight: "bold",
        color: colors.white
    },
    subtitle: {
        marginTop: 15,
        fontSize: 22,
        fontWeight: "normal",
        color: colors.white
    },
    semititle: {
        marginTop: 15,
        fontSize: 17,
        fontWeight: "bold",
        color: colors.white
    },
    demititle: {
        marginTop: 15,
        fontSize: 13,
        fontWeight: "normal",
        color: colors.white
    }    
})