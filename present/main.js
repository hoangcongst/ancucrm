import React from 'react';
import { Container, Content, List, ListItem, Text, Drawer } from 'native-base';
import HeaderModule from './module/header'
import SideBar from './module/sidebar'

export default class Main extends React.Component {
  handlePress = () => {
    this.props.navigator.push('ChanceInfo');
  }

  printChances() {
    var print = []
    for (i = 0; i < 300; i++) {
      print.push(
        <ListItem key={i}>
          <Text onPress={this.handlePress}>Simon Mignolet{"\n"}Simon Mignolet</Text>
        </ListItem>
      )
    }

    return (
      print
    )
  }

  //sidebar
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    return (
      <Container>
        <HeaderModule title={'Cơ hội'}
          openDrawer={this.openDrawer.bind(this)} closeDrawer={this.closeDrawer.bind(this)} />
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigator={this.navigator} />}
          onClose={() => this.closeDrawer()} >
          <Content>
            <List>
              {this.printChances()}
            </List>
          </Content>
        </Drawer>
      </Container>
    );
  }
}