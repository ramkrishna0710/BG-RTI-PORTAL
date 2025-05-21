import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RV } from '@unistyles/unistyles'
import { Colors } from '@unistyles/Contstants'
import Icon from '@components/global/Icon'
import CustomText from '@components/global/CustomText'

const DashboardHeader = () => {
    return (
        <View style={styles.headerComponent}>
            <View style={styles.userInfoContainer}>
                <View style={styles.headerIconContainer}>
                    <Icon iconFamily="Ionicons" name="person-outline" size={RV(20)} />
                </View>
                <View style={styles.userTextContainer}>
                    <CustomText fontFamily="Okra-Bold">Test User</CustomText>
                    <CustomText>Citizen</CustomText>
                </View>
            </View>
            <Icon iconFamily="Ionicons" name="options-outline" size={RV(26)} />
        </View>
    )
}

export default DashboardHeader

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: RV(12),
        paddingHorizontal: RV(12),
    },
    headerComponent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderBottomWidth: 0.5,
        borderColor: Colors.lightText,
        paddingBottom: RV(10),
        paddingRight: RV(16),
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: RV(2),
        paddingHorizontal: RV(12),
    },
    userTextContainer: {
        marginLeft: 8,
    },

    headerIconContainer: {
        height: RV(35),
        width: RV(35),
        backgroundColor: Colors.lightBlue,
        borderRadius: RV(35) / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
})