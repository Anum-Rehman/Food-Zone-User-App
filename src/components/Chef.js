import React, { Component } from "react";
import {
  StyleSheet
} from "react-native";
import { Card, CardItem, Container, Text, Button, Right, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchChefs } from '../redux/actions/chefAction';

class Chef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chefs: fetchChefs()
    }
  }

  render() {
    console.log(this.props)
    const { chef } = this.props;
    return (
        <Container>
        <Content>
          <Card>
            <CardItem>
              <Icon active name="chef-hat" size={20}/>
              <Text>Anum</Text>
              <Right>
              <Button style={styles.linkButton} onPress={() => this.props.navigation.navigate('Home', 
              { chefId: chef._id }
              )}>
              <Icon style={styles.dishIcon} name="eye" />
              <Text style={styles.dishLinks} >View Dishes</Text>
            </Button>
              </Right>
             </CardItem>
           </Card>
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
    linkButton: {
      backgroundColor: '#ff9900',
      width: 100,
      height: 30,
      borderRadius: 20,
      margin: 5,
    },
  
  
  })
export default Chef;