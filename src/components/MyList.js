import React, { Component } from 'react';
import { Card, Text, CardItem, Title, Left, Right, Thumbnail, Body, View, Subtitle, Button } from 'native-base';
import theme from '../styles/theme.style';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MyList extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: null,
    }
    render() {
        const { order } = this.props
        const date = new Date(order.created).toLocaleDateString();
        const time = new Date(order.created).toLocaleTimeString();
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DishDetail')}>
                <Card >
                    <CardItem>
                        <Left>
                            {/* <Thumbnail source={product.img} style={{width:80, height: 60, borderRadius: 10, marginRight: 5}}/> */}
                            <View style={{ alignItems: 'flex-start' }}>
                                <Title style={styles.heading}>{order._id}</Title>
                                <Subtitle style={styles.subtitleText}>{order.order_status}</Subtitle>
                            </View>
                        </Left>
                        <Body>
                            <Button style={styles.linkButton} onPress={() => this.props.navigation.navigate('OrderDetail', { orderId: order._id })}>
                                <Icon style={styles.dishIcon} name="remove-red-eye" />
                                <Text style={styles.dishLinks} >View Item</Text>
                            </Button>
                        </Body>
                        <Right>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text>Rs. {order.total}</Text>
                                <Subtitle style={styles.subtitleText}>{date}</Subtitle>
                                <Subtitle style={styles.subtitleText}>{time}</Subtitle>
                            </View>
                        </Right>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    subtitleText: {
        color: 'gray'
    },
    heading: {
        color: theme.BACKGROUND_COLOR
    },
    linkButton: {
        backgroundColor: '#ff9900',
        width: 100,
        height: 30,
        borderRadius: 20,
        margin: 5,
    },
    dishIcon: {
        left: 10,
        color: '#ffffff',
        fontSize: 15,
    },
    dishLinks: {
        color: '#ffffff',
        fontSize: 10,
    },
})