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
import { isEmailValid, isMobileNumberValid, isNameValid, isPasswordStrong } from '@utils/validators'
import { showToast } from '@utils/ToastUtils'
import { registerUser } from '@api/auth'
import { navigate, resetAndNavigate } from '@utils/NavigationUtils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '@contexts/AuthContext'

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfrimPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [mobileNumberError, setMobileNumberError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confrimPasswordError, setConfrimPasswordError] = useState(false);

    const { login } = useAuth();

    const onHandleRegister = async () => {
        let isValid = true;

        let firstErrorMessage = '';

        if (!isNameValid(name)) {
            setNameError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Name must be at least 2 characters long';
            isValid = false;
        } else {
            setNameError(false);
        }

        if (!isEmailValid(email)) {
            setEmailError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Please enter a valid email address';
            isValid = false;
        } else {
            setEmailError(false);
        }

        if (!isMobileNumberValid(mobileNumber)) {
            setMobileNumberError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Enter a valid 10-digit mobile number';
            isValid = false;
        } else {
            setMobileNumberError(false);
        }

        if (!isPasswordStrong(password)) {
            setPasswordError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Password must be at least 6 characters';
            isValid = false;
        } else {
            setPasswordError(false);
        }

        if (password !== confrimPassword) {
            setConfrimPasswordError(true)
            if (!firstErrorMessage) firstErrorMessage = 'Passwords do not match';
            isValid = false;
        } else {
            setConfrimPasswordError(false)
        }

        if (!isValid) {
            showToast(firstErrorMessage, 'error');
            return;
        }

        try {
            const data = await registerUser(name, email, mobileNumber, password);
            await login(data.token);
            showToast(data.message, 'success');
        } catch (err: any) {
            showToast(err.response?.data?.message, 'error');
        }
    };


    return (
        <CustomSafeAreaView>
            <HeaderComponent />
            <AssistantComponent />
            <ScrollView>
                <View style={styles.container}>
                    <CustomText fontFamily='Okra-Bold' fontSize={RV(22)} style={{ textAlign: 'center' }}>Register</CustomText>
                    <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} color={Colors.lightText} style={{ textAlign: 'center' }}>
                        Already have an account? <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} color={Colors.textBlue}>
                            Login now
                        </CustomText>
                    </CustomText>

                    <View style={styles.inputGroup}>
                        <CustomText fontSize={RV(12)} color={nameError ? Colors.red : Colors.lightText} fontFamily='Okra-Medium'>Full Name</CustomText>
                        <TextInput
                            style={[styles.input, nameError && { borderColor: Colors.red }]}
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                if (nameError) setNameError(false);
                            }}
                        />
                        {nameError && (
                            <CustomText fontSize={RV(10)} color={Colors.red} fontFamily="Okra-Regular">
                                Please enter Your Name.
                            </CustomText>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <CustomText fontSize={RV(12)} color={emailError ? Colors.red : Colors.lightText} fontFamily='Okra-Medium'>
                            Email
                        </CustomText>
                        <TextInput
                            style={[styles.input, emailError && { borderColor: Colors.red }]}
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                if (emailError) setEmailError(false);
                            }}
                            keyboardType="email-address"
                        />
                        {emailError && (
                            <CustomText fontSize={RV(10)} color={Colors.red} fontFamily="Okra-Regular">
                                Please enter a valid email address.
                            </CustomText>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <CustomText fontSize={RV(12)} color={mobileNumberError ? Colors.red : Colors.lightText} fontFamily='Okra-Medium'>Mobile Number</CustomText>
                        <TextInput
                            style={[styles.input, emailError && { borderColor: Colors.red }]}
                            value={mobileNumber}
                            onChangeText={(text) => {
                                setMobileNumber(text);
                                if (mobileNumberError) setMobileNumberError(false);
                            }}
                            keyboardType='name-phone-pad'
                        />
                        {mobileNumberError && (
                            <CustomText fontSize={RV(10)} color={Colors.red} fontFamily="Okra-Regular">
                                Please enter a valid mobile number.
                            </CustomText>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <CustomText fontSize={RV(12)} color={passwordError ? Colors.red : Colors.lightText} fontFamily='Okra-Medium'>
                            Password
                        </CustomText>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={[styles.input, passwordError && { borderColor: Colors.red }, { paddingRight: RV(40) }]}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (passwordError) setPasswordError(false);
                                }}
                                secureTextEntry={!showPassword}
                            />
                            {passwordError && (
                                <CustomText fontSize={RV(10)} color={Colors.red} fontFamily="Okra-Regular">
                                    Please enter 6 digit password.
                                </CustomText>
                            )}
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
                        <CustomText fontSize={RV(12)} color={confrimPasswordError ? Colors.red : Colors.lightText} fontFamily='Okra-Medium'>
                            Confirm Password
                        </CustomText>
                        <TextInput
                            style={[styles.input, passwordError && { borderColor: Colors.red }, { paddingRight: RV(40) }]}
                            value={confrimPassword}
                            onChangeText={(text) => {
                                setConfrimPassword(text);
                                if (confrimPasswordError) setConfrimPasswordError(false);
                            }}
                            secureTextEntry={!showPassword}
                        />
                        {confrimPasswordError && (
                            <CustomText fontSize={RV(10)} color={Colors.red} fontFamily="Okra-Regular">
                                Enter Confrim Password
                            </CustomText>
                        )}
                    </View>

                    <View style={{ height: RV(20) }} />

                    <CustomButton
                        label='Register'
                        bgColor={Colors.textBlue}
                        borderColor={Colors.textBlue}
                        textColor={Colors.background}
                        fontWeight={'bold'}
                        fontSize={RV(16)}
                        onPress={() => onHandleRegister()}
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
        top: '45%',
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
