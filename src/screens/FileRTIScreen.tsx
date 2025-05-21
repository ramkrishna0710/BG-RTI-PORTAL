import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import HeaderComponent from '@components/ui/dashboard/HeaderComponent';
import FooterComponent from '@components/ui/dashboard/FooterComponent';
import { Colors } from '@unistyles/Contstants';
import { RV } from '@unistyles/unistyles';
import CustomText from '@components/global/CustomText';
import ApplicantInformation from '@components/customForm/ApplicantInformation';
import AddressInformation from '@components/customForm/AddressInformation';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import RtiRequest from '@components/customForm/RtiRequest';
import Login from '@components/ui/Login';
import { RouteProp } from '@react-navigation/native';
import AssistantComponent from '@components/ui/AssistantComponent';

type FileRTIScreenRouteProp = RouteProp<{ params: { isLogin: boolean } }, 'params'>;

const FileRTIScreen = ({ route }: { route: FileRTIScreenRouteProp }) => {
    const { isLogin } = route.params ?? { isLogin: false };

    const items = [
        { value: '1', label: 'Applications Information' },
        { value: '2', label: 'Address Information' },
        { value: '3', label: 'RTI Request' },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const keyboardOffset = useKeyboardOffsetHeight();

    const scrollViewRef = useRef<ScrollView>(null);

    const goToIndex = (index: number) => {
        setActiveIndex(index);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };

    const goToNext = () => {
        if (activeIndex < items.length - 1) {
            goToIndex(activeIndex + 1);
        }
    };

    const goToPrev = () => {
        if (activeIndex > 0) {
            goToIndex(activeIndex - 1);
        }
    };


    const renderForm = () => {
        switch (activeIndex) {
            case 0:
                return <View style={{ flex: 1 }}>
                    <ApplicantInformation goToNext={goToNext} />
                </View>

            case 1:
                return <View style={{ flex: 1 }}>
                    <AddressInformation goToPrev={goToPrev} goToNext={goToNext} />
                </View>
            case 2:
                return <View style={{ flex: 1 }}>
                    <RtiRequest goToPrev={goToPrev} goToNext={goToNext} />
                </View>
            default:
                return null;
        }
    };

    return (
        <CustomSafeAreaView style={{ zIndex: 0 }}>
            <AssistantComponent/>
            <ScrollView
                ref={scrollViewRef}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: keyboardOffset }}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <HeaderComponent />

                {isLogin ? (

                    <View style={{
                        backgroundColor: Colors.background,
                        paddingVertical: RV(20),
                        paddingHorizontal: 10,
                    }}>
                        <View style={{
                            borderColor: Colors.lightText,
                            borderWidth: 0.2,
                            borderRadius: 10,
                            elevation: 4,
                            shadowColor: '#000',
                            shadowOpacity: 0.05,
                            shadowOffset: { width: 2, height: 2 },
                            shadowRadius: 4,
                        }}>
                            <View style={{
                                backgroundColor: Colors.textBlue,
                                paddingVertical: RV(22),
                                paddingHorizontal: RV(16),
                                borderTopRightRadius: RV(10),
                                borderTopLeftRadius: RV(10),
                            }}>
                                <CustomText fontSize={RV(16)} fontFamily='Okra-Bold'>
                                    RTI Application Form
                                </CustomText>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: RV(10), justifyContent: 'space-evenly', alignItems: 'center' }}>
                                {items.map((item, index) => (
                                    <Pressable
                                        key={item.value}
                                        onPress={() => goToIndex(index)}
                                        style={{ alignItems: 'center', maxWidth: RV(100), flexDirection: 'column' }}
                                    >
                                        <View
                                            style={{
                                                height: RV(40),
                                                width: RV(40),
                                                borderRadius: RV(20),
                                                backgroundColor: activeIndex === index ? Colors.textBlue : '#cacacc',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginBottom: RV(4),
                                            }}
                                        >
                                            <CustomText
                                                fontFamily="Okra-Bold"
                                                color={activeIndex === index ? Colors.background : '#606061'}
                                            >
                                                {item.value}
                                            </CustomText>
                                        </View>

                                        <CustomText
                                            color={Colors.text}
                                            fontFamily='Okra-Regular'
                                            fontSize={RV(9)}
                                            style={{ textAlign: 'center' }}
                                        >
                                            {item.label}
                                        </CustomText>
                                    </Pressable>
                                ))}
                            </View>

                            <View style={{ padding: RV(16), minHeight: RV(450) }}>
                                {renderForm()}
                            </View>
                        </View>
                    </View>
                ) : (
                    <Login />
                )}
                <FooterComponent />
            </ScrollView>
        </CustomSafeAreaView>
    );
};

export default FileRTIScreen;
