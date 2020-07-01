import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';

export class Cart extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        opacity: new Animated.Value(1)
      };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.cartItems !== this.props.cartItems) {
            this.startAnimation();
        }
    }
    startAnimation(){
        Animated.timing(this.state.opacity,
        {
            toValue: 0,
            duration: 500
        }).start(()=> {
            setTimeout(()=> {
                this.endAnimation()
            }, 100);
        })
    }
    endAnimation(){
        Animated.timing(this.state.opacity,
        {
            toValue: 1,
            duration: 500
        }).start()
    }
    onPress = () => {
        this.props.navigation.navigate('Checkout');
    }
    render() {
        const { cartItems } = this.props;
        let animatedStyle = {opacity: this.state.opacity}
        return (
            <Animated.View style={[{ padding: 5 }, Platform.OS == 'android' ? styles.iconContainer : null,styles.container,animatedStyle]}>
        <View style={{
            position: 'absolute', height: 30, width: 30, borderRadius: 15, backgroundColor: 'rgba(249,104,0,0.8)', right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000,

        }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }} onPress={this.onPress}>{(cartItems).length}</Text>
        </View>
        <Icon onPress={this.onPress} name="ios-cart" size={40} onPress={this.onPress} style={{color: 'black'}}/>
    </Animated.View>
            // <Animated.View style={[styles.container, animatedStyle]}>
            //     <TouchableOpacity onPress={this.onPress}>
            //         <Text style={styles.cart}>Your cart: {(cartItems).length} items</Text>
            //     </TouchableOpacity>
            // </Animated.View>
        );
    }
}
const mapStateToProps = (state) => ({
    cartItems: state.cart.cart
});
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cart:{
        color: 'orange',
        fontSize: 14
    }
})
export default connect(
    mapStateToProps
)(Cart);