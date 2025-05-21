import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from '@components/global/Icon'; // Assuming your custom Icon component
import { Colors } from '@unistyles/Contstants';
import { RFValue } from 'react-native-responsive-fontsize';
import { RV } from '@unistyles/unistyles';

const tableData = [
    {
        reference: 'RTI78945613',
        subject: 'Land Records Information',
        department: 'Revenue Department',
        status: 'Pending',
        date: '4/15/2023',
    },
    {
        reference: 'RTI78945613',
        subject: 'Land Records Information',
        department: 'Revenue Department',
        status: 'UnderReview',
        date: '4/15/2023',
    },
    {
        reference: 'RTI78945613',
        subject: 'Land Records Information',
        department: 'Revenue Department',
        status: 'Resolved',
        date: '3/22/2023',
    },
];

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Pending':
            return <Icon name="alert-circle-outline" iconFamily="Ionicons" size={RFValue(16)} color="orange" />;
        case 'UnderReview':
            return <Icon name="timer-outline" iconFamily="Ionicons" size={RFValue(16)} color="blue" />;
        case 'Resolved':
            return <Icon name="checkmark-circle-outline" iconFamily="Ionicons" size={RFValue(16)} color="green" />;
        default:
            return null;
    }
};

const CustomTable = () => {
    return (
        <ScrollView horizontal style={styles.wrapper}>
            <View>
                {/* Table Header */}
                <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.headerCell, { paddingLeft: RV(14) }]}>REFERENCE NO.</Text>
                    <Text style={styles.headerCell}>SUBJECT</Text>
                    <Text style={styles.headerCell}>DEPARTMENT</Text>
                    <Text style={styles.headerCell}>STATUS</Text>
                    <Text style={styles.headerCell}>DATE</Text>
                    <Text style={styles.headerCell}>ACTIONS</Text>
                </View>

                {/* Table Data */}
                {tableData.map((item, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={[styles.cell, { paddingLeft: RV(14) }]}>{item.reference}</Text>
                        <Text style={[styles.cell, { color: Colors.lightText }]}>{item.subject}</Text>
                        <Text style={[styles.cell, { color: Colors.lightText }]}>{item.department}</Text>
                        <View style={styles.statusCell}>
                            {getStatusIcon(item.status)}
                            <Text style={[styles.statusText, { marginLeft: 4 }]}>{item.status}</Text>
                        </View>
                        <Text style={[styles.cell, { color: Colors.lightText }]}>{item.date}</Text>
                        <View style={[styles.cell, { paddingLeft: RV(20) }]}>
                            <Icon name="eye-outline" iconFamily="Ionicons" size={RFValue(18)} color={Colors.textBlue} />
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default CustomTable;

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: RV(2),
    },
    row: {
        flexDirection: 'row',
        paddingVertical: RV(8),
        borderBottomWidth: 0.3,
        borderColor: Colors.lightText,
    },
    headerRow: {
        backgroundColor: Colors.lightBlue,
    },
    headerCell: {
        fontWeight: 'bold',
        width: RV(130),
        fontSize: RFValue(12),
        paddingHorizontal: 4,
        color: Colors.lightText,
    },
    cell: {
        width: RV(130),
        fontSize: RFValue(12),
        paddingHorizontal: 4,
        color: Colors.text,
    },
    statusCell: {
        width: RV(130),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    statusText: {
        fontSize: RFValue(12),
        color: Colors.text,
    },
});
