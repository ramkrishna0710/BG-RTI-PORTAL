import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import CustomText from '@components/global/CustomText'
import { Colors } from '@unistyles/Contstants'

const BreakerText: FC<{ text: string }> = ({ text }) => {
    return (
        <View style={styles.breakerContainer}>
            <View style={styles.line} />
            <CustomText
                fontSize={12}
                fontFamily='Okra-Medium'
                style={styles.breakerText}
            >
                {text}
            </CustomText>
            <View style={styles.line} />
        </View>
    )
}

export default BreakerText

const styles = StyleSheet.create({
    breakerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 16,
        marginBottom: 10,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.lightText,
        opacity: 0.4,
    },
    breakerText: {
        color: Colors.lightText,
        marginHorizontal: 8,
        opacity: 0.8,
    },
})
