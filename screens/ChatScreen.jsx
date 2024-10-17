// ChatScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import firebaseService from '../Firebase';

const ChatScreen = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = firebaseService.getMessages((newMessage) => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });

        return () => {
            unsubscribe();
            firebaseService.unsubscribeMessages(); // Ensure this function exists
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            console.log('Sending message:', message); // Debug log
            firebaseService.sendMessage(message)
                .then(() => {
                    console.log('Message sent successfully');
                })
                .catch((error) => {
                    console.error('Error sending message:', error);
                });
            setMessage('');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.user.name}: {item.text}</Text>
                    </View>
                )}
            />
            <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    );
};

export default ChatScreen;
