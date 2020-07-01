import React, { Component } from 'react';
import { StyleSheet, Image, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, Title, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Segment, Input, Item } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { food } from '../cart/Data';
import Product from '../components/Products';
import Cart from '../components/Cart.component';
import axios from 'axios';
import { url } from '../../url';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  // static navigationOptions = ({navigation}) => {
  //     return {
  //       headerTitle: 'Products',
  //     //   headerLeft: <Logo navigation={navigation}/>,
  //       headerRight: <Cart navigation={navigation}/>
  //     }
  //   }
  //   menuPress = () => {
  //     this.props.navigation.openDrawer();
  //   }

  render() {
    return (
      <Container>
        <Header style={styles.itemHeader}>
          <Body>
            <Title style={styles.titleStyle}>Home</Title>
          </Body>
          <Cart />
        </Header>
        {/*<Segment style={styles.tabStyle}>
          <Button first>
            <Text style={styles.tabLinks}>First</Text>
          </Button>
          <Button>
            <Text style={styles.tabLinks}>Second</Text>
          </Button>
          <Button last active>
            <Text style={styles.tabLinks}>Third</Text>
          </Button>
    </Segment>*/}
        <Header searchBar rounded style={{ backgroundColor: 'transparent' }}>
          <Item>
            <Icon name="search" size={20} />
            <Input placeholder="Search" />
            <Icon name="restaurant-menu" size={20} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content padder>
          <Product product={food} />
        </Content>
      </Container>

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
  },
  tabStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  tabLinks: {
    color: '#ff9900',
  },
  itemHeader: {
    backgroundColor: '#ffffff',
  },
  titleStyle: {
    color: '#ff9900',
    fontFamily: 'PatuaOne',
    fontSize: 28,
  }
})