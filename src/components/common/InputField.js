import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: WIDTH } = Dimensions.get('window')
export default class InputField extends Component {
    render() {
        const {placeholder,returnKeyType,onChangeText,keyboardType,autoCapitalize,autoCorrect,secureTextEntry,onSubmitEditing}=this.props;
        return (
            <View>
                <TextInput style={styles.input}
                    placeholder={placeholder}
                    returnKeyType={returnKeyType}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={secureTextEntry}
                    onSubmitEditing={onSubmitEditing}
                    underlineColorAndroid="rgba(0,0,0,0)"
                >
                </TextInput>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    input: {
        height: 40,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.1)',
        color: '#000000',
        marginHorizontal: 25,
        marginBottom: 15,
    },
})