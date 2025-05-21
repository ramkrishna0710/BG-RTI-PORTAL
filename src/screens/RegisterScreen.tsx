import { StyleSheet, TextInput, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import CustomText from '@components/global/CustomText'
import { RV } from '@unistyles/unistyles'
import { Colors } from '@unistyles/Contstants'
import Icon from '@components/global/Icon'
import CustomButton from '@components/ui/CustomButton'
import BreakerText from '@components/ui/BreakerText'
import HeaderComponent from '@components/ui/dashboard/HeaderComponent'
import FooterComponent from '@components/ui/dashboard/FooterComponent'
import AssistantComponent from '@components/ui/AssistantComponent'

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfrimPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <CustomSafeAreaView>
            <HeaderComponent />
            <AssistantComponent/>
            <ScrollView>
                <View style={styles.container}>
                    <CustomText fontFamily='Okra-Bold' fontSize={RV(22)} style={{ textAlign: 'center' }}>Register</CustomText>
                    <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} color={Colors.lightText} style={{ textAlign: 'center' }}>
                        Already have an account? <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} color={Colors.textBlue}>
                            Login now
                        </CustomText>
                    </CustomText>

                    <View style={styles.inputGroup}>
                        <CustomText fontSize={RV(12)} color={Colors.lightText} fontFamily='Okra-Medium'>Full Name</CustomText>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <CustomText fontSize={RV(12)} color={Colors.lightText} fontFamily='Okra-Medium'>Email</CustomText>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <CustomText fontSize={RV(12)} color={Colors.lightText} fontFamily='Okra-Medium'>Mobile Number</CustomText>
                        <TextInput
                            style={styles.input}
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            keyboardType='name-phone-pad'
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <CustomText fontSize={RV(12)} color={Colors.lightText} fontFamily='Okra-Medium'>
                            Password
                        </CustomText>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, { paddingRight: RV(40) }]}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon
                                    iconFamily="Ionicons"
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={RV(18)}
                                    color={Colors.lightText}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <CustomText fontSize={RV(12)} color={Colors.lightText} fontFamily='Okra-Medium'>
                            Confirm Password
                        </CustomText>
                        <TextInput
                            style={[styles.input, { paddingRight: RV(40) }]}
                            value={confrimPassword}
                            onChangeText={setConfrimPassword}
                            secureTextEntry={!showPassword}
                        />
                    </View>

                    <View style={{ height: RV(20) }} />

                    <CustomButton
                        label='Register'
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
                </View>
                <FooterComponent />
            </ScrollView>
        </CustomSafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: RV(12),
        paddingVertical: RV(18),
        backgroundColor: Colors.background,
        borderColor: Colors.lightText,
        borderWidth: 0.1,
        borderRadius: RV(8),
        shadowColor: Colors.lightText,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 1,
        marginVertical: RV(22),
        marginHorizontal: RV(12),
    },
    inputGroup: {
        marginTop: RV(14),
    },
    input: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: RV(14),
        color: '#333',
        marginTop: 6,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: RV(12),
        top: '55%',
        transform: [{ translateY: -RV(9) }],
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
