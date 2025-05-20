import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomText from '@components/global/CustomText'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import { Colors } from '@unistyles/Contstants'
import Icon from '@components/global/Icon'
import { useTranslation } from 'react-i18next'
import i18n from '../locales/i18n'

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
      <CustomText color={Colors.active} fontFamily='Okra-Medium' fontSize={20}>
        Hi! Ramkrishna
      </CustomText>

      <CustomText color={Colors.active} fontFamily='Okra-Medium' fontSize={20}>
        {t('welcome')}
      </CustomText>

      <Icon iconFamily='Ionicons' name='home' size={16} />

      <TouchableOpacity
        onPress={toggleLanguage}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: Colors.active,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {lang === 'en' ? 'Switch to Hindi' : 'अंग्रेज़ी में बदलें'}
        </Text>
      </TouchableOpacity>
    </CustomSafeAreaView>
  )
}

export default LoginScreen
