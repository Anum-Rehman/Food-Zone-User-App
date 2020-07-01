import React, {Component} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import {Left,Right,Body,Header} from 'native-base';
import HeaderTitle from '../components/common/HeaderTitle';
import Button from '../components/Button';
import { connect } from 'react-redux';
import stripe from 'tipsi-stripe';

stripe.setOptions({
    publishableKey: 'pk_test_ei7zHz2dHrRmbTISlIh9P4Dp00C66j2QHI'
  })
class Wallet extends Component{
    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props);
    }
    state = {
        loading: false,
        token: null,
      }
      handleCardPayPress = async () => {
        
        try {
          this.setState({ loading: true, token: null })
          const token = await stripe.paymentRequestWithCardForm({
            smsAutofillDisabled: true,
            requiredBillingAddressFields: 'full',
            prefilledInformation: {
              billingAddress: {
                name: 'Gunilla Haugeh',
                line1: 'Canary Place',
                line2: '3',
                city: 'Macon',
                state: 'Georgia',
                country: 'US',
                postalCode: '31217',
                email: 'ghaugeh0@printfriendly.com',
              },
            },
          })
          this.setState({ loading: false, token })
        } catch (error) {
          this.setState({ loading: false })
        }
      };
    renderButton() {
        const { loading, token } = this.state
            return (
                <View style={styles.container}>
            <Button
              text="Add Card"
              loading={loading}
              onPress={this.handleCardPayPress}
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

    render(){
        const { cartTotal } = this.props;
        return(
            <View>
                <Header style={{backgroundColor:'white'}}>
                    <Left />
                    <Body>
                        <HeaderTitle headTitle="Wallet" />
                    </Body>
                    <Right />
                </Header>
                <View style={styles.body}>
        <Text style={styles.amount}>Rs. {(cartTotal).toFixed(2)}</Text>
        <Text style={styles.subtitleText}>Available Balance</Text>
                </View>

<View style={{top: 200}}>{this.renderButton()}</View>
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
    cartTotal: state.cart.total
});

export default connect(
    mapStateToProps
)(Wallet);
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      top: 100
    },
    subtitleText:{
        color: 'gray'
    },
    amount:{
        fontSize: 35
    }
});