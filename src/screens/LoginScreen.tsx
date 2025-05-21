import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomText from '@components/global/CustomText'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import { Colors } from '@unistyles/Contstants'
import Icon from '@components/global/Icon'
import { useTranslation } from 'react-i18next'
import i18n from '../locales/i18n'
import HeaderComponent from '@components/ui/dashboard/HeaderComponent'
import Login from '@components/ui/Login'
import FooterComponent from '@components/ui/dashboard/FooterComponent'

const LoginScreen = () => {
  const { t } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'en');

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

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
