import CustomButton from '@components/ui/CustomButton';
import { Colors } from '@unistyles/Contstants';
import { RV } from '@unistyles/unistyles';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { showToast } from '@utils/ToastUtils';
import { getRTIStepTwo } from '@api/auth';

interface AddressData {
    addressLineOne: string;
    addressLineTwo: string;
    state: string;
    district: string;
    block: string;
    panchayat: string;
    village: string;
    pinCode: string;
    education: string;
    otherEducation: string;
    bplCard: 'Yes' | 'No' | null;
}
interface AddressInformationProps {
    goToNext: (id: string) => void;
    goToPrev: () => void;
    step1Id: string;
    addressData: AddressData;
    setAddressData: React.Dispatch<React.SetStateAction<AddressData>>;
}


type BplType = | 'Yes' | 'No' | null;

const AddressInformation: React.FC<AddressInformationProps> = ({ addressData, setAddressData, goToNext, goToPrev, step1Id }) => {

    const [openDistrict, setOpenDistrict] = useState(false);
    const [openEducation, setOpenEducation] = useState(false);

    const [addressLineOneError, setAddressLineOneError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [districtError, setDistrictError] = useState(false);
    const [blockError, setBlockError] = useState(false);
    const [pinCodeError, setPinCodeError] = useState(false);
    const [educationError, setEducationError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)


    const [educationOptions, setEducationOptions] = useState([
        { label: 'Primary', value: 'PR' },
        { label: 'Secondary', value: 'SE' },
        { label: 'Higher Secondary', value: 'HS' },
        { label: 'Graduate', value: 'GD' },
        { label: 'Post Graduate', value: 'PGD' },
        { label: 'Doctorate', value: 'DOC' },
        { label: 'Other', value: 'OTH' },
    ]);

    const [districOptions, setDistricOptions] = useState([
        { label: 'Patna', value: 'PR' },
        { label: 'Gaya', value: 'SE' },
        { label: 'Muzaffapur', value: 'HS' },
        { label: 'Bhaagalpur', value: 'GD' },
    ]);

    const RadioButton = ({ selected }: { selected: boolean }) => (
        <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
            {selected && <View style={styles.radioInner} />}
        </View>
    );


    const onHandleNext = async () => {
        let isValid = true;
        let firstErrorMessage = '';

        if (!addressData.addressLineOne.trim()) {
            setAddressLineOneError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Address Line 1 is required';
            isValid = false;
        } else {
            setAddressLineOneError(false);
        }

        if (!addressData.state.trim()) {
            setStateError(true);
            if (!firstErrorMessage) firstErrorMessage = 'State is required';
            isValid = false;
        } else {
            setStateError(false);
        }

        if (!addressData.district) {
            setDistrictError(true);
            if (!firstErrorMessage) firstErrorMessage = 'District must be selected';
            isValid = false;
        } else {
            setDistrictError(false);
        }

        if (!addressData.block.trim()) {
            setBlockError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Block is required';
            isValid = false;
        } else {
            setBlockError(false);
        }

        if (!addressData.pinCode.trim() || addressData.pinCode.length !== 6) {
            setPinCodeError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Enter a valid 6-digit PIN Code';
            isValid = false;
        } else {
            setPinCodeError(false);
        }

        if (!addressData.education) {
            setEducationError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Education must be selected';
            isValid = false;
        } else {
            setEducationError(false);
        }

        if (!isValid) {
            showToast(firstErrorMessage, 'error');
            return;
        }

        try {
            setIsLoading(true)
            const data = await getRTIStepTwo(step1Id, {
                addressLine1: addressData.addressLineOne,
                addressLine2: addressData.addressLineTwo,
                state: addressData.state,
                district: addressData.district,
                block: addressData.block,
                panchayat: addressData.panchayat,
                village: addressData.village,
                zip: addressData.pinCode,
                education: addressData.education === 'OTH' ? addressData.otherEducation : addressData.education,
                bpl: addressData.bplCard === 'Yes'
            });

            goToNext(data.data._id);
            showToast(data.message, 'success');
        } catch (err: any) {
            console.log(err.response?.data?.message);
            showToast(err.response?.data?.message, 'error');
        } finally {
            setIsLoading(false)
        }

    };


    return (
        <View style={styles.container}>

            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: addressLineOneError ? Colors.red : Colors.lightText }]}>
                    Address Line 1 <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[styles.input, addressLineOneError && { borderColor: Colors.red }]}
                    value={addressData.addressLineOne}
                    onChangeText={(text) => {
                        setAddressData(prev => ({ ...prev, addressLineOne: text }));
                        if (addressLineOneError) setAddressLineOneError(false);
                    }}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                    Address Line 2 <Text style={styles.label}>(Optional)</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    value={addressData.addressLineTwo}
                    onChangeText={(text) => setAddressData(prev => ({ ...prev, addressLineTwo: text }))}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: stateError ? Colors.red : Colors.lightText }]}>
                    State <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[styles.input, stateError && { borderColor: Colors.red }]}
                    value={addressData.state}
                    editable={false}
                // onChangeText={(text) => {
                //     setState(text);
                //     if (stateError) setStateError(false);
                // }}
                />
            </View>

            <View style={[styles.fieldContainer]}>
                <Text style={[styles.label, { color: districtError ? Colors.red : Colors.lightText }]}>
                    Distric <Text style={styles.required}>*</Text>
                </Text>
                <DropDownPicker
                    open={openDistrict}
                    value={addressData.district}
                    items={districOptions}
                    setOpen={setOpenDistrict}
                    setValue={(cb) => setAddressData(prev => ({ ...prev, district: cb(prev.district) }))}
                    setItems={setDistricOptions}
                    placeholder="Select District"
                    style={[styles.input, districtError && { borderColor: Colors.red }]}
                    dropDownContainerStyle={{ borderColor: '#ccc' }}
                    listMode='SCROLLVIEW'
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: blockError ? Colors.red : Colors.lightText }]}>
                    Block <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[styles.input, blockError && { borderColor: Colors.red }]}
                    value={addressData.block}
                    onChangeText={(text) => setAddressData(prev => ({ ...prev, block: text }))}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                    Panchayat
                </Text>
                <TextInput
                    style={styles.input}
                    value={addressData.panchayat}
                    onChangeText={(text) => setAddressData(prev => ({ ...prev, panchayat: text }))}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                    Village
                </Text>
                <TextInput
                    style={styles.input}
                    value={addressData.village}
                    onChangeText={(text) => setAddressData(prev => ({ ...prev, village: text }))}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: pinCodeError ? Colors.red : Colors.lightText }]}>
                    PIN Code <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[styles.input, pinCodeError && { borderColor: Colors.red }]}
                    value={addressData.pinCode}
                    onChangeText={(text) => {
                        setAddressData(prev => ({ ...prev, pinCode: text }));
                        if (pinCodeError) setPinCodeError(false);
                    }}
                    placeholder="6-digit PIN code"
                    keyboardType="phone-pad"
                    maxLength={6}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={[styles.fieldContainer]}>
                <Text style={[styles.label, { color: educationError ? Colors.red : Colors.lightText }]}>
                    Education <Text style={styles.required}>*</Text>
                </Text>
                <DropDownPicker
                    open={openEducation}
                    value={addressData.education}
                    items={educationOptions}
                    setOpen={setOpenEducation}
                    setValue={(cb) => setAddressData(prev => ({ ...prev, education: cb(prev.education) }))}
                    setItems={setEducationOptions}
                    placeholder="Select your education"
                    style={[styles.input, educationError && { borderColor: Colors.red }]}
                    dropDownContainerStyle={{ borderColor: '#ccc' }}
                    listMode='SCROLLVIEW'
                />
            </View>
            {addressData.education === 'OTH' && (
                <View style={[styles.fieldContainer, { marginTop: -15 }]}>
                    <Text style={styles.label}>
                        Specify Other Education
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter other education"
                        value={addressData.otherEducation}
                        onChangeText={(text) => setAddressData(prev => ({ ...prev, otherEducation: text }))}
                    />
                </View>
            )}


            <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                    BPL Card Holder
                </Text>
                <View style={styles.radioGroup}>
                    {['Yes', 'No'].map((g) => (
                        <TouchableOpacity
                            key={g}
                            style={styles.radioOption}
                            onPress={() => setAddressData(prev => ({ ...prev, bplCard: g as BplType }))}
                            activeOpacity={0.8}
                        >
                            <RadioButton selected={addressData.bplCard === g} />
                            <Text style={styles.radioLabel}>{g}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', gap: RV(5) }}>
                <CustomButton
                    label='Prev'
                    fontWeight={'bold'}
                    fontSize={RV(13)}
                    textColor={Colors.textBlue}
                    bgColor={Colors.background}
                    width={'30%'}
                    showLeftIcon={true}
                    iconName='keyboard-arrow-left'
                    iconFamily='MaterialIcons'
                    iconSize={RV(20)}
                    iconColor={Colors.textBlue}
                    onPress={() =>
                        goToPrev()
                    }
                    borderColor={Colors.textBlue}
                />

                {/* <TouchableOpacity style={styles.saveBtn}>
                    <Icon iconFamily='Ionicons' name='save-outline' size={RV(20)} color={Colors.textBlue} />
                    <CustomText fontFamily='Okra-Regular' fontSize={RV(14)} color={Colors.textBlue}>Save & Continue{'\n'}Later</CustomText>
                </TouchableOpacity> */}

                <CustomButton
                    label={isLoading?<ActivityIndicator size={'small'} color={Colors.background}/>:"Next"}
                    fontWeight={'bold'}
                    fontSize={RV(13)}
                    textColor={Colors.background}
                    bgColor={Colors.textBlue}
                    width={'30%'}
                    showIcon={true}
                    iconName='keyboard-arrow-right'
                    iconFamily='MaterialIcons'
                    iconSize={RV(20)}
                    iconColor={Colors.background}
                    onPress={() =>
                        onHandleNext()
                    }
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
        marginBottom: 24,
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
    radioGroup: {
        flexDirection: 'row',
        marginTop: 8,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 24,
    },
    radioOuter: {
        height: 22,
        width: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    radioOuterSelected: {
        borderColor: '#007bff',
    },
    radioInner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#007bff',
    },
    radioLabel: {
        fontSize: 15,
        color: '#333',
    },
    saveBtn: {
        flexDirection: 'row',
        gap: RV(7),
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AddressInformation;
