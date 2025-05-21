import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import HeaderComponent from '@components/ui/dashboard/HeaderComponent'
import CustomText from '@components/global/CustomText'
import FooterComponent from '@components/ui/dashboard/FooterComponent'
import Icon from '@components/global/Icon'
import { RV } from '@unistyles/unistyles'
import { Colors } from '@unistyles/Contstants'
import CustomUpload from '@components/ui/CustomUpload'
import CustomDashboardUpload from '@components/ui/dashboard/CustomDashboardComponent'
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight'
import CustomTable from '@components/ui/dashboard/CustomTable'
import DashboardHeader from '@components/ui/dashboard/DashboardHeader'
import { navigate } from '@utils/NavigationUtils'
import AssistantComponent from '@components/ui/AssistantComponent'

const DashboardScreen = () => {

  const scrollViewRef = useRef<ScrollView>(null);
  const keyboardOffset = useKeyboardOffsetHeight();

  return (
    <CustomSafeAreaView>
      <HeaderComponent />
      <DashboardHeader />
      <AssistantComponent/>

      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: keyboardOffset }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContainer}>
          <CustomText fontFamily="Okra-Bold" fontSize={RV(18)} style={styles.dashboardTitle}>
            Dashboard
          </CustomText>
          <CustomText style={{ marginBottom: RV(12) }}>Welcome, Test</CustomText>

          <CustomDashboardUpload
            title='My Applications'
            iconFamily={'Ionicons'}
            iconName='copy-outline'
            subtitle='View and track all yor submitted RTI applications.'
            align='start'
            onViewAllPress={()=> navigate('ApplicationScreen')}
            viewAlltitle='View All Applications'
          />
          <CustomDashboardUpload
            title='My Applications'
            iconFamily={'MaterialCommunityIcons'}
            iconName='plus-circle-outline'
            subtitle='Submit a new RTI application to any government department.'
            align='start'
            iconColor={'orange'}
            arrowIconColor='orange'
            onViewAllPress={()=>'FileRTIScreen'}
            viewAlltitle='File New RTI'
          />
          <CustomDashboardUpload
            title='Track Status'
            iconFamily={'MaterialIcons'}
            iconName='verified'
            subtitle='Submit a new RTI application to any government department.'
            align='start'
            iconColor={Colors.text}
            arrowIconColor={Colors.text}
            viewAlltitle='Track Application'
          />

          <View style={styles.recentMainContainer}>
            <View style={styles.recentTopContainer}>
              <CustomText fontFamily="Okra-Bold" fontSize={RV(16)}>
                Recent Applications
              </CustomText>
              <TouchableOpacity onPress={() => navigate('ViewAllScreen')}>
                <CustomText fontFamily="Okra-Regular" fontSize={RV(12)} color={Colors.textBlue}>
                  View All
                </CustomText>
              </TouchableOpacity>
            </View>
            {/* Table */}
            <CustomTable />
          </View>
        </View>
        <FooterComponent />
      </ScrollView>

    </CustomSafeAreaView>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: RV(12),
    paddingHorizontal: RV(12),
  },
  dashboardTitle: {
    marginTop: RV(12),
  },
  recentMainContainer: {
    backgroundColor: Colors.background,
    borderColor: Colors.lightText,
    borderWidth: 0.1,
    borderRadius: RV(8),
    shadowColor: Colors.lightText,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    marginVertical: RV(8),
  },
  recentTopContainer: {
    paddingVertical: RV(12),
    paddingHorizontal: RV(12),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
})
