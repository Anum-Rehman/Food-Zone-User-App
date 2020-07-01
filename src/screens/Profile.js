import React, { Component } from 'react';
import { View, StyleSheet, ToastAndroid, ScrollView, Text, AsyncStorage } from 'react-native';
import { Card } from 'react-native-elements';
import { Title, Subtitle, CardItem, Left, Right } from 'native-base';
import theme from '../styles/theme.style';
import axios from 'axios';
import { url } from '../../url';

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: []
        }
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem('@token');
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'x-auth': token
            },
            url: `${url}/api/user/me`,
        }
        axios(options)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    ToastAndroid.show(`User's Profile`, ToastAndroid.SHORT);
                    this.setState({
                        user: res.data
                    })
                }
                else {
                    ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
                }
            })
            .catch(error => alert(error))
    }

    renderDetail = () => {
        if (this.state.user !== "") {
            const { firstname, lastname, _id, email, phone } = this.state.user
            
            return (
                <React.Fragment>
                    <Card>
                        <Title style={{ margin: 10, color: 'gray', fontFamily: 'PatuaOne' }}>
                            {`${firstname} ${lastname}`}
                        </Title>
                    </Card>
                    <Card >
                        <Title style={{ color: theme.BACKGROUND_COLOR }}>Profile Details</Title>
                        <CardItem>
                            <Left>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Subtitle style={{ color: 'gray' }}>User ID</Subtitle>
                                </View>
                            </Left>
                            <Right>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text>{_id}</Text>
                                </View>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Subtitle style={{ color: 'gray' }}>First Name</Subtitle>
                                </View>
                            </Left>
                            <Right>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text>{firstname}</Text>
                                </View>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Subtitle style={{ color: 'gray' }}>Last Name</Subtitle>
                                </View>
                            </Left>
                            <Right>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text>{lastname}</Text>
                                </View>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Subtitle style={{ color: 'gray' }}>Email Address</Subtitle>
                                </View>
                            </Left>
                            <Right>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text>{email}</Text>
                                </View>
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Subtitle style={{ color: 'gray' }}>Contact Number</Subtitle>
                                </View>
                            </Left>
                            <Right>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <Text>{phone}</Text>
                                </View>
                            </Right>
                        </CardItem>
                    </Card>
                </React.Fragment>
            )
        } else {
            return null
        }
    }

    render() {
        return (
            <ScrollView>
                {this.renderDetail()}
            </ScrollView>
        );
    }
}

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