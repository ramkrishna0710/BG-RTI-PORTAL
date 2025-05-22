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
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { showToast } from '@utils/ToastUtils';

type BplType = | 'Yes' | 'No' | null;

const AddressInformation = ({ goToNext, goToPrev }: { goToNext: () => void, goToPrev: () => void }) => {
    const [addressLineOne, setAddressLineOne] = useState('');
    const [addressLineTwo, setAddressLineTwo] = useState('');
    const [state, setState] = useState('Bihar');
    const [block, setBlock] = useState('');
    const [panchayat, setPanchayat] = useState('');
    const [village, setVillage] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [bplCard, setBplCard] = useState<BplType>(null);
    const [open, setOpen] = useState(false);
    const [selectEducation, setSelectEducation] = useState(null);
    const [otherEducation, setOtherEducation] = useState('');
    const [selectDistric, setSelectDistric] = useState(null);

    const [addressLineOneError, setAddressLineOneError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [districtError, setDistrictError] = useState(false);
    const [blockError, setBlockError] = useState(false);
    const [pinCodeError, setPinCodeError] = useState(false);
    const [educationError, setEducationError] = useState(false);


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


    const onHandleNext = () => {
        let isValid = true;
        let firstErrorMessage = '';

        if (!addressLineOne.trim()) {
            setAddressLineOneError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Address Line 1 is required';
            isValid = false;
        } else {
            setAddressLineOneError(false);
        }

        if (!state.trim()) {
            setStateError(true);
            if (!firstErrorMessage) firstErrorMessage = 'State is required';
            isValid = false;
        } else {
            setStateError(false);
        }

        if (!selectDistric) {
            setDistrictError(true);
            if (!firstErrorMessage) firstErrorMessage = 'District must be selected';
            isValid = false;
        } else {
            setDistrictError(false);
        }

        if (!block.trim()) {
            setBlockError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Block is required';
            isValid = false;
        } else {
            setBlockError(false);
        }

        if (!pinCode.trim() || pinCode.length !== 6) {
            setPinCodeError(true);
            if (!firstErrorMessage) firstErrorMessage = 'Enter a valid 6-digit PIN Code';
            isValid = false;
        } else {
            setPinCodeError(false);
        }

        if (!selectEducation) {
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

        goToNext();
    };


    return (
        <View style={styles.container}>

            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: addressLineOneError ? Colors.red : Colors.lightText }]}>
                    Address Line 1 <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[styles.input, addressLineOneError && { borderColor: Colors.red }]}
                    value={addressLineOne}
                    onChangeText={(text) => {
                        setAddressLineOne(text);
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
                    value={addressLineTwo}
                    onChangeText={setAddressLineTwo}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: stateError ? Colors.red : Colors.lightText }]}>
                    State <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[styles.input, stateError && { borderColor: Colors.red }]}
                    value={state}
                    editable={false}
                    onChangeText={(text) => {
                        setState(text);
                        if (stateError) setStateError(false);
                    }}
                />
            </View>

            <View style={[styles.fieldContainer]}>
                <Text style={[styles.label, { color: districtError ? Colors.red : Colors.lightText }]}>
                    Distric <Text style={styles.required}>*</Text>
                </Text>
                <DropDownPicker
                    open={open}
                    value={selectDistric}
                    items={districOptions}
                    setOpen={setOpen}
                    setValue={setSelectDistric}
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
                    value={block}
                    onChangeText={setBlock}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                    Panchayat
                </Text>
                <TextInput
                    style={styles.input}
                    value={panchayat}
                    onChangeText={setPanchayat}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={styles.label}>
                    Village
                </Text>
                <TextInput
                    style={styles.input}
                    value={village}
                    onChangeText={setVillage}
                />
            </View>

            <View style={styles.fieldContainer}>
                <Text style={[styles.label, { color: pinCodeError ? Colors.red : Colors.lightText }]}>
                    PIN Code <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    style={[styles.input, pinCodeError && { borderColor: Colors.red }]}
                    value={pinCode}
                    onChangeText={(text) => {
                        setPinCode(text);
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
                    open={open}
                    value={selectEducation}
                    items={educationOptions}
                    setOpen={setOpen}
                    setValue={setSelectEducation}
                    setItems={setEducationOptions}
                    placeholder="Select your education"
                    style={[styles.input, educationError && { borderColor: Colors.red }]}
                    dropDownContainerStyle={{ borderColor: '#ccc' }}
                    listMode='SCROLLVIEW'
                />
            </View>
            {selectEducation === 'OTH' && (
                <View style={[styles.fieldContainer, { marginTop: -15 }]}>
                    <Text style={styles.label}>
                        Specify Other Education
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter other education"
                        value={otherEducation}
                        onChangeText={setOtherEducation}
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
                            onPress={() => setBplCard(g as BplType)}
                            activeOpacity={0.8}
                        >
                            <RadioButton selected={bplCard === g} />
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
                    label='Next'
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
