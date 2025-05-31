import { StyleSheet } from "react-native";
import { width } from "src/assets";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 15,
        // marginVertical: 10
    },

    image: {
        width: 100,
        height: 50,
        borderRadius: 5,
    },



    card: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        width: width - 30,
        flexDirection: 'row',
        marginVertical: 10
    },
    startPart: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 5,
    },
    titles: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 3,
    },
    coverImage: {
        borderRadius: 3,
        width: 80,
        height: 50
    }

})