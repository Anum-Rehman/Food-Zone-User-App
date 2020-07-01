
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
import Chef from '../components/Chef';
import { fetchChefs } from '../redux/actions/chefAction';
import Loader from '../components/Loader';


class Chefs extends Component {
  constructor(props) {
    super(props);
    this.state={
      loading: false
    }
  }

  async UNSAFE_componentWillMount() {
    const token = await AsyncStorage.getItem('@token')
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'x-auth': token
      },
      url: `${url}/api/vendors`,
    }
    axios(options)
      .then(res => {
        this.setState({loading: true});
        console.log(res)
        console.log(this.props)
        if (res.status === 200) {
          ToastAndroid.show(`Chefs`, ToastAndroid.SHORT);
          this.setState({
            loading: false,
            list: res.data
          })
          this.props.fetchChefs(res.data)
        }
        else {
          ToastAndroid.show(`${res.data.message}`, ToastAndroid.SHORT);
        }
      })
      .catch((err) => {
        alert(err);
      })
  }
  
  renderLoader=()=>{
    if (this.state.loading === true) {
        return(
            <Loader/>
        )
    }
}
  render() {
    const { chefs, navigation } = this.props
    console.log(this.props)
    return (
      <View style={styles.container}>
        {this.renderLoader()}
        <View style={styles.body}>
          <FlatList
            data={chefs}
            renderItem={({ item }) => <Chef item={item} chef={item} navigation={this.props.navigation} />}
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
  chefs: state.chefs.items
})

export default connect(mapStateToProps, fetchChefs )(Chefs);