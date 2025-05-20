import React, { FC, ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@unistyles/Contstants';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CustomSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

export default CustomSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
