import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import CustomText from '@components/global/CustomText'
import { RV } from '@unistyles/unistyles'
import { Colors } from '@unistyles/Contstants'
import CustomButton from './CustomButton'
import BreakerText from './BreakerText'
import Icon from '@components/global/Icon'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <CustomSafeAreaView style={{ paddingHorizontal: 14 }}>
            <CustomText fontFamily='Okra-Bold' fontSize={RV(22)} style={{ textAlign: 'center' }}>Login</CustomText>
            <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} color={Colors.lightText} style={{ textAlign: 'center' }}>
                Don't have an account? <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} color={Colors.textBlue}>
                    Create an account
                </CustomText>
            </CustomText>

            <View style={styles.inputGroup}>
                <CustomText fontSize={RV(14)} color={Colors.lightText} fontFamily='Okra-Medium'>Email</CustomText>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputGroup}>
                <CustomText fontSize={RV(14)} color={Colors.lightText} fontFamily='Okra-Medium'>Password</CustomText>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <View style={styles.rememberContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setRememberMe(!rememberMe)}
                >
                    <Icon
                        iconFamily='MaterialIcons'
                        name={rememberMe ? 'check-box' : 'check-box-outline-blank'}
                        size={RV(20)}
                        color={Colors.lightText}
                    />
                    <CustomText fontSize={RV(12)} color={Colors.lightText} style={{ marginLeft: 6 }}>
                        Remember Me
                    </CustomText>
                </TouchableOpacity>

                <TouchableOpacity>
                    <CustomText fontSize={RV(12)} color={Colors.textBlue}>
                        Forgot Password?
                    </CustomText>
                </TouchableOpacity>
            </View>

            <CustomButton
                label='Login'
                bgColor={Colors.textBlue}
                borderColor={Colors.textBlue}
                textColor={Colors.background}
                fontWeight={'bold'}
                fontSize={RV(16)}
                onPress={() => { }}
            />

            <BreakerText text='Or continue with' />

            <View style={styles.socialButtons}>
                <CustomButton
                    label='Google'
                    borderColor={Colors.textBlue}
                    textColor={Colors.textBlue}
                    fontWeight={'bold'}
                    width={'47%'}
                    onPress={() => { }}
                />
                <CustomButton
                    label='Aadhaar'
                    borderColor={Colors.textBlue}
                    textColor={Colors.textBlue}
                    fontWeight={'bold'}
                    width={'47%'}
                    onPress={() => { }}
                />
            </View>
        </CustomSafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    inputGroup: {
        marginTop: RV(14),
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: RV(14),
        color: '#333',
        marginTop: 6,
        backgroundColor: '#fff',
    },
    rememberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: RV(12),
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: RV(10),
    },
})
