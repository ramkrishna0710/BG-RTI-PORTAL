import { View, Text, Pressable, StyleSheet, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import i18n from '../../../locales/i18n'
import CustomButton from '../CustomButton'
import { Colors } from '@unistyles/Contstants'
import CustomText from '@components/global/CustomText'
import LanguageModal from '@components/modals/LanguageModal'
import Icon from '@components/global/Icon'
import { RV } from '@unistyles/unistyles'
import { RFValue } from 'react-native-responsive-fontsize'
import { navigate } from '@utils/NavigationUtils'
import { useAuth } from '@contexts/AuthContext'

const HeaderComponent = () => {

    const [visible, setVisible] = useState(false)
    const [isMenu, setIsMenu] = useState(false)
    const [lang, setLang] = useState(i18n.language || 'en')

    const { isAuthenticated, logout } = useAuth();

    const selectLanguage = (language: string): void => {
        if (lang !== language) {
            i18n.changeLanguage(language)
            setLang(language)
        }
        setVisible(false)
    }

    return (
        <>
            <View style={styles.headerContainer}>
                {Platform.OS === 'android' ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        <Image source={require('@assets/images/footlogo.png')} style={{ height: RV(30), width: RV(30) }} />
                        <CustomText fontFamily='Okra-Medium' fontSize={RV(12)}>JAANKARI Facilitation Centre</CustomText>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        <Icon iconFamily='MaterialCommunityIcons' name='arrow-left' size={RV(22)}/>
                        <Image source={require('@assets/images/footlogo.png')} style={{ height: RV(30), width: RV(30) }} />
                    </View>
                )}
                {/* Image/logo can go here */}
                <View style={styles.headerMenuContainer}>
                    <Pressable onPress={() => setVisible(true)}>
                        <Icon iconFamily="MaterialIcons" name="language" size={RFValue(26)} />
                    </Pressable>

                    <Pressable onPress={() => setIsMenu(prev => !prev)}>
                        <Icon iconFamily="MaterialIcons" name={isMenu ? 'close' : 'menu'} size={RFValue(26)} />
                    </Pressable>
                </View>

                <LanguageModal
                    visible={visible}
                    onClose={() => setVisible(false)}
                    selectedLanguage={lang === 'hi' ? 'Hindi' : 'English'}
                    onSelectLanguage={(languageLabel) => {
                        const langCode = languageLabel === 'English' ? 'en' : 'hi'
                        selectLanguage(langCode)
                    }}
                />
            </View>

            {isMenu && (
                <View>
                    <View style={{ width: '100%', height: 0.3, backgroundColor: Colors.lightText }} />

                    <Pressable
                        onPress={() => {
                            setIsMenu(false)
                            navigate('HomeScreen')
                        }}
                    >
                        <CustomText
                            fontFamily="Okra-Regular"
                            color={Colors.lightText}
                            fontSize={RV(16)}
                            style={{ marginTop: RV(10), marginHorizontal: 14 }}
                        >
                            Home
                        </CustomText>
                    </Pressable>

                    <Pressable
                        onPress={() => {
                            // navigate('FileRTIScreen', { isLogin })
                            // setIsMenu(false)
                        }}
                    >
                        <CustomText
                            fontFamily="Okra-Regular"
                            color={Colors.lightText}
                            fontSize={RV(16)}
                            style={{ marginTop: RV(10), marginHorizontal: 14 }}
                        >
                            File RTI
                        </CustomText>
                    </Pressable>

                    {isAuthenticated && (
                        <Pressable
                            onPress={() => {
                                setIsMenu(false)
                                navigate('DashboardScreen')
                            }}
                        >
                            <CustomText
                                fontFamily="Okra-Regular"
                                color={Colors.lightText}
                                fontSize={RV(16)}
                                style={{ marginTop: RV(10), marginHorizontal: 14 }}
                            >
                                Dashboard
                            </CustomText>
                        </Pressable>
                    )}

                    <View
                        style={{
                            width: '90%',
                            height: 0.5,
                            backgroundColor: Colors.lightText,
                            marginTop: RV(14),
                            alignSelf: 'center',
                        }}
                    />

                    {!isAuthenticated ? (
                        <>
                            <CustomButton
                                label="Login"
                                width="90%"
                                borderColor={Colors.textBlue}
                                textColor={Colors.textBlue}
                                style={{ alignSelf: 'center', marginVertical: RV(10) }}
                                onPress={() => {
                                    setIsMenu(false)
                                    navigate('LoginScreen')
                                }}
                                fontWeight="bold"
                            />
                            <CustomButton
                                label="Register"
                                width="90%"
                                borderColor={Colors.textBlue}
                                textColor={Colors.background}
                                bgColor={Colors.textBlue}
                                fontWeight="bold"
                                style={{ alignSelf: 'center', marginVertical: RV(10) }}
                                onPress={() => {
                                    setIsMenu(false)
                                    navigate('RegisterScreen')
                                }}
                            />
                        </>
                    ) : (
                        <CustomButton
                            label="Logout"
                            width="90%"
                            borderColor={Colors.textBlue}
                            textColor={Colors.textBlue}
                            style={{ alignSelf: 'center', marginVertical: RV(10) }}
                            onPress={logout}
                            fontWeight="bold"
                        />
                    )}
                </View>
            )}
        </>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: Colors.background,
        shadowColor: Colors.lightText,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 6,
    },
    headerMenuContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        gap: 12,
    },
})
