import { Colors, screenWidth } from '@unistyles/Contstants';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


const StatsCard = ({
  items = [
    { value: '15,432', label: 'Applications Filed' },
    { value: '13,750', label: 'Applications Resolved' },
    { value: '89%', label: 'Resolution Rate' },
    { value: '42', label: 'Departments' },
  ],
  columns = 2,
  itemBackgroundColor = '#fff',
  textColor = Colors.textBlue,
  valueSize = 24,
  labelSize = 14,
  gap = 16,
  itemPadding = 12,
  borderRadius = 8,
}) => {
  const totalGap = (columns - 1) * gap;
  const itemWidth = (screenWidth - totalGap - gap * 2) / columns; 

  return (
    <View style={[styles.container, { padding: gap }]}>
      <View style={[styles.grid, { marginHorizontal: -gap / 2 }]}>
        {items.map((item, index) => (
          <View
            key={index}
            style={[
              styles.itemContainer,
              {
                width: itemWidth,
                backgroundColor: itemBackgroundColor,
                borderRadius,
                padding: itemPadding,
                marginHorizontal: gap / 2,
                marginBottom: gap,
              },
            ]}
          >
            <Text style={[styles.value, { color: textColor, fontSize: valueSize }]}>
              {item.value}
            </Text>
            <Text style={[styles.label, { color: textColor, fontSize: labelSize }]}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  value: {
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default StatsCard;
