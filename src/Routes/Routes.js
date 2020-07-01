import React, { Component } from 'react';
import { View, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Button, Title, Text, List, ListItem } from 'native-base';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Checkout from '../screens/Checkout';
import Forgot from '../screens/Forgot';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Settings from '../screens/Settings';
import Welcome from '../screens/Welcome';
import OrderHistory from '../screens/OrderHistory';
import OrderDetail from '../screens/OrderDetail';
import products from '../screens/products';
import Receipt from '../screens/Receipt';
import Dishdetail from '../screens/Details';
import Cart from '../components/Cart.component';
import Chef from '../components/Chef';

export class CustomHeader extends Component {
  logOut = () => {
    this.setState({ loading: true });
    AsyncStorage.removeItem('userToken')
        .then(res => {
            this.props.navigation.navigate('Welcome');
        })
        .catch(err => {
            console.log(err)
        });
}
constructor(props){
  super(props);
}
  render() {
    const { navigation } = this.props;
    let { title, isHome } = this.props
    return (
      <Header style={{backgroundColor: 'white'}}>
        <Left>
          {
            isHome ?
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" size={30} style={styles.icons} />
              </Button> :
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name='back' size={30} style={styles.icon}/>
              </Button>
          }

        </Left>
        <Body>
          <Title style={styles.titleStyle}>{title}</Title>
        </Body>
        <Right>
          {
            isHome ?
              <Cart navigation={this.props.navigation}/>
            :
            <View></View>
          }
          
        </Right>
      </Header>
    )
  }
}

class SideMenu extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../../public/img/logo.png')}
            style={{ height: 120, width: 120, borderRadius: 60 }} />
        </View>
        <ScrollView>
          <List>
            <ListItem onPress={() => this.props.navigation.navigate('OrderHistory')}>
              <Text>Order History</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate('Profile')}>
              <Text>Profile</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate('Chef')}>
              <Text>Home</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate('Settings')}>
              <Text>Settings</Text>
            </ListItem>
            <ListItem onPress={() => this.props.navigation.navigate('Checkout')}>
              <Text>My Cart</Text>
            </ListItem>
          </List>

          <List>
            <ListItem noBorder onPress={this.logOut}>
              <Text>Logout</Text>
            </ListItem>
          </List>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const MainStack = createStackNavigator({
  Detail: {
    screen: Dishdetail,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={true} title="Dish Detail" navigation={navigation}/>
    })
  },
  Chef: {
    screen: Chef,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={true} title="Home" navigation={navigation}/>
    })
  },
  Home: {
    screen: products,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={true} title="Products" navigation={navigation}/>
    })
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={true} title="CheckOut" navigation={navigation}/>
    })
  },
  OrderHistory: {
    screen: OrderHistory, 
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={true} title="Order History" navigation={navigation}/>
    })
  },
  OrderDetail: {
    screen: OrderDetail,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={true} title="Order Details" navigation={navigation}/>
    })
  },
  Receipt: {
    screen: Receipt,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={true} title="Receipt" navigation={navigation}/>
    })
  },
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={true} title="Settings" navigation={navigation}/>
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={true} title="Profile" navigation={navigation}/>
    })
  }
}, { initialRouteName: 'Chef' })

const appDrawer = createDrawerNavigator({
  drawer: MainStack
},
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width * 3 / 4
  }
)

const authStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={false} title="Login" navigation={navigation}/>
    })
  },
  Register: {
    screen: Register,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={false} title="Register" navigation={navigation}/>
    })
  },
  Forgot: {
    screen: Forgot,
    navigationOptions: ({navigation}) =>( {
      header: <CustomHeader isHome={false} title="Forgot Password" navigation={navigation}/>
    })
  },
},
  {
    initialRouteName: 'Welcome'
  }
)

const MainApp = createSwitchNavigator({
  app: appDrawer,
  auth: authStack
},
  {
    initialRouteName: 'auth'
  }
)
export default createAppContainer(MainApp);

const styles = StyleSheet.create({
  titleStyle:{
      color: '#ff9900',
      fontFamily: 'PatuaOne',
      fontSize: 28,
  },
  icon:{
    color: 'black'
  }
})