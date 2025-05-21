import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RV } from '@unistyles/unistyles'
import { Colors } from '@unistyles/Contstants'
import Icon from '@components/global/Icon'
import CustomText from '@components/global/CustomText'
import { navigate } from '@utils/NavigationUtils'

const DashboardHeader = () => {
  const [isMenu, setIsMenu] = useState(false)
  const route = useRoute()

  const menuItems = [
    { title: 'Dashboard', icon: 'grid-outline', routeName: 'DashboardScreen' },
    { title: 'Applications', icon: 'document-text-outline', routeName: 'ApplicationScreen' },
    { title: 'Profile', icon: 'person-outline', routeName: 'ProfileScreen' },
    { title: 'Settings', icon: 'settings-outline', routeName: 'SettingsScreen' },
    { title: 'Logout', icon: 'log-out-outline', routeName: 'LoginScreen' },
  ]

  const handleNavigate = (routeName: string) => {
    setIsMenu(false)
    if (route.name !== routeName) {
      navigate(routeName as never)
    }
  }

  return (
    <>
      <View style={styles.headerComponent}>
        <View style={styles.userInfoContainer}>
          <View style={styles.headerIconContainer}>
            <Icon iconFamily="Ionicons" name="person-outline" size={RV(20)} />
          </View>
          <View style={styles.userTextContainer}>
            <CustomText fontFamily="Okra-Bold">Test User</CustomText>
            <CustomText>Citizen</CustomText>
          </View>
        </View>
        <TouchableOpacity onPress={() => setIsMenu(prev => !prev)}>
          <Icon iconFamily="Ionicons" name="options-outline" size={RV(26)} />
        </TouchableOpacity>
      </View>

      {isMenu && (
        <View style={styles.menuWrapper}>
          {menuItems.map((item, index) => {
            const isActive = route.name === item.routeName
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuContainer,
                  {
                    backgroundColor: isActive ? Colors.lightBlue : Colors.transparent,
                    borderRadius: RV(10),
                  },
                ]}
                onPress={() => handleNavigate(item.routeName)}
              >
                <Icon
                  iconFamily="Ionicons"
                  name={item.icon}
                  size={RV(20)}
                  color={isActive ? Colors.textBlue : Colors.lightText}
                />
                <CustomText
                  fontSize={RV(14)}
                  color={isActive ? Colors.textBlue : Colors.lightText}
                >
                  {item.title}
                </CustomText>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
    </>
  )
}

export default DashboardHeader

const styles = StyleSheet.create({
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderBottomWidth: 0.5,
    borderColor: Colors.lightText,
    paddingBottom: RV(10),
    paddingHorizontal: RV(16),
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RV(2),
    paddingHorizontal: RV(12),
  },
  userTextContainer: {
    marginLeft: RV(8),
  },
  headerIconContainer: {
    height: RV(35),
    width: RV(35),
    backgroundColor: Colors.lightBlue,
    borderRadius: RV(35) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    paddingHorizontal: RV(12),
    marginTop: RV(8),
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RV(10),
    paddingHorizontal: RV(12),
    paddingVertical: RV(12),
  },
})
