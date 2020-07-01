// import React, { Component } from 'react';
// import { Image,StyleSheet,TouchableOpacity } from 'react-native';
// import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button,Left, Body, Right } from 'native-base';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// //import {connect} from 'react-redux'
// //import Food from './Food'

// export default class FoodItem extends Component {
//   constructor(props) {
//     super(props);
// }

//   static navigationOptions = {
//     header: null,
//   }

//     render() {
//         return (
//             <Card>
//             <CardItem>
//               <Left>
//                 <Thumbnail source={require('../../public/img/logo.png')} />
//                 <Body>
//                   <Text>{this.props.itemName}</Text>
//                   <Text note>{this.props.chefName}</Text>
//                 </Body>
//               </Left>
//             </CardItem>
//             <CardItem cardBody>
//               <Image source={this.props.imageSource} style={{ height: 200, width: null, flex: 1 }} />
//             </CardItem>
//             <CardItem>
//               <Button style={styles.linkButton} onPress={() => this.props.navigation.navigate('DetailsScreen')}>
//                   <Icon style={styles.dishIcon} name="shopping-cart" />
//                   <Text style={styles.dishLinks}>Order Now</Text>
//               </Button>
//               <Body>
//                 <Button style={styles.linkButton} onPress={() => this.props.navigation.navigate('DetailsScreen')}>
//                   <Icon style={styles.dishIcon} name="remove-red-eye" />
//                   <Text style={styles.dishLinks}>View Item</Text>
//                 </Button>
//               </Body>
//               <Right>
//                 <Text>{this.props.time}</Text>
//               </Right>
//             </CardItem>
//           </Card>
//         )
//     }
// }


//   const styles = StyleSheet.create({
//     dishIcon: {
//       left: 10,
//       color: '#ffffff',
//       fontSize: 15,
//     },
//     dishLinks: {
//       color: '#ffffff',
//       fontSize: 10,
//     },
//     itemHeader: {
//       backgroundColor: '#ffffff',
//     },
//     linkButton: {
//       backgroundColor: '#ff9900',
//       width: 100,
//       height: 30,
//       borderRadius: 20,
//       margin:5,
//     },
    
  
//   })