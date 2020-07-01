import React,{ Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';

export default class Links extends Component{
    constructor(props){
        super(props);
      }
      
      handlePress = () => {
        this.props.onPress(); 
      }
    render(){
        return(
            <Text onPress={() => this.handlePress} style={styles.pageLink}>{this.props.links}</Text>
        );
    }
}
const styles = StyleSheet.create({
    pageLink:{
        color: '#ff9900',
        fontFamily: 'PatuaOne',
    },
})
