import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { Colors, screenHeight, screenWidth } from '@unistyles/Contstants';
import CustomText from '@components/global/CustomText';
import CustomStatusBar from '@components/statusbar/CustomStatubar';
import Animated, { FadeInDown } from 'react-native-reanimated';

const Splash = () => {
    return (
        <View style={styles.container}>
            <CustomStatusBar backgroundColor='rgba(0,0,0,0.3)' barStyle='light-content' />

            <Image
                source={require('@assets/images/footlogo.png')}
                style={styles.logoImage}
            />

            <Animated.View
                style={styles.animatedContainer}
                entering={FadeInDown.delay(400).duration(800)}
            >
                <ActivityIndicator size={'large'} color={Colors.active} />
                {/* <View style={styles.lottieWrapper}>
                    <LottieView
                        source={require('@assets/lottie/loading.json')}
                        autoPlay
                        loop
                        style={styles.lottie}
                    />

                </View> */}
            </Animated.View>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: screenWidth * 0.6,
        height: screenHeight * 0.2,
        resizeMode: 'contain',
    },
    animatedContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        position: 'absolute',
        bottom: screenHeight * 0.1
    },
    msgText: {
        textAlign: 'center',
        marginVertical: 20,
    },
    lottieWrapper: {
        width: screenWidth * 0.8,
        height: screenWidth * 0.6,
        position: 'absolute',
        top: screenHeight * 0.13
    },
    lottie: {
        width: '100%',
        height: '100%',
    },
});
