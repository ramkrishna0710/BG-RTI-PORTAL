import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import Icon from '@components/global/Icon'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/global/CustomText'
import { Colors, screenWidth } from '@unistyles/Contstants'
import { useTranslation } from 'react-i18next'
import { RV } from '@unistyles/unistyles'
import i18n from '../locales/i18n'
import CustomButton from '@components/ui/CustomButton'
import CustomUpload from '@components/ui/CustomUpload'
import StatCard from '@components/ui/dashboard/StatCard'
import LanguageModal from '@components/modals/LanguageModal'
import FooterComponent from '@components/ui/dashboard/FooterComponent'
import HeaderComponent from '@components/ui/dashboard/HeaderComponent'

const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <CustomSafeAreaView>

      <HeaderComponent />

      <ScrollView>
        <View style={styles.rtiContainer}>
          <CustomText
            fontFamily='Okra-Bold'
            fontSize={RFValue(24)}
            color={Colors.text}
            style={styles.welcomeText} >
            {t('welcome_to_bihar_government_rti_portal')}
          </CustomText>

          <CustomText
            fontFamily='Okra-Medium'
            fontSize={RFValue(14)}
            color={Colors.tertiary}
            style={{ marginTop: RFValue(14), opacity: 0.8, marginBottom: RV(12) }} >
            {t('file_and_track_your_information')}
          </CustomText>

          <CustomButton
            label='File RTI Application'
            width="60%"
            onPress={() => { }}
          />
          <CustomButton
            bgColor={Colors.transparent}
            borderColor={Colors.lightText}
            label='Track Application'
            textColor={Colors.tertiary}
            width="60%"
            onPress={() => { }}
          />
        </View>

        <View style={styles.bottomContainer}>

          <CustomText
            fontFamily='Okra-Bold'
            fontSize={RFValue(19)}
            style={{ marginTop: RV(30) }}>
            How It Works
          </CustomText>

          <View style={{ backgroundColor: Colors.background1, width: '20%', height: 3, marginTop: RV(6) }} />

          <View style={{ marginTop: RV(18) }} />

          <CustomUpload
            iconFamily="MaterialIcons"
            iconName="person-add"
            title="Register & Login"
            subtitle="Create an account and log in to the portal with your credentials."
          />

          <CustomUpload
            iconFamily="MaterialCommunityIcons"
            iconName="file-document-outline"
            title="Fill RTI Application Form"
            subtitle="Complete the 3-step RTI application form with all relevant details."
          />

          <CustomUpload
            iconFamily="MaterialIcons"
            iconName="upload"
            title="Submit & Pay Fee (if applicable)"
            subtitle="Submit your application and pay the application fee if applicable."
          />

          <CustomUpload
            iconFamily="MaterialCommunityIcons"
            iconName="database"
            title="Track Application Status"
            subtitle="Track the status of your application through your dashboard."
          />

          <View style={{ margin: RV(16) }} />

          <View style={{ backgroundColor: '#e5eef5', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ margin: RV(15) }} />
            <CustomText
              fontFamily='Okra-Bold'
              fontSize={RFValue(19)}
              style={{ marginTop: RV(30) }}>
              Portal Statistics
            </CustomText>
            <View style={{ backgroundColor: Colors.background1, width: RV(70), height: 3, marginTop: 10 }} />
            <View style={{ margin: RV(9) }} />
            <StatCard />
            <View style={{ margin: RV(4) }} />
          </View>


          <View style={{ backgroundColor: Colors.background2, justifyContent: 'center', alignItems: 'center', width: screenWidth }}>
            <View style={{ margin: RV(4) }} />
            <CustomText
              fontFamily='Okra-Bold'
              fontSize={RFValue(22)}
              style={{ marginTop: RV(30), textAlign: 'center' }}>
              Ready to file your RTI application?
            </CustomText>
            <CustomText
              fontFamily='Okra-Medium'
              fontSize={RFValue(14)}
              color={Colors.tertiary}
              style={{ marginTop: RV(10), textAlign: 'center' }}>
              Access information from government departments with ease through our streamlined online RTI portal
            </CustomText>

            <CustomButton
              label="Get Started"
              borderColor={Colors.background2}
              fontSize={RV(16)}
              textColor={Colors.background2}
              fontWeight={'700'}
              onPress={() => { }}
              showIcon
              iconName="arrow-forward-outline"
              iconFamily="Ionicons"
              iconSize={RV(20)}
              iconColor={Colors.background2}
            />
            <View style={{ margin: RV(20) }} />
          </View>

        </View>

        <FooterComponent />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerMenuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 12
  },
  rtiContainer: {
    paddingHorizontal: 12,
    paddingVertical: RV(28),
    backgroundColor: Colors.background1,
  },
  welcomeText: {
    marginTop: RV(22)
  },
  bottomContainer: {
    alignItems: 'center'
  },
  statCardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
  },
})
