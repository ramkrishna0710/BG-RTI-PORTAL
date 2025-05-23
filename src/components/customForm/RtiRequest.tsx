import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import CustomButton from '@components/ui/CustomButton';
import { Colors } from '@unistyles/Contstants';
import { RV } from '@unistyles/unistyles';
import CustomText from '@components/global/CustomText';
import { showToast } from '@utils/ToastUtils';
import { getRTIStepThree } from '@api/auth';
import SuccessModal from '@components/modals/SuccessModal';
import { resetAndNavigate } from '@utils/NavigationUtils';

interface RTIRequestProps {
    goToNext: (id?: string) => void;
    goToPrev: () => void;
    step1Id: string | null;
}

const RtiRequest: React.FC<RTIRequestProps> = ({ goToPrev, step1Id }) => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [selectDepartment, setSelectDepartment] = useState('');
    const [open, setOpen] = useState(false);

    const [departmetOpations, setDepartmetOptions] = useState([
        { label: 'Agriculture Department', value: 'PR' },
        { label: 'Education Department', value: 'SE' },
        { label: 'Health Department', value: 'HS' },
    ]);

    const [selectedFile, setSelectedFile] = useState("document.pdf");

    const [departmentError, setDepartmentError] = useState(false);
    const [subjectError, setSubjectError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [successModal, setSuccessModal] = useState(false)

    const onSubmit = async () => {
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

        if (!isValid) {
            showToast(firstErrorMessage, 'error');
            return;
        }

        console.log(selectDepartment);
        console.log(subject);
        console.log(description);


        try {
            await getRTIStepThree(step1Id, {
                department: selectDepartment,
                subject,
                description,
                file: selectedFile ??  null,
            });
            setSuccessModal(true);
        } catch (err: any) {
            console.log("Error " + err.response?.data?.message);
            showToast(err.response?.data?.message || 'Submission failed', 'error');
        }
    };

    // const pickDocument = async () => {
    //     try {
    //         const result = await DocumentPicker.pick({
    //             type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
    //         });

    //         if (result && result.length > 0) {
    //             const file = result[0];
    //             const fileName = file.name ?? 'Unnamed_File';
    //             const fileType = file.type || 'application/octet-stream';

    //             // Check file size (2MB max)
    //             if (file.size && file.size > 2 * 1024 * 1024) {
    //                 showToast('File size exceeds 2MB limit', 'error');
    //                 return;
    //             }

    //             setSelectedFile({
    //                 uri: file.uri,
    //                 name: fileName,
    //                 type: fileType,
    //             });
    //             showToast('File selected successfully', 'success');
    //         }
    //     } catch (err: any) {
    //         if (DocumentPicker.isCancel(err)) {
    //             console.log('User cancelled document picker');
    //             showToast('File selection cancelled', 'success');
    //         } else {
    //             console.error('Document picker error: ', err);
    //             showToast('Failed to select file', 'error');
    //         }
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
                    setItems={setDepartmetOptions}
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
                    style={[styles.input, descriptionError && { borderColor: Colors.red }, styles.textArea]}
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
                <View style={styles.uploadRow}>
                    <TouchableOpacity style={styles.uploadBtn} onPress={() => { }}>
                        <Text style={styles.uploadText}>Choose File</Text>
                    </TouchableOpacity>
                    <CustomText fontFamily="Okra-Regular" fontSize={RV(12)} color={Colors.lightText}>
                        No file chosen
                    </CustomText>
                </View>
                <CustomText
                    fontFamily="Okra-Regular"
                    fontSize={RV(9)}
                    color={Colors.lightText}
                    style={{ marginTop: RV(2) }}
                >
                    Allowed file types: PDF, JPG (Max size: 2MB)
                </CustomText>
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
                    fontSize={RV(11)}
                    textColor={Colors.background}
                    bgColor={Colors.textBlue}
                    width="44%"
                    showIcon
                    iconName="send"
                    iconFamily="MaterialIcons"
                    iconSize={RV(16)}
                    iconColor={Colors.background}
                    onPress={onSubmit}
                    borderColor={Colors.textBlue}
                />
            </View>

            <SuccessModal
                visible={successModal}
                onClose={() => {
                    setSuccessModal(false)
                    resetAndNavigate('DashboardScreen')
                }}
            />

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
    uploadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: RV(11),
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: RV(5),
    },
});

export default RtiRequest;
