import Icon from '@components/global/Icon';
import { RV } from '@unistyles/unistyles';
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  DimensionValue,
} from 'react-native';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  textStyle?: TextStyle;
  marginVertical?: number;
  marginHorizontal?: number;
  borderRadius?: number;
  width?: DimensionValue;
  fontSize?: number;
  showIcon?: boolean;
  showLeftIcon?: boolean;
  iconName?: string;
  iconFamily?: 'MaterialIcons' | 'Ionicons' | 'MaterialCommunityIcons';
  iconSize?: number;
  iconColor?: string;
  fontWeight?: TextStyle['fontWeight'];
  style?: ViewStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  bgColor = '#FFFFFF',
  textColor = '#003366',
  borderColor = '#003366',
  textStyle = {},
  marginVertical = 8,
  marginHorizontal,
  borderRadius = 6,
  width,
  fontSize,
  showIcon: showRightIcon = false,
  showLeftIcon: showLeftIcon = false,
  iconName = 'arrow_forward',
  iconFamily = 'MaterialIcons',
  iconSize = 22,
  iconColor = '#003366',
  fontWeight: fontWeight,
  style
}) => {
  const buttonStyle: ViewStyle = {
    backgroundColor: bgColor,
    borderColor: borderColor,
    borderWidth: 1,
    borderRadius: borderRadius,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: width,
    marginVertical: marginVertical,
    marginHorizontal: marginHorizontal,
    gap: RV(5),
    ...style
  };

  const combinedTextStyle: TextStyle = {
    color: textColor,
    fontWeight: fontWeight,
    fontSize: fontSize,
    ...textStyle,
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {showLeftIcon && (
        <Icon
          name={iconName}
          iconFamily={iconFamily}
          size={iconSize}
          color={iconColor}
        />
      )}
      <Text style={combinedTextStyle}>{label}</Text>
      {showRightIcon && (
        <Icon
          name={iconName}
          iconFamily={iconFamily}
          size={iconSize}
          color={iconColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
