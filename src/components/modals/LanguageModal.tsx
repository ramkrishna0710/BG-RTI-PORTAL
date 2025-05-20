import { Colors } from '@unistyles/Contstants';
import { RV } from '@unistyles/unistyles';
import React from 'react';
import {
    Modal,
    View,
    Text,
    Pressable,
    StyleSheet,
} from 'react-native';

interface LanguageModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectLanguage: (language: string) => void;
    selectedLanguage: string;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
    visible,
    onClose,
    onSelectLanguage,
    selectedLanguage,
}) => {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {['English', 'Hindi'].map((lang) => (
                        <Pressable
                            key={lang}
                            style={[styles.option, selectedLanguage === lang && { backgroundColor: '#e5eef5', borderRadius: 8, }]}
                            onPress={() => onSelectLanguage(lang)}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    selectedLanguage === lang && { color: Colors.textBlue },
                                ]}
                            >
                                {lang === 'Hindi' ? 'हिन्दी (Hindi)' : 'English'}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </Modal>
    );
};

export default LanguageModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: Colors.transparent,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: RV(47),
        right: RV(45),
        position: 'absolute'
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 8,
        width: 150,
        elevation: 5,
        paddingTop: RV(3.5)
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    text: {
        fontSize: 14,
        color: '#000',
    },
});
