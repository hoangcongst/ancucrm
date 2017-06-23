import React from 'react';
import { Container, Content, List, ListItem, Text, Drawer, H2, Right, Icon, Body, Toast } from 'native-base';
import { View, AsyncStorage } from 'react-native'
import HeaderModule from '../module/header'
import SideBar from '../module/sidebar'
import * as API from '../../config/API'
import History from './history'
import Activity from './activity'
export default class SpecificInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionId: '',

    }
  }

  printData() {
    /*
    * 1: History
    * 2: Activity
    * 3: Comments
    */
    let arrPrint = []
    if (this.props.type === 1)
      this.props.data.map(
        (obj, i) => {
          arrPrint.push(<History key={i} obj={obj} />)
        }
      )
    else if (this.props.type === 2)
      this.props.data.map(
        (obj, i) => {
          arrPrint.push(<Activity key={i} obj={obj} />)
        }
      )
    else
      return <Text>dhs</Text>

    return arrPrint
  }

  async componentWillMount() {

  }

  render() {
    return (
      <Container>
        <HeaderModule title={this.props.title} />
        <Content>
          <List>
            {this.printData()}
          </List>
        </Content>
      </Container>
    );
  }
}