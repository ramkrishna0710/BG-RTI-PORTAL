import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { RV } from '@unistyles/unistyles'
import { Colors } from '@unistyles/Contstants'
import Icon from '@components/global/Icon'
import CustomText from '@components/global/CustomText'
import { navigate } from '@utils/NavigationUtils'
import { useAuth } from '@contexts/AuthContext'
import { getProfile } from '@api/auth'

interface Profile {
  fullname: string;
  role: string;
}

const DashboardHeader = () => {
  const route = useRoute()
  const { logout } = useAuth();

  const [isMenu, setIsMenu] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("Profile ", profile);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data.data);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const menuItems = [
    { title: 'Dashboard', icon: 'grid-outline', routeName: 'DashboardScreen' },
    { title: 'Applications', icon: 'document-text-outline', routeName: 'ApplicationScreen' },
    { title: 'Profile', icon: 'person-outline', routeName: 'ProfileScreen' },
    { title: 'Settings', icon: 'settings-outline', routeName: 'SettingsScreen' },
    { title: 'Logout', icon: 'log-out-outline', action: logout },
  ]

  const handleNavigate = (item: typeof menuItems[number]) => {
    setIsMenu(false)
    if (item.action) {
      item.action()
    } else if (route.name !== item.routeName) {
      navigate(item.routeName as never)
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
            <CustomText fontFamily="Okra-Bold">{profile?.fullname}</CustomText>
            <CustomText>{profile?.role}</CustomText>
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
                onPress={() => handleNavigate(item)}
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
