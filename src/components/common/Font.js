import React,{ Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class Font extends Component{
    render(){
        return(
           <Text style={styles.fontType}>{this.props.text}</Text>
        );
    }
}
const styles = StyleSheet.create({
    fontType: {
        fontFamily: 'PatuaOne',
        color: '#ffffff',
    },
})

