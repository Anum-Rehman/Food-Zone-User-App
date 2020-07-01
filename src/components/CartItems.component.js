import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import { removeItem } from '../redux/actions/cartActions';
import { url } from '../../url';
class CartItems extends Component {
    state = {
        activeRowKey: null
    }
    render() {
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => { this.setState({ activeRowKey: null }) },
            onOpen: (secId, rowId, direction) => { this.setState({ activeRowKey: this.props.item.id }) },
            right: [
                {
                    onPress: () => {
                        const deleteRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                { text: 'Yes', onPress: () => { this.props.removeItem({ index: this.props.index, item: this.props.item }) } },
                            ],
                            { cancelable: true }
                        )
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        }
        const { item, index } = this.props;
        return (
            <Swipeout {...swipeSettings}>
                <List>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={{ uri: `${url}/images/${item.image}` }} />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text style={styles.text}>Rs. {(item.price).toFixed(2)}</Text>
                            </Button>
                        </Right>
                    </ListItem>

                </List>
            </Swipeout>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productDes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        fontSize: 14,
        padding: 10,
        fontWeight: 'bold'
    }
});
export default connect(null, { removeItem })(CartItems);