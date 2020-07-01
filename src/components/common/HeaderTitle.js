import React,{ Component } from 'react';
import { StyleSheet } from 'react-native';
import { Title } from 'native-base';

export default class HeaderTitle extends Component{
    render(){
        return(
            <Title style={styles.titleStyle}>
                {this.props.headTitle}
            </Title>
        )
    }
}

const styles = StyleSheet.create({
    titleStyle:{
        color: '#ff9900',
        fontFamily: 'PatuaOne',
        fontSize: 28,
    }
})