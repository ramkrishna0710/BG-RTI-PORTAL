import React from 'react'
import { Platform, StatusBar } from 'react-native'

interface CustomStatusBarProps {
  backgroundColor?: string
  barStyle?: 'light-content' | 'dark-content'
  translucent?: boolean
  hideOnIOS?: true
  hideOnAndroid?: boolean
}

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor = '#ffffff',
  barStyle = 'dark-content',
  translucent = false,
  hideOnIOS = false,
  hideOnAndroid = false,
}) => {
  const hidden = Platform.OS === 'ios' ? hideOnIOS : hideOnAndroid

  return (
    <StatusBar
      translucent={translucent}
      backgroundColor={translucent ? 'transparent' : backgroundColor}
      barStyle={barStyle}
      hidden={hidden}
    />
  )
}

export default CustomStatusBar
