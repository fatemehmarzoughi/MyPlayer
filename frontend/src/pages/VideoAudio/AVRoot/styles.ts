import { StyleSheet } from "react-native";
import { width } from "src/assets";

export const styles = StyleSheet.create({
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