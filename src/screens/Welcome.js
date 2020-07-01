import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Text, Button, AsyncStorage } from 'react-native';
import NewButtons from '../components/common/NewButtons';
import Logo from '../components/common/Logo';

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.load()
    }

    load = async () => {
        // await AsyncStorage.removeItem('@token');
        const token = await AsyncStorage.getItem('@token')
        console.log(token)
        this.props.navigation.navigate(token ? "Home" : "Welcome")

    }


    loginPress = () => {
        console.log("work", this.props)
        this.props.navigation.navigate('Login');
    }
    registerPress = () => {
        this.props.navigation.navigate('Register');
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
                <View style={styles.logoContainer}>
                    <Logo />
                    <Text style={styles.mainHead}>Welcome to Food Zone</Text>
                    <Text style={{ margin: 10, textAlign: 'center' }}>Check out our menus, order food and make reservations{"\n"}{"\n"}</Text>
                    <NewButtons text="Login"
                        onPress={this.loginPress} />
                    <NewButtons text="Register"
                        onPress={this.registerPress} />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
    },
    mainHead: {
        fontFamily: 'PatuaOne',
        color: '#ff9900',
        fontSize: 28,
        marginTop: -50,
    },
})
