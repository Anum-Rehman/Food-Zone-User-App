import React, { Component } from 'react';
import { StyleSheet, View, ToastAndroid, KeyboardAvoidingView, Image, Text, Dimensions, TextInput, ScrollView } from 'react-native';
import { Form, Header, Container, Left, Right, Body } from 'native-base';
import NewButtons from '../components/common/NewButtons';
import InputField from '../components/common/InputField';
import HeaderTitle from '../components/common/HeaderTitle';
import Loader from '../components/Loader';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { url } from '../../url';

const { width: WIDTH } = Dimensions.get('window')
const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        marginTop: -80,
    },
    FormContainer: {
        marginTop: -80,
    },
    registerButtonContainer: {
        alignItems: 'center'
    },


    logo: {
        width: 270,
        height: 270
    },
    headerStyle: {
        backgroundColor: '#ffffff',
    },
    pageLink: {
        color: '#ff9900',
        fontFamily: 'PatuaOne',
        fontSize: 20,
    },
    error: {
        color: 'red',
        marginHorizontal: 35,
        marginTop: -10,
        fontSize: 12,
    }
})

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            user_password: '',
            passconfirm: '',
            phone: '',
            email: '',
            loading: false
        }
    }
    onSubmit = (values) => {
        console.log(values);
        this.setState({loading: true})
        const userDetails = {
            firstname: values.firstName,
            lastname: values.lastName,
            email: values.email,
            phone: values.mobileNumber,
            password: values.password
        }
        console.log(userDetails)
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            url: `${url}/api/user/signup`,
            data: userDetails
        }
        axios(options)
            .then(res => {
                console.log(res)
                if (res.status === 201) {
                    ToastAndroid.show(`You are registered! Successfully`, ToastAndroid.SHORT);
                    this.props.navigation.navigate('Login')
                }
                else {
                    this.setState({loading: false})
                    ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
                }
            })
            .catch((err) => {
                alert(err);
              })
    }
    
    renderTextInput = (field) => {
        const { meta: { touched, error }, label, secureTextEntry, maxLength, keyboardType, placeholder, returnKeyType, input: { onChange, ...restInput } } = field;
        return (
            <View>
                <InputField onChangeText={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    label={label}
                    returnKeyType={returnKeyType}
                    autoCapitalize="none"
                    autoCorrect={false}
                    {...restInput}
                />
                {(touched && error) && <Text style={styles.error}>{error}</Text>}
            </View>
        )
    }

    renderLoader=()=>{
        if (this.state.loading === true) {
            return(
                <Loader/>
            )
        }
    }
    render() {
        console.log(this.props)
        const { handleSubmit } = this.props;
        return (
            <ScrollView>
                {this.renderLoader()}
                <KeyboardAvoidingView behavior="padding" style={styles.Container} enabled>

                    <Image style={styles.logo} source={require('../../public/img/logo.png')} />

                    <View style={styles.FormContainer}>
                        <View>
                            <Field name="firstName" style={styles.input}
                                component={this.renderTextInput}
                                placeholder="First Name"
                                returnKeyType="next"
                                maxLength={10}
                            />
                        </View>

                        <View>
                            <Field name="lastName" style={styles.input}
                                component={this.renderTextInput}
                                placeholder="Last Name"
                                returnKeyType="next"
                            />
                        </View>

                        <View>
                            <Field name="email" style={styles.input}
                                component={this.renderTextInput}
                                placeholder={"Email Address"}
                                returnKeyType="next"
                                keyboardType="email-address"
                            />
                        </View>

                        <View>
                            <Field name="mobileNumber" style={styles.input}
                                component={this.renderTextInput}
                                placeholder={"03xxxxxxxxx"}
                                returnKeyType="next"
                                keyboardType="number-pad"
                            />
                        </View>

                        <View>
                            <Field name="password" style={styles.input}
                                component={this.renderTextInput}
                                placeholder={"Password"}
                                secureTextEntry={true}
                            />
                        </View>

                        <View>
                            <Field name="cpass" style={styles.input}
                                component={this.renderTextInput}
                                placeholder={"Confirm Password"}
                                secureTextEntry={true}
                            />
                        </View>
                        <View style={styles.registerButtonContainer}>

                            <NewButtons text="JOIN NOW"
                                onPress={handleSubmit(this.onSubmit)} />
                        </View>

                    </View>
                    <Text>{'\n'}Already a member?  <Text onPress={() => this.props.navigation.navigate('Login')} style={styles.pageLink}> Login</Text></Text>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const validate = (values) => {
    const errors = {};
    alpha = /^[a-zA-Z]+$/;
    emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    mobileNumberRE = /^[0][3][\d]{2}[\d]{7}$/;
    strongRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if (!values.firstName) {
        errors.firstName = "First Name is required"
    }
    else if (values.firstName) {
        if (!alpha.test(values.firstName)) {
            errors.firstName = "Name must contain only alphabets"
        }
    }
    if (!values.lastName) {
        errors.lastName = "Last Name is required"
    }
    else if (values.lastName) {
        if (!alpha.test(values.lastName)) {
            errors.lastName = "Name must contain only alphabets"
        }
    }
    if (!values.email) {
        errors.email = "Email is required"
    }
    else if (values.email) {
        if (!emailRE.test(values.email)) {
            errors.email = "Invalid Email Address"
        }
    }
    if (!values.mobileNumber) {
        errors.mobileNumber = "Mobile Number is required"
    }
    else if (values.mobileNumber) {
        if (!mobileNumberRE.test(values.mobileNumber)) {
            errors.mobileNumber = "Mobile Number must be in the format 03xxxxxxxxx"
        }
    }
    if (!values.password) {
        errors.password = "Password is required"
    }
    else if (values.password) {
        if (!strongRegex.test(values.password)) {
            errors.password = "Password must contain atleast 1 lowercase, 1 uppercase, 1 digit and 1 special character & 8 characters long";
        }
    }
    if (!values.cpass) {
        errors.cpass = "Confirm Password is required"
    }
    else if (values.cpass !== values.password) {
        errors.cpass = "The two passwords are not identical"
    }
    return errors;
}

export default reduxForm({
    // a unique name for the form
    form: 'register',
    validate
})(Register)