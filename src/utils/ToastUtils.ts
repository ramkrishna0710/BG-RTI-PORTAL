import Toast from 'react-native-root-toast';

export function showToast(message: string, type: 'success' | 'error' = 'success') {  
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    containerStyle: {
      backgroundColor: type === 'error' ? '#ff4d4d' : '#4BB543',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
      marginBottom: 60,
    },
    textStyle: {
      color: '#fff',
      fontSize: 14,
    },
  });
}
