import React, { Component } from "react";
import {
  View,
  StyleSheet, Image, TouchableOpacity
} from "react-native";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Segment, Input, Item } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchProducts } from '../redux/actions/productAction';
import { url } from '../../url';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: fetchProducts()
    }
  }
  addToCart = () => {
    this.props.addItemsToCart(this.props.item)
  }

  render() {
    console.log(this.props)
    const { product } = this.props;
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require('../../public/img/logo.png')} />
            <Body>
              <Text>{product.name}</Text>
              <Text note>{product.vendorId}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: `${url}/images/${product.image}` }} style={{ height: 200, width: null, flex: 1 }} />
        </CardItem>
        <CardItem>
          <View key={product._id}>
            <Button style={styles.linkButton} onPress={this.addToCart}>
              <Icon style={styles.dishIcon} name="shopping-cart" />
              <Text style={styles.dishLinks}>Order Now</Text>
            </Button>
          </View>
          <Body>
            <Button style={styles.linkButton} onPress={() => this.props.navigation.navigate('Detail', { dishId: product._id })}>
              <Icon style={styles.dishIcon} name="remove-red-eye" />
              <Text style={styles.dishLinks} >View Item</Text>
            </Button>
          </Body>
          <Right>
            <Text>Rs. {product.price}</Text>
          </Right>
        </CardItem>
      </Card>

    );
  }
}
const styles = StyleSheet.create({
  dishIcon: {
    left: 10,
    color: '#ffffff',
    fontSize: 15,
  },
  dishLinks: {
    color: '#ffffff',
    fontSize: 10,
  },
  itemHeader: {
    backgroundColor: '#ffffff',
  },
  linkButton: {
    backgroundColor: '#ff9900',
    width: 100,
    height: 30,
    borderRadius: 20,
    margin: 5,
  },


})
export default Product;