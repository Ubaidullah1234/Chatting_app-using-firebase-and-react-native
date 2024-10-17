import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [name, setName] = useState('');
    const navigation = useNavigation();

    const continueHandler = () => {
        navigation.navigate("Chat", { name: name });
    };

    return (
        <View style={styles.container}>
            <View style={styles.circle} />
            <View style={{ marginTop: 64 }}>
                <Image 
                    source={require("../assets/images.png")} 
                    style={{ 
                        width: 115, 
                        height: 100, 
                        alignSelf: "center", 
                        backgroundColor: 'transparent' // Ensure no background color
                    }} 
                />
            </View>

            <View style={{ marginHorizontal: 32, marginTop: 32 }}>
                <TextInput 
                    style={styles.input} 
                    placeholder="Enter your name" 
                    value={name} 
                    onChangeText={text => setName(text)} 
                />

                <TouchableOpacity style={styles.button} onPress={continueHandler}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f5f7",
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 500 / 2,
        backgroundColor: "#FFF",
        position: "absolute",
        left: -120,
        top: -20,
    },
    input: {
        height: 50,
        borderColor: "#BAB7C3",
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 30,
        paddingHorizontal: 16,
        color: "#514E5A",
        fontWeight: "600",
        marginTop: 32,
    },
    button: {
        marginTop: 32,
        height: 50,
        borderRadius: 30,
        backgroundColor: "#9075E3",
        justifyContent: "center",
        alignItems: "center",
    },
});
