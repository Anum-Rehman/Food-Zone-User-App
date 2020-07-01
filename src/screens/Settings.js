import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Image, Text, Dimensions, TextInput,ScrollView } from 'react-native';
import { Form, Header, Container, Left, Right, Body } from 'native-base';
import NewButtons from '../components/common/NewButtons';
import InputField from '../components/common/InputField';
import HeaderTitle from '../components/common/HeaderTitle';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import Loader from '../components/Loader';

const { width: WIDTH } = Dimensions.get('window')
const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        marginTop: 80,
    },
    ButtonContainer: {
        alignItems: 'center'
    },

    headerStyle: {
        backgroundColor: '#ffffff',
    },
    pageLink: {
        color: '#ff9900',
        fontFamily: 'PatuaOne',
        fontSize: 20,
    },
    error:{
        color: 'red',
        marginHorizontal:35,
        marginTop: -10,
        fontSize: 12,
    }
})

class Settings extends Component {
    static navigat
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            cpass: '',
            oldPass: '',
            loading: false
        }
    }
    
    onSubmit = async (values)=>{
        const userDetails = {
            oldpassword: values.oldPass,
            newpassword: values.password,
            cpass: values.cpass
        };
        if (userDetails.password !== "" && userDetails.cpass !== "") {
            if (userDetails.password === userDetails.cpass) {
                this.setState({ loading: true });
                const userToken = await AsyncStorage.getItem('userToken');
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        'x-auth': userToken
                    },
                    data: userDetails,
                    url: `${URL}/api/user/changePassword`
                }
                axios(options)
                    .then((res) => {
                        console.log(res)
                        this.setState({ password: '', cpass: '' });
                        if (res.status == 200) {
                            if (res.data.statusCode === 500) {
                                ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
                            } else {
                                ToastAndroid.show('Password successfully changed!', ToastAndroid.SHORT);
                            }
                        }
                        this.setState({ loading: false });
                    })
                    .catch((er) => {
                        console.log(er);
                        ToastAndroid.show(`${er}`, ToastAndroid.SHORT);
                        this.setState({ loading: false })
                    })

            } else {
                ToastAndroid.show('Passwords are not matched!', ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show('First Insert', ToastAndroid.SHORT)
        }
    }
    
    renderTextInput = (field) =>{
        const {meta: {touched,error},label, secureTextEntry, maxLength, keyboardType, placeholder,returnKeyType, input:{onChange,...restInput}}=field;
        return(
            <View>
                <InputField onChangeText={onChange}
                            maxLength = {maxLength}
                            placeholder = {placeholder}
                            keyboardType = {keyboardType}
                            secureTextEntry = {secureTextEntry}
                            label = {label}
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
        if(this.state.loading=== true){
            return(
                <Loader/>
            )
        }
    }
    render() {
        const {handleSubmit} = this.props;
        return (
            <ScrollView>
            {this.renderLoader()}
                <Header style={styles.headerStyle}>
                    <Left />
                    <Body>
                        <HeaderTitle headTitle="Settings" />
                    </Body>
                    <Right />
                </Header>
                <KeyboardAvoidingView behavior="padding" style={styles.Container} enabled>

                    <View style={styles.FormContainer}>
                            <View>
                                <Field name="oldPass" style={styles.input}
                                    component={this.renderTextInput}
                                    placeholder={"Old Password"}
                                    secureTextEntry={true}
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
                            <View style={styles.ButtonContainer}>
                                
                                <NewButtons text="Change Password"
                                    onPress={handleSubmit(this.onSubmit)} />
                            </View>
                        
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const validate = (values) =>{
    const errors = {};
    const strongRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    if(!values.oldPass){
        errors.oldPass = "Old Password is required"
    }
    if(!values.password){
        errors.password = "New Password is required"
    }
    else if(values.password){
        if(!strongRegex.test(values.password)){
            errors.password = "Password must contain atleast 1 lowercase, 1 uppercase, 1 digit and 1 special character & 8 characters long";
        }
    }
    if(!values.cpass){
        errors.cpass = "Confirm Password is required"
    }
    else if(values.cpass !== values.password){
        errors.cpass = "The two passwords are not identical"
    }
    return errors;
}

 export default reduxForm({
    // a unique name for the form
    form: 'setting',
    validate
  })(Settings)