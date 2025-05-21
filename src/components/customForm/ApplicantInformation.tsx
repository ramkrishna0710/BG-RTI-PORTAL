import CustomText from '@components/global/CustomText';
import Icon from '@components/global/Icon';
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
  ScrollView,
} from 'react-native';

type GenderType = 'Male' | 'Female' | 'Other' | null;

const ApplicantInformation = ({ goToNext }: { goToNext: () => void }) => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<GenderType>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');

  const RadioButton = ({ selected }: { selected: boolean }) => (
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Full Name */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Full Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          placeholderTextColor="#999"
        />
      </View>

      {/* Gender */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Gender <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.radioGroup}>
          {['Male', 'Female', 'Other'].map((g) => (
            <TouchableOpacity
              key={g}
              style={styles.radioOption}
              onPress={() => setGender(g as GenderType)}
              activeOpacity={0.8}
            >
              <RadioButton selected={gender === g} />
              <Text style={styles.radioLabel}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Mobile Number */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Mobile Number <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="10-digit mobile number"
          keyboardType="phone-pad"
          maxLength={10}
          placeholderTextColor="#999"
        />
      </View>

      {/* Email Address */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>
          Email Address <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={styles.input}
          value={emailAddress}
          onChangeText={setEmailAddress}
          placeholder="example@domain.com"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      {/* Aadhaar Number */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Aadhaar Number (Optional)</Text>
        <TextInput
          style={styles.input}
          value={aadhaarNumber}
          onChangeText={setAadhaarNumber}
          placeholder="12-digit Aadhaar number"
          keyboardType="number-pad"
          maxLength={12}
          placeholderTextColor="#999"
        />
      </View>

      <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', gap: RV(5) }}>
        <TouchableOpacity style={styles.saveBtn}>
          <Icon iconFamily='Ionicons' name='save-outline' size={RV(18)} color={Colors.textBlue} />
          <CustomText fontFamily='Okra-Regular' fontSize={RV(12)} color={Colors.textBlue}>Save & Continue Later</CustomText>
        </TouchableOpacity>

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
            goToNext()
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

export default ApplicantInformation;
