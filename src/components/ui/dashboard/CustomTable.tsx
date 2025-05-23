import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from '@components/global/Icon'; // Assuming your custom Icon component
import { Colors } from '@unistyles/Contstants';
import { RFValue } from 'react-native-responsive-fontsize';
import { RV } from '@unistyles/unistyles';
import { getAllRti } from '@api/auth';

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

    const [allRTI, setAllRTI] = useState<any[]>([]);

    console.log("All RTI ", allRTI);


    useEffect(() => {
        const fetchAllRti = async () => {
            try {
                const data = await getAllRti();
                setAllRTI(data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllRti();
    }, []);

    return (
        <ScrollView horizontal style={styles.wrapper}>
            <View>
                <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.headerCell, { paddingLeft: RV(14) }]}>REFERENCE NO.</Text>
                    <Text style={styles.headerCell}>SUBJECT</Text>
                    <Text style={styles.headerCell}>DEPARTMENT</Text>
                    <Text style={styles.headerCell}>STATUS</Text>
                    <Text style={styles.headerCell}>DATE</Text>
                    <Text style={styles.headerCell}>ACTIONS</Text>
                </View>

                {allRTI.length === 0 ? (
                    <Text style={{ padding: 10 }}>No RTI data available.</Text>
                ) : (
                    allRTI.slice(0, 3).map((item, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={[styles.cell, { paddingLeft: RV(14) }]}>{item.reference_number}</Text>
                            <Text style={[styles.cell, { color: Colors.lightText }]}>{item.subject}</Text>
                            <Text style={[styles.cell, { color: Colors.lightText }]}>{item.department}</Text>
                            <View style={styles.statusCell}>
                                {getStatusIcon(item.status)}
                                <Text style={[styles.statusText, { marginLeft: 4 }]}>{item.status}</Text>
                            </View>
                            <Text style={[styles.cell, { color: Colors.lightText }]}>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </Text>
                            <View style={[styles.cell, { paddingLeft: RV(20) }]}>
                                <Icon name="eye-outline" iconFamily="Ionicons" size={RFValue(18)} color={Colors.textBlue} />
                            </View>
                        </View>

                    ))
                )}
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
