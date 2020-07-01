import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, ToastAndroid, View, Dimensions, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import { Text, Form, Header, Container, Right, Body, Left } from 'native-base';
import NewButtons from '../components/common/NewButtons';
import Logo from '../components/common/Logo';
import HeaderTitle from '../components/common/HeaderTitle';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
import axios from 'axios';
import { url } from '../../url';

const { width: WIDTH } = Dimensions.get('window')

export default class Login extends Component {
    // static navigationOptions = {
    //     header: null,
    // }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    saveToken = async (token) => {
        await AsyncStorage.setItem('@token', token);
    }

    loginPress = () => {
        console.log(this.state)
        if (this.state.email !== "" && this.state.password !== "") {
            this.setState({loading: true});
        const userDetails = {
            email: this.state.email,
            password: this.state.password
        }
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            url: `${url}/api/user/signin`,
            data: userDetails
        }
        axios(options)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    ToastAndroid.show(`You are Logging In`, ToastAndroid.SHORT);
                    this.saveToken(res.data.token);
                    this.props.navigation.navigate('Home')
                }
                else {
                    ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
                }
            })
            .catch((err) => {
                alert(err);
              })
        }
    }

    forgotPress = () => {
        this.props.navigation.navigate('Forgot')
    }

    registerPress = () => {
        this.props.navigation.navigate('Register')
    }

    renderLoader=()=>{
        if (this.state.loading === true) {
            return(
                <Loader/>
            )
        }
    }
    render() {
        return (
            <ScrollView>
                {this.renderLoader()}
                <Container>
                    <Header style={styles.headerStyle}>
                        <Left />
                        <Body>
                            <HeaderTitle headTitle="Login" />
                        </Body>
                        <Right />
                    </Header>

                    <KeyboardAvoidingView behavior="padding" style={styles.Container} enabled>
                        <Logo />
                        <View style={styles.FormContainer}>
                            <Form>
                                <View>
                                    <Icon name={"user"} size={20} style={styles.inputIcon} />
                                    <TextInput style={styles.input}
                                        placeholder={"Email Address"}
                                        onChangeText={(email) => this.setState({ email })}
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="email-address"
                                    />
                                </View>
                                <Text />
                                <View>
                                    <Icon name={"lock"} size={20} style={styles.inputIcon} />
                                    <TextInput placeholder={"Password"} returnKey="go"
                                        style={styles.input}
                                        secureText={true}
                                        onChangeText={(password) => this.setState({ password })}
                                        keypadType="text"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                </View>

                                <View style={styles.loginButtonContainer}>
                                    <Text />
                                    <NewButtons text="Login" onPress={this.loginPress} />
                                </View>
                            </Form>
                        </View>
                        <Text>
                            {'\n'}
                            <Text onPress={() => this.props.navigation.navigate('Forgot')} style={styles.pageLink}>Forgot Password</Text>
                            {'\n'}
                        </Text>
                        <Text>New User? <Text onPress={() => this.props.navigation.navigate('Register')} style={styles.pageLink}>Create an account</Text></Text>
                    </KeyboardAvoidingView>
                </Container>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        marginTop: -80,
    },
    inputIcon: {
        position: "absolute",
        top: 10,
        left: 45,
    },
    input: {
        width: WIDTH - 75,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.1)',
        color: '#000000',
        marginHorizontal: 25,
    },
    FormContainer: {
        marginTop: -80,
    },
    loginButtonContainer: {
        alignItems: 'center'
    },
    inputIcon: {
        position: "absolute",
        top: 10,
        left: 45,
    },
    headerStyle: {
        backgroundColor: '#ffffff',
    },
    pageLink: {
        color: '#ff9900',
        fontFamily: 'PatuaOne',
    },
})