import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Form, Header, Container, Right, Body, Text, Left } from 'native-base';
import NewButtons from '../components/common/NewButtons';
import HeaderTitle from '../components/common/HeaderTitle';
import InputField from '../components/common/InputField';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../components/Loader';
// import axios from 'axios';

const { width: WIDTH } = Dimensions.get('window')
export default class Forgot extends Component {
    // static navigationOptions = {
    //     header: null,
    // }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            loading: false
        }
    }
    continuePress = () => {
        if (this.state.email !== '') {
            console.log(this.state);
            this.setState({ loading: true });
            const userDetails = {
                email: this.state.email
            };
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({ bodyData: userDetails }),
                url: `${URL}/api/forgetPassword`,
            }
            axios(options)
                .then(res => {
                    console.log(res)
                    this.setState({ loading: false, email: '' });
                    ToastAndroid.show(`Check your Email, Password has been sent`, ToastAndroid.SHORT)
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ loading: false });
                    ToastAndroid.show(`${err}`, ToastAndroid.SHORT)
                })
        } else {
            ToastAndroid.show('Enter the email', ToastAndroid.SHORT)
        }
  
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
            <Container>
                <Header style={styles.headerStyle}>
                    <Left />
                    <Body>
                        <HeaderTitle headTitle="Reset Password" />
                    </Body>
                    <Right />
                </Header>
                <KeyboardAvoidingView behavior="padding" style={styles.Container} enabled>
                    <Text style={{ margin: 40, marginBottom: 0 }}>To reset your password, please enter your email address{"\n"}{"\n"}</Text>
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
                            <View style={styles.loginButtonContainer}>
                                <NewButtons text="Continue" onPress={this.continuePress} />
                            </View>
                        </Form>
                    </View>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
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
    loginButtonContainer: {
        alignItems: 'center'
    },
    inputIcon: {
        position: "absolute",
        top: 10,
        left: 45,
    },
    pageLink: {
        color: '#ff9900',
        fontFamily: 'PatuaOne',
    },
    FormContainer: {
        marginTop: -20,
    },
    headerStyle: {
        backgroundColor: '#ffffff',
    },
})