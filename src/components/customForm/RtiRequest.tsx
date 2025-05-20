import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// import DocumentPicker from 'react-native-document-picker';
import CustomButton from '@components/ui/CustomButton';
import { Colors } from '@unistyles/Contstants';
import { RV } from '@unistyles/unistyles';
import CustomText from '@components/global/CustomText';

const RtiRequest = ({ goToNext, goToPrev }: { goToNext: () => void, goToPrev: () => void }) => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [selectDepartment, setSelectDepartment] = useState(null);
    const [open, setOpen] = useState(false);
    const [departmetOpations, setDepartmetOpations] = useState([
        { label: 'Agriculture Department', value: 'PR' },
        { label: 'Education Department', value: 'SE' },
        { label: 'Health Department', value: 'HS' },
    ]);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    // const pickDocument = async () => {
    //     try {
    //         const res = await DocumentPicker.pickSingle();
    //         setSelectedFile(res.name);
    //     } catch (err) {
    //         if (DocumentPicker.isCancel(err)) return;
    //         console.warn('Error picking document:', err);
    //     }
    // };

    return (
        <View style={styles.container}>
            {/* Department Dropdown */}
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                    Department <Text style={styles.required}>*</Text>
                </Text>
                <DropDownPicker
                    open={open}
                    value={selectDepartment}
                    items={departmetOpations}
                    setOpen={setOpen}
                    setValue={setSelectDepartment}
                    setItems={setDepartmetOpations}
                    placeholder="Select Department"
                    style={styles.input}
                    dropDownContainerStyle={{ borderColor: '#ccc' }}
                    listMode="SCROLLVIEW"
                />
            </View>

            {/* Subject */}
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                    Subject <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    value={subject}
                    onChangeText={setSubject}
                />
            </View>

            {/* Description */}
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                    Description <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    maxLength={300}
                    placeholder="Enter description"
                />
                <Text style={styles.charCount}>{description.length}/300</Text>
            </View>

            {/* Upload Supporting Document */}
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Upload Supporting Document</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: RV(11),
                }}>
                    <TouchableOpacity style={styles.uploadBtn} onPress={()=>{{}}}>
                        <Text style={styles.uploadText}>Choose File</Text>
                    </TouchableOpacity>
                    <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} color={Colors.lightText}>No file chosen</CustomText>
                </View>
                {selectedFile && <Text style={styles.selectedFile}>{selectedFile}</Text>}
                <CustomText fontFamily='Okra-Regular' fontSize={RV(9)} color={Colors.lightText} style={{marginTop:RV(2)}}>Allowed file types: PDF, JPG (Max size:2MB)</CustomText>
            </View>

            {/* Navigation Buttons */}
            <View style={styles.buttonRow}>
                <CustomButton
                    label="Prev"
                    fontWeight="bold"
                    fontSize={RV(13)}
                    textColor={Colors.textBlue}
                    bgColor={Colors.background}
                    width="30%"
                    showLeftIcon
                    iconName="keyboard-arrow-left"
                    iconFamily="MaterialIcons"
                    iconSize={RV(20)}
                    iconColor={Colors.textBlue}
                    onPress={goToPrev}
                    borderColor={Colors.textBlue}
                />

                <CustomButton
                    label="Submit Application"
                    fontWeight="bold"
                    fontSize={RV(13)}
                    textColor={Colors.background}
                    bgColor={Colors.textBlue}
                    width="44%"
                    showIcon
                    iconName="send"
                    iconFamily="MaterialIcons"
                    iconSize={RV(20)}
                    iconColor={Colors.background}
                    onPress={goToNext}
                    borderColor={Colors.textBlue}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fieldContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 15,
        marginBottom: 8,
        color: '#333',
        fontWeight: '600',
    },
    required: {
        color: 'red',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        color: '#333',
        backgroundColor: '#fff',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    charCount: {
        alignSelf: 'flex-end',
        marginTop: 4,
        fontSize: 12,
        color: '#999',
    },
    uploadBtn: {
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: '#f2f2f2',
        alignSelf: 'flex-start',
    },
    uploadText: {
        fontSize: 14,
        color: Colors.textBlue,
    },
    selectedFile: {
        marginTop: 6,
        fontSize: 13,
        color: '#555',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: RV(5),
    },
});

export default RtiRequest;
