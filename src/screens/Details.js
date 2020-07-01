import React, { Component } from 'react';
import { Text, View, StyleSheet, ToastAndroid, ScrollView, AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import { getProducts } from '../cart/Data';
import { Title, Subtitle, CardItem, Left, Right } from 'native-base';
import theme from '../styles/theme.style';

import axios from 'axios';
import { url } from '../../url';

function RenderDish(props) {

    const dish = props.dish;
    console.log(props.dish)
    if (dish != null) {
        return (
            <ScrollView>
                <Card
                    image={{ uri: `${url}/images/${dish.image}` }}>
                    <Title style={{ margin: 10, color: 'gray', fontFamily: 'PatuaOne' }}>
                        {dish.name}
                    </Title>
                </Card>
                <Card >
                    <Title style={{ color: theme.BACKGROUND_COLOR }}>Dish Detail</Title>
                    <CardItem>
                        <Left>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Subtitle style={{ color: 'gray' }}>Dish Ratngs</Subtitle>
                            </View>
                        </Left>
                        <Right>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Icon style={styles.ratingIcon} name="star" />
                                <Text style={styles.ratings}>4.5</Text>
                            </View>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Subtitle style={{ color: 'gray' }}>Chef</Subtitle>
                            </View>
                        </Left>
                        <Right>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text>{dish.vendorId}</Text>
                            </View>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Subtitle style={{ color: 'gray' }}>Chef Ratings</Subtitle>
                            </View>
                        </Left>
                        <Right>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Icon style={styles.ratingIcon} name="star" />
                                <Text style={styles.ratings}>4.5</Text>
                            </View>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Subtitle style={{ color: 'gray' }}>Price</Subtitle>
                            </View>
                        </Left>
                        <Right>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text>Rs. {dish.price}</Text>
                            </View>
                        </Right>
                    </CardItem>
                    <CardItem>
                        <View style={{ alignItems: 'flex-start', top: -10 }}>
                            <Subtitle style={{ color: 'black', alignItems: 'flex-start' }}>Dish Description</Subtitle>
                            <Text style={{ top: 10 }}>
                                {dish.description}
                            </Text>
                        </View>
                    </CardItem>
                </Card>
            </ScrollView>
        );
    }
    else {
        return (<View></View>);
    }
}

class Dishdetail extends Component {
    // static navigationOptions = {
    //     header: null,
    // }
    constructor(props) {
        super(props);
        this.state = {
            dish: ''
        };
    }

    async UNSAFE_componentWillMount() {
        const token = await AsyncStorage.getItem('@token');
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'x-auth': token
            },
            url: `${url}/api/item/${this.props.navigation.state.params.dishId}`,
        }
        axios(options)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    ToastAndroid.show(`Dish details`, ToastAndroid.SHORT);
                    this.setState({
                        dish: res.data
                    })
                }
                else {
                    ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
                }
            })
            .catch(error => console.error('Error', error))
    }

    render() {
        console.log(this.state)
        // const dishId = this.props.navigation.getParam('dishId');
        const dishId = this.props.navigation.state.params.dishId;
        return (
            <RenderDish dish={this.state.dish} />
        )
    }
}
export default Dishdetail;

const styles = StyleSheet.create({
    ratingIcon: {
        position: "absolute",
        color: theme.BACKGROUND_COLOR,
        left: 45,
        top: 5
    },
    ratings: {
        fontSize: 16,
        paddingLeft: 45,
        color: theme.BACKGROUND_COLOR,
        marginHorizontal: 15,
        marginRight: -1
    },
})