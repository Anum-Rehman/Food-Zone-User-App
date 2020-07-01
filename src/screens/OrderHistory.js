
import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';

import MyList from '../components/MyList';
import { fetchOrders } from '../redux/actions/orderActions';
import { Container, Card, CardItem, Content, Title, Header, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles/theme.style';
import HeaderTitle from '../components/common/HeaderTitle';
import axios from 'axios';
import { url } from '../../url';

class OrderHistory extends Component {
    // static navigationOptions = {
    //     header: null,
    // }
    constructor(props) {
        super(props);
        this.state = {
            list: ''
        }
    }

    // componentWillMount = () => {
    //     this.props.fetchProducts();
    // }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('@token')
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'x-auth': token
            },
            url: `${url}/api/user/orders`,
        }
        axios(options)
            .then(res => {
                console.log(res)
                console.log(this.props)
                if (res.status === 200) {
                    ToastAndroid.show(`Orders`, ToastAndroid.SHORT);
                    this.setState({
                        list: res.data
                    })
                    // this.props.fetchOrders(res.data)
                }
                else {
                    ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
                }
            })
            .catch(error => console.error('Error', error))
    }

    render() {
        console.log(this.props)
        // const { products } = this.props
        return (
            <Container >
                <Content>
                    <Card style={{ alignItems: 'center', backgroundColor: theme.BACKGROUND_COLOR }}>
                        <CardItem header style={{ backgroundColor: theme.backgroundColor }}>
                            <Icon name="food" style={{ color: 'white' }} size={30} />
                            <Title style={{ color: 'white' }}> Your Order History </Title>
                            <Icon name="food-fork-drink" style={{ color: 'white' }} size={30} />
                            <Icon />
                        </CardItem>
                    </Card>
                    <View style={styles.body}>
                        <FlatList
                            data={this.state.list}
                            renderItem={({ item }) => <MyList order={item} navigation={this.props.navigation} />}
                            keyExtractor={(item) => item._id}
                            ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#34495e90' }} />} />
                    </View>
                </Content>
            </Container>
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
    orders: state.products.items
})

export default connect(mapStateToProps, { fetchOrders })(OrderHistory);