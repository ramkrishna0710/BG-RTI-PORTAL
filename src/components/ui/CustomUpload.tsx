import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { RV } from '@unistyles/unistyles';
import { Colors } from '@unistyles/Contstants';

interface CustomUploadProps {
  iconFamily: any;
  iconName: string;
  title: string;
  subtitle: string;
}

const CustomUpload: React.FC<CustomUploadProps> = ({
  iconFamily,
  iconName,
  title,
  subtitle,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon
          iconFamily={iconFamily}
          name={iconName}
          size={RFValue(22)}
          color={Colors.textBlue}
        />
      </View>

      <CustomText fontFamily="Okra-Bold" fontSize={RV(13)} style={styles.title}>
        {title}
      </CustomText>

      <CustomText
        fontFamily="Okra-Regular"
        fontSize={RV(12)}
        color={Colors.lightText}
        style={styles.subtitle}
      >
        {subtitle}
      </CustomText>
    </View>
  );
};

export default CustomUpload;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: RV(12),
    marginVertical: RV(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    height: RFValue(38),
    width: RFValue(38),
    backgroundColor: '#e5eef5',
    borderRadius: RFValue(38) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RV(8),
  },
  title: {
    marginTop: RV(6),
    color: Colors.text,
    opacity: 0.85
  },
  subtitle: {
    textAlign: 'center',
    marginTop: RV(4),
    paddingHorizontal: RV(10),
    lineHeight: RV(14),
  },
});
