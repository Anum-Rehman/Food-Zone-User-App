
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  AsyncStorage,
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import { url } from '../../url';

import Product from '../components/Products';
import { addToCart } from '../redux/actions/cartActions';
import { fetchProducts } from '../redux/actions/productAction';

import Cart from '../components/Cart.component'


class Products extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Products',
      headerRight: <Cart navigation={navigation} />
    }
  }
  constructor(props) {
    super(props);
  }

  async UNSAFE_componentWillMount() {
    const token = await AsyncStorage.getItem('@token')
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-auth': token
      },
      url: `${url}/api/allitems`,
    }
    axios(options)
      .then(res => {
        console.log(res)
        console.log(this.props)
        if (res.status === 200) {
          ToastAndroid.show(`Dishes`, ToastAndroid.SHORT);
          this.setState({
            list: res.data
          })
          this.props.fetchProducts(res.data)
        }
        else {
          ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
        }
      })
      .catch(error => console.error('Error', error))
  }
  // UNcomponentWillMount = () => {
  //   this.props.fetchProducts();
  // }

  addItemsToCart = (product) => {
    this.props.addToCart(product);
  }

  render() {
    const { products, navigation } = this.props
    console.log(this.props)
    return (
      <View style={styles.container}>

        <View style={styles.body}>
          <FlatList
            data={products}
            renderItem={({ item }) => <Product item={item} addItemsToCart={this.addItemsToCart} product={item} navigation={this.props.navigation} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#34495e90' }} />} />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    justifyContent: 'center'
  }
});
const mapStateToProps = (state) => ({
  products: state.products.items
})

export default connect(mapStateToProps, { addToCart, fetchProducts })(Products);