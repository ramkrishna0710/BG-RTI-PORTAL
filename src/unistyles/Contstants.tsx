import { Dimensions } from "react-native";

// export const BOTTOM_TAB_HEIGHT = 70
export const screenHeight = Dimensions.get('screen').height
export const screenWidth = Dimensions.get('screen').width
// export const isBannerHeight = screenHeight * 0.4

export const Colors = {
    text: '#222',
    active_light: '#ECFAF1',
    secondary: '#2D2D2D',
    tertiary: '#F4F4F2',
    background: '#fff',
    background_light: '#F4F6FC',
    border: '#E5E9EF',
    lightText: '#9197A6',
    active: '#019A51',
    dark: '#18171C',
    background1: '#003399',
    background2: '#fe6b35',
    background3: '#1e293b',
    textBlue: '#0047ac',
    textBlueDark: '#111825',
    transparent: 'transparent',
    lightBlue: '#ccdceb',
    red: 'red'
}

export enum Fonts {
    Regular = 'Okra-Regular',
    Medium = 'Okra-Medium',
    Light = 'Okra-MediumLight',
    SemiBold = 'Okra-Bold',
    Bold = 'Okra-ExtraBold',
}

export const lightColors = [
    'rgba(255,255,255,1)',
    'rgba(255,255,255,0.9)',
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.6)',
    'rgba(255,255,255,0.5)',
    'rgba(255,255,255,0.4)',
    'rgba(255,255,255,0.003)',
];
