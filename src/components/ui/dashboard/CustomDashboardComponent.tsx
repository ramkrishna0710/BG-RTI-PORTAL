import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@components/global/Icon';
import CustomText from '@components/global/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { RV } from '@unistyles/unistyles';
import { Colors } from '@unistyles/Contstants';

interface CustomDashboardUploadProps {
    iconFamily: any;
    iconName: string;
    iconColor?: string;
    title: string;
    subtitle: string;
    viewAlltitle?: string;
    align?: 'start' | 'center';
    onViewAllPress?: () => void;
    arrowIconColor?: string;
}

const CustomDashboardUpload: React.FC<CustomDashboardUploadProps> = ({
    iconFamily,
    iconName,
    iconColor = Colors.textBlue,
    title,
    subtitle,
    viewAlltitle,
    align = 'center',
    onViewAllPress,
    arrowIconColor = Colors.textBlue,
}) => {
    const alignmentStyle = align === 'start' ? 'flex-start' : 'center';

    return (
        <View style={[styles.container, { alignItems: alignmentStyle }]}>
            <View style={styles.iconWrapper}>
                <Icon
                    iconFamily={iconFamily}
                    name={iconName}
                    size={RFValue(22)}
                    color={iconColor}
                />
            </View>

            <CustomText fontFamily="Okra-Bold" fontSize={RV(13)} style={styles.title}>
                {title}
            </CustomText>

            <CustomText
                fontFamily="Okra-Regular"
                fontSize={RV(12)}
                color={Colors.lightText}
                style={[
                    styles.subtitle,
                    { textAlign: align === 'start' ? 'left' : 'center' },
                ]}
            >
                {subtitle}
            </CustomText>

            <TouchableOpacity
                style={[styles.viewAllWrapper, { alignSelf: alignmentStyle }]}
                onPress={onViewAllPress}
            >
                <CustomText
                    fontFamily="Okra-Regular"
                    color={arrowIconColor}
                    fontSize={RV(12)}
                >
                    {viewAlltitle}
                </CustomText>
                <Icon
                    name="arrow-forward"
                    iconFamily="Ionicons"
                    size={RV(16)}
                    color={arrowIconColor}
                />
            </TouchableOpacity>
        </View>
    );
};

export default CustomDashboardUpload;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: RV(14),
        paddingVertical: RV(16),
        justifyContent: 'center',
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
    iconWrapper: {
        height: RFValue(38),
        width: RFValue(38),
        backgroundColor: '#e5eef5',
        borderRadius: RFValue(38) / 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: RV(8),
    },
    title: {
        marginTop: RV(6),
        color: Colors.text,
        opacity: 0.85,
    },
    subtitle: {
        marginTop: RV(4),
        lineHeight: RV(16),
    },
    viewAllWrapper: {
        marginTop: RV(10),
        flexDirection: 'row',
        alignItems: 'center',
    },
});
