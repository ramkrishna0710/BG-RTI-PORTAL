import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// import DocumentPicker, { types } from 'react-native-document-picker';
import CustomButton from '@components/ui/CustomButton';
import { Colors } from '@unistyles/Contstants';
import { RV } from '@unistyles/unistyles';
import CustomText from '@components/global/CustomText';
import { showToast } from '@utils/ToastUtils';

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
    const [departmentError, setDepartmentError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [fileError, setFileError] = useState(false);

    const onSubmit = () => {
        let isValid = true;
        let firstErrorMessage = '';

        if (!selectDepartment) {
            setDepartmentError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Please select a department';
            isValid = false;
        } else {
            setDepartmentError(false);
        }

        if (!subject.trim()) {
            setSubjectError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Subject is required';
            isValid = false;
        } else {
            setSubjectError(false);
        }

        if (!description.trim()) {
            setDescriptionError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Description is required';
            isValid = false;
        } else {
            setDescriptionError(false);
        }

        // if (selectedFile && !/\.(pdf|jpg|jpeg)$/i.test(selectedFile)) {
        //     setFileError(true);
        //     if (!firstErrorMessage) firstErrorMessage = 'Only PDF or JPG files are allowed';
        //     isValid = false;
        // } else {
        //     setFileError(false);
        // }

        if (!isValid) {
            showToast(firstErrorMessage, 'error');
            return;
        }

        goToNext();
    };

    // const pickDocument = async () => {
    //     try {
    //         const res = await DocumentPicker.pickSingle({
    //             type: [types.pdf, types.images],
    //         });

    //         const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
    //         const maxSize = 2 * 1024 * 1024; // 2MB

    //         if (!allowedTypes.includes(res.type || '')) {
    //             setFileError('Only PDF or JPG files are allowed.');
    //             return;
    //         }

    //         if (res.size && res.size > maxSize) {
    //             setFileError('File size should not exceed 2MB.');
    //             return;
    //         }

    //         setSelectedFile(res.name);
    //         setFileError(null);
    //     } catch (err) {
    //         if (DocumentPicker.isCancel(err)) return;
    //         console.warn('Error picking document:', err);
    //     }
    // };

    return (
        <View style={styles.container}>

            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: departmentError ? Colors.red : Colors.lightText }]}>
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
                    style={[styles.input, departmentError && { borderColor: Colors.red }]}
                    dropDownContainerStyle={{ borderColor: '#ccc' }}
                    listMode="SCROLLVIEW"
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: subjectError ? Colors.red : Colors.lightText }]}>
                    Subject <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[styles.input, subjectError && { borderColor: Colors.red }]}
                    value={subject}
                    onChangeText={setSubject}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: descriptionError ? Colors.red : Colors.lightText }]}>
                    Description <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[styles.input, subjectError && { borderColor: Colors.red }, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    maxLength={300}
                    placeholder="Enter description"
                />
                <Text style={styles.charCount}>{description.length}/300</Text>
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Upload Supporting Document</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: RV(11),
                }}>
                    <TouchableOpacity style={styles.uploadBtn} onPress={() => { }}>
                        <Text style={styles.uploadText}>Choose File</Text>
                    </TouchableOpacity>
                    <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} color={Colors.lightText}>No file chosen</CustomText>
                </View>
                {selectedFile && <Text style={styles.selectedFile}>{selectedFile}</Text>}
                <CustomText fontFamily='Okra-Regular' fontSize={RV(9)} color={Colors.lightText} style={{ marginTop: RV(2) }}>Allowed file types: PDF, JPG (Max size:2MB)</CustomText>
            </View>

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
