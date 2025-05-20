import { View, Text } from 'react-native'
import React from 'react'
import { Colors, screenWidth } from '@unistyles/Contstants'
import CustomText from '@components/global/CustomText'
import { RV } from '@unistyles/unistyles'
import Icon from '@components/global/Icon'

const FooterComponent = () => {
    return (
        <View style={{ backgroundColor: Colors.background3, justifyContent: 'flex-start', width: screenWidth, paddingVertical: RV(18), paddingHorizontal: RV(14) }}>
            <CustomText fontSize={RV(12)} color="#fff">
                #Bihar Govt. logo
            </CustomText>

            <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} color={Colors.lightText} style={{ marginTop: RV(20) }}>
                Access information under the Right to Information Act, 2005
            </CustomText>

            <View style={{ flexDirection: 'row', gap: RV(10), marginTop: RV(8) }}>
                <Icon
                    name='logo-facebook'
                    iconFamily='Ionicons'
                    size={RV(20)}
                    color={Colors.lightText}
                />
                <Icon
                    name='logo-twitter'
                    iconFamily='Ionicons'
                    size={RV(20)}
                    color={Colors.lightText}
                />
                <Icon
                    name='logo-instagram'
                    iconFamily='Ionicons'
                    size={RV(20)}
                    color={Colors.lightText}
                />
                <Icon
                    name='logo-youtube'
                    iconFamily='Ionicons'
                    size={RV(20)}
                    color={Colors.lightText}
                />
            </View>

            <View style={{ marginTop: RV(12) }}>
                <CustomText fontFamily='Okra-Bold' color={Colors.text} fontSize={RV(14)} style={{ marginTop: RV(12), marginBottom: RV(8) }}>Quick Links</CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >Home</CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >File RTI</CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >Login</CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >Register</CustomText>
            </View>

            <View style={{ marginTop: RV(12) }}>
                <CustomText fontFamily='Okra-Bold' color={Colors.text} fontSize={RV(14)} style={{ marginTop: RV(12), marginBottom: RV(8) }}>
                    Help & Support
                </CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >Help & FAQs</CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >Contact Us</CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >RTI Act, 2005</CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >RTI Guidlines</CustomText>
            </View>

            <View style={{ marginTop: RV(12) }}>
                <CustomText fontFamily='Okra-Bold' color={Colors.text} fontSize={RV(14)} style={{ marginTop: RV(12), marginBottom: RV(8) }}>
                    Legal
                </CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >Terms of Use</CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >Privacy Policy</CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >Disclaimer</CustomText>
                <CustomText fontFamily='Okra-Regular' color={Colors.lightText} fontSize={RV(13)} style={{ marginVertical: RV(2.5) }} >Accessibility</CustomText>
            </View>

            <View style={{ backgroundColor: Colors.lightText, height: 0.3, width: '95%', alignSelf: 'center', margin: RV(18) }} />

            <CustomText fontFamily='Okra-Regular' fontSize={RV(10)} color={Colors.lightText} style={{ alignSelf: 'center', width: '80%', textAlign: 'center', marginBottom: RV(12) }}>
                @ 2025 Government of Bihar. All Right Reserved.
            </CustomText>
        </View>
    )
}

export default FooterComponent