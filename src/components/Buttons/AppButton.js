import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Sizing } from '../../helpers/Sizing'

import Spinner from '../Spinner'

const AppButton = ({ onPress, loading = false, text = "" }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.btn}
        >
            {loading ? <Spinner /> : <Text style={styles.btnTxt} >{text}</Text>}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#00a8eb",
        alignSelf: "stretch",
        paddingVertical: Sizing(14),
        alignItems: "center",
        borderRadius: Sizing(8)
    },
    btnTxt: {
        color: "#fff"
    }
})

export default AppButton;