import React,{ Component } from 'react';
import { StyleSheet, View,Dimensions } from 'react-native';
import { Button, Text } from 'native-base';

const {width:WIDTH} = Dimensions.get('window')
export default class NewButtons extends Component{
    constructor(props){
        super(props);
      }
      
      handlePress = () => {
        this.props.onPress(); 
      }
    render(){
        return(
            <View style={styles.ButtonContainer}>
                <Button light style={styles.mainButtons} onPress={this.handlePress}>
                    <Text style={styles.textProps}>{this.props.text}</Text>
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    textProps:{
        fontFamily: 'PatuaOne',
        color: '#ffffff',
    },
    mainButtons: {
        backgroundColor: "#ff9900",
        width: 250,
        margin: 5,
        color: '#ffffff',
        justifyContent: 'center',
        width: WIDTH -75,
        borderRadius: 10,
    },
    ButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})
