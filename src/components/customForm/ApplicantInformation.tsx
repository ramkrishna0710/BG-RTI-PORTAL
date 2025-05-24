import { getRTIStepOne } from '@api/auth';
import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
import CustomButton from '@components/ui/CustomButton';
import { Colors } from '@unistyles/Contstants';
import { RV } from '@unistyles/unistyles';
import { showToast } from '@utils/ToastUtils';
import { isAadhaarValid, isEmailValid, isMobileNumberValid, isNameValid } from '@utils/validators';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

type GenderType = 'Male' | 'Female' | 'Other' | null;

interface ApplicantData {
  fullName: string;
  gender: GenderType;
  mobileNumber: string;
  emailAddress: string;
  aadhaarNumber: string;
}

interface Props {
  data: ApplicantData;
  setData: React.Dispatch<React.SetStateAction<ApplicantData>>;
  goToNext: (id: string) => void;
}

const ApplicantInformation = ({ data, setData, goToNext }: Props) => {

  const [fullNameError, setFullNameError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [aadhaarError, setAadhaarError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const onHandleNext = async () => {
    let isValid = true;
    let firstErrorMessage = '';

    if (!isNameValid(data.fullName)) {
      setFullNameError(true);
      if (!firstErrorMessage) firstErrorMessage = 'Full name must be at least 2 characters long';
      isValid = false;
    } else {
      setFullNameError(false);
    }

    if (!data.gender) {
      setGenderError(true);
      if (!firstErrorMessage) firstErrorMessage = 'Gender must be selected';
      isValid = false;
    } else {
      setGenderError(false);
    }

    if (!isMobileNumberValid(data.mobileNumber)) {
      setMobileNumberError(true);
      if (!firstErrorMessage) firstErrorMessage = 'Enter a valid 10-digit mobile number';
      isValid = false;
    } else {
      setMobileNumberError(false);
    }

    if (!isEmailValid(data.emailAddress)) {
      setEmailError(true);
      if (!firstErrorMessage) firstErrorMessage = 'Please enter a valid email address';
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (data.aadhaarNumber && !isAadhaarValid(data.aadhaarNumber)) {
      setAadhaarError(true);
      if (!firstErrorMessage) firstErrorMessage = 'Aadhaar must be a 12-digit number';
      isValid = false;
    } else {
      setAadhaarError(false);
    }

    if (!isValid) {
      showToast(firstErrorMessage, 'error');
      return;
    }

    try {
      setIsLoading(true)
      const res = await getRTIStepOne(data.fullName, data.gender!.toLowerCase(), data.mobileNumber, data.emailAddress, data.aadhaarNumber);
      goToNext(res.data._id);
      showToast(res.message, 'success');
    } catch (err: any) {
      console.log(err.response?.data?.message);
      showToast(err.response?.data?.message, 'error');
    } finally {
      setIsLoading(false)
    }
  }


  const RadioButton = ({ selected }: { selected: boolean }) => (
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { color: fullNameError ? Colors.red : Colors.lightText }]}>
          Full Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, fullNameError && { borderColor: Colors.red }]}
          value={data.fullName}
          onChangeText={(text) => {
            setData((prev) => ({ ...prev, fullName: text }));
            if (fullNameError) setFullNameError(false);
          }}
          placeholder="Enter your full name"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { color: genderError ? Colors.red : Colors.lightText }]}>
          Gender <Text style={[styles.required, { borderColor: genderError ? Colors.red : Colors.lightText }]}>*</Text>
        </Text>
        <View style={styles.radioGroup}>
          {['Male', 'Female', 'Other'].map((g) => (
            <TouchableOpacity
              key={g}
              style={styles.radioOption}
              onPress={() => {
                setData((prev) => ({ ...prev, gender: g as GenderType }));
                if (genderError) setGenderError(false)
              }}
              activeOpacity={0.8}
            >
              <RadioButton selected={data.gender === g} />
              <Text style={styles.radioLabel}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { color: mobileNumberError ? Colors.red : Colors.lightText }]}>
          Mobile Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, emailError && { borderColor: Colors.red }]}
          value={data.mobileNumber}
          onChangeText={(text) => {
            setData((prev) => ({ ...prev, mobileNumber: text }));
            if (mobileNumberError) setMobileNumberError(false);
          }}
          placeholder="10-digit mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, { color: emailError ? Colors.red : Colors.lightText }]}>
          Email Address <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.input, emailError && { borderColor: Colors.red }]}
          value={data.emailAddress}
          onChangeText={(text) => {
            setData((prev) => ({ ...prev, emailAddress: text }));
            if (emailError) setEmailError(false);
          }}
          placeholder="example@domain.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Aadhaar Number (Optional)</Text>
        <TextInput
          style={[styles.input, aadhaarError && { borderColor: Colors.red }]}
          value={data.aadhaarNumber}
          onChangeText={(text) => {
            setData((prev) => ({ ...prev, aadhaarNumber: text }));
            if (aadhaarError) setAadhaarError(false);
          }} placeholder="12-digit Aadhaar number"
          keyboardType="number-pad"
          maxLength={12}
          placeholderTextColor="#999"
        />
      </View>

      <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', gap: RV(5) }}>
        <TouchableOpacity style={styles.saveBtn}>
          <Icon iconFamily='Ionicons' name='save-outline' size={RV(18)} color={Colors.textBlue} />
          <CustomText fontFamily='Okra-Regular' fontSize={RV(10)} color={Colors.textBlue}>Save & Continue Later</CustomText>
        </TouchableOpacity>

        <CustomButton
          label={isLoading ? <ActivityIndicator size={'small'} color={Colors.background} /> : "Next"}
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
          onPress={() => onHandleNext()}
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

export default ApplicantInformation;
