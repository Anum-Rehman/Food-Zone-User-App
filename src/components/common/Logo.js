import React,{ Component } from 'react';
import { StyleSheet,Image, } from 'react-native';

export default class Login extends Component{
    render(){
        return(
            <Image style={styles.logo} source={require('../../../public/img/logo.png')}/> 
            );
        }
    }
    const styles = StyleSheet.create({
        logo: {
            width: 400,
            height: 400,
        },
    })