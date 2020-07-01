import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ToastAndroid,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { addOrder } from '../redux/actions/orderActions';
import { emptyCart } from '../redux/actions/cartActions';
import { Field, reduxForm } from 'redux-form';
import Button from './Button';
import stripe from 'tipsi-stripe';
import axios from 'axios';
import { url } from '../../url';

stripe.setOptions({
  publishableKey: 'pk_test_ei7zHz2dHrRmbTISlIh9P4Dp00C66j2QHI'
})

class CustomerForm extends Component {
  static title = 'Card Form'

  state = {
    loading: false,
    token: null,
    // name: '',
    // phone: '',
    // email: '',
    // address: '',
  }


  handlePay = async () => {
    const { name, phone, email, address } = this.state;
    const { cartItems, navigation, addOrder, emptyCart } = this.props;
    alpha = /^[a-zA-Z]+$/;
    emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    mobileNumberRE = /^[0][3][\d]{2}[\d]{7}$/;
    if (name === '') { 
      ToastAndroid.show("Please enter your full name", ToastAndroid.SHORT);
    }
    else if(name){
      if(!alpha.test(name)){
        ToastAndroid.show("Invalid Name", ToastAndroid.SHORT);
      }
    }
    if (phone === '') { 
      ToastAndroid.show("Please enter your Contact Number", ToastAndroid.SHORT);
    }
    else if(phone){
      if(!mobileNumberRE.test(phone)){
        ToastAndroid.show("Invalid Contact Number", ToastAndroid.SHORT);
      }
    }
    if (email === '') { 
      ToastAndroid.show("Please enter your Email Address", ToastAndroid.SHORT);
    }
    else if(email){
      if(!emailRE.test(email)){
        ToastAndroid.show("Invalid Email Address", ToastAndroid.SHORT);
      }
    }
    if (street === '') { 
      ToastAndroid.show("Please enter delivery Address", ToastAndroid.SHORT);
    }
    else{
    let customer = { name: name, phone: phone, email: email, street: street}
    addOrder({ cartItems: cartItems, customer: customer });
    const token = await AsyncStorage.getItem('@token')
    const orderDetails = {
      customer: customer,
      cartItems: cartItems
    }
    console.log(orderDetails)
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'x-auth': token
      },
      url: `${url}/api/order`,
      data: orderDetails
    }
    axios(options)
      .then(res => {
        console.log(res)
        if (res.status === 201) {
          this.setState({
            name: '',
            phone: '',
            email: '',
            address: ''
          });
          ToastAndroid.show(`Order is placed & it is now pending for Chef to accept`, ToastAndroid.SHORT);
          emptyCart();
          setTimeout(() => {
            navigation.navigate('Receipt', { orderId: res.data._id });
          }, 1000)
        } else {
          ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        console.log(err)
        ToastAndroid.show(`${err.message}`, ToastAndroid.SHORT);
      })
  }
}

  renderTextfield(options) {
    return (
      <TextInput style={styles.textField} onChangeText={(value) => this.setState({ [options.name]: value })}
        placeholder={options.label} value={this.state[options.name]} keyboardType={options.keyboard || 'default'} />
    );
  }
  renderButton() {
    const { loading, token } = this.state;
    return (
      <View style={styles.container}>
        <Button
          text="Proceed to Checkout"
          loading={loading}
          onPress={this.handlePay}
        />
        <View
          style={styles.token}
        >
          {token &&
            <>
              {/* <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text> */}

            </>
          }
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.panel}>
        {this.renderTextfield({name: 'name', label: 'Your name'})}
        {this.renderTextfield({ name: 'phone', label: 'Your phone number', keyboard: 'phone-pad' })}
        {this.renderTextfield({ name: 'email', label: 'Your email address', keyboard: 'email-address' })}
        {this.renderTextfield({ name: 'address', label: 'Your Address' })}
        {this.renderButton()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
    borderRadius: 3,
    padding: 10,
    margin: 10
  },
  textField: {
    height: 40,
    margin: 8
  },
  btn: {
    backgroundColor: '#34495e',
    borderRadius: 3,
    padding: 12,
    flex: 1,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});
const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
})
export default connect(mapStateToProps, { addOrder, emptyCart })(CustomerForm);