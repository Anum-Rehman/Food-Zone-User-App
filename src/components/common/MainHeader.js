import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Title, Header, Left, Button, Body } from 'native-base';
import Cart from '../Cart.component';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MainHeader extends Component {
  static navigationOptions = {
    header: null,
  }
  handlePress = () =>{
    this.props.onPress();
  }
  render() {
    return (
      <Header style={styles.itemHeader}>
        <Left>
          <Button transparent>
            <Icon name='menu' size={20} style={{ color: '#ff9900' }} onPress={this.handlePress}/>
          </Button>
        </Left>
        <Body>
          <Title style={styles.titleStyle}>{this.props.headTitle}</Title>
        </Body>
       <Cart/>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  itemHeader: {
    backgroundColor: '#ffffff',
  },
  titleStyle: {
    color: '#ff9900',
    fontFamily: 'PatuaOne',
    fontSize: 28,
  }
})