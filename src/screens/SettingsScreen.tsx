import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import HeaderComponent from '@components/ui/dashboard/HeaderComponent'
import DashboardHeader from '@components/ui/dashboard/DashboardHeader'
import FooterComponent from '@components/ui/dashboard/FooterComponent'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'
import Icon from '@components/global/Icon'
import { RV } from '@unistyles/unistyles'
import { Colors, screenHeight } from '@unistyles/Contstants'
import CustomText from '@components/global/CustomText'
import CustomButton from '@components/ui/CustomButton'
import { navigate } from '@utils/NavigationUtils'

const SettingsScreen = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const keyboardOffset = useKeyboardOffsetHeight();
    return (
        <CustomSafeAreaView>
            <HeaderComponent />
            <DashboardHeader />
            <ScrollView
                ref={scrollViewRef}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: keyboardOffset }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', height: screenHeight * 0.7 }}>
                    <Icon
                        iconFamily='MaterialIcons'
                        name='error-outline'
                        size={RV(40)}
                        color='red'
                    />
                    <CustomText fontFamily='Okra-Bold' fontSize={RV(28)} style={{ marginTop: RV(16) }}>404</CustomText>
                    <CustomText fontFamily='Okra-Bold' fontSize={RV(16)} style={{ marginTop: RV(12) }}>Page Not Found</CustomText>
                    <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} style={{ marginTop: RV(12), textAlign: 'center' }}>
                        The page you are looking for doesn't exist or has been moved.
                    </CustomText>
                    <CustomButton
                        label='Go to Home'
                        showLeftIcon={true}
                        iconColor={Colors.background}
                        iconName='home-outline'
                        iconFamily='Ionicons'
                        bgColor={Colors.textBlue}
                        textColor={Colors.background}
                        onPress={()=> navigate('HomeScreen')}
                    />
                </View>
                <FooterComponent />
            </ScrollView>
        </CustomSafeAreaView>
    )
}

export default SettingsScreen