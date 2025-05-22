import { ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import HeaderComponent from '@components/ui/dashboard/HeaderComponent'
import Login from '@components/ui/Login'
import FooterComponent from '@components/ui/dashboard/FooterComponent'

const LoginScreen = () => {

  return (
    <CustomSafeAreaView>
      <HeaderComponent />
      <ScrollView>
        <Login />
        <FooterComponent />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default LoginScreen
