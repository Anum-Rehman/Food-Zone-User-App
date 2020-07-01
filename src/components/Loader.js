import React,{Component} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import Spinner from 'react-native-spinkit';

export default class Loader extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Spinner color={"#e37400"} size={100} type={'ThreeBounce'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "rgba(0,0,0,0.6)",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 99,
        justifyContent:'center',
        alignItems: 'center'
    }
})