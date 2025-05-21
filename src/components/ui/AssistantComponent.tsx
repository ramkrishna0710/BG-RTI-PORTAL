import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from '@components/global/Icon'
import { RV } from '@unistyles/unistyles'
import { Colors } from '@unistyles/Contstants'

const AssistantComponent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [message, setMessage] = useState('')

    const commonQuestions = [
        'How do I file an RTI?',
        'How to track my application?',
        'What are the fees?'
    ]

    return (
        <>
            <TouchableOpacity 
                style={styles.container}
                onPress={() => setIsModalVisible(true)}
            >
                <Icon
                    iconFamily='MaterialCommunityIcons'
                    name='chat-outline'
                    size={RV(24)}
                    color={Colors.background}
                />
            </TouchableOpacity>

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.chatContainer}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Help Assistant</Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Icon
                                    iconFamily='MaterialCommunityIcons'
                                    name='close'
                                    size={RV(20)}
                                    color={Colors.textBlue}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Welcome message */}
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>Hello! How can I help you with your RTI application today?</Text>
                            <Text style={styles.timeText}>01:48 PM</Text>
                        </View>

                        {/* Common questions */}
                        {commonQuestions.map((question, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.questionButton}
                                onPress={() => setMessage(question)}
                            >
                                <Text style={styles.questionText}>{question}</Text>
                            </TouchableOpacity>
                        ))}

                        {/* Input area */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Type your question here..."
                                value={message}
                                onChangeText={setMessage}
                            />
                            <TouchableOpacity style={styles.sendButton}>
                                <Icon
                                    iconFamily='MaterialCommunityIcons'
                                    name='send'
                                    size={RV(20)}
                                    color={Colors.textBlue}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default AssistantComponent

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: RV(24),
        right: RV(16),
        height: RV(48),
        width: RV(48),
        borderRadius: RV(24),
        backgroundColor: Colors.textBlue,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        shadowColor: Colors.lightText,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        zIndex: 999
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    chatContainer: {
        backgroundColor: Colors.background,
        borderTopLeftRadius: RV(16),
        borderTopRightRadius: RV(16),
        padding: RV(16),
        height: '60%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: RV(16)
    },
    headerText: {
        fontSize: RV(16),
        fontWeight: 'bold',
        color: Colors.textBlue
    },
    messageContainer: {
        backgroundColor: Colors.transparent,
        padding: RV(12),
        borderRadius: RV(8),
        marginBottom: RV(16)
    },
    messageText: {
        fontSize: RV(14),
        color: Colors.text
    },
    timeText: {
        fontSize: RV(10),
        color: Colors.lightText,
        marginTop: RV(4),
        textAlign: 'right'
    },
    questionButton: {
        backgroundColor: Colors.transparent,
        padding: RV(12),
        borderRadius: RV(8),
        marginBottom: RV(8)
    },
    questionText: {
        fontSize: RV(14),
        color: Colors.textBlue
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.transparent,
        borderRadius: RV(24),
        paddingHorizontal: RV(12),
        marginTop: 'auto'
    },
    input: {
        flex: 1,
        height: RV(40),
        fontSize: RV(14)
    },
    sendButton: {
        padding: RV(8)
    }
})