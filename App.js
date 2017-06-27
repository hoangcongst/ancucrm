import React from 'react';
import * as Exponent from 'expo';
import {
  Asset,
} from 'expo'
import { Container, Content, List, ListItem, Text } from 'native-base';
import Main from './present/main'
import Contacts from './present/contacts'
import Login from './present/login'
import ChanceInfo from './present/chanceInfo/chanceInfo'
import SpecificInfo from './present/chanceInfo/specificInfo'
import CreateChance from './present/createChance'
import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';

const Router = createRouter(() => ({
  main: () => Main,
  contacts: () => Contacts,
  chanceInfo: () => ChanceInfo,
  createChance: () => CreateChance,
  login: () => Login,
  specificInfo: () => SpecificInfo,
}));


export default class App extends React.Component {
  state = {
    appIsReady: false,
  }

  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    const images = [
      'http://www.danongonline.com.vn/product_images/r/750/girl-xinh__92160_std.jpg',
    ];

    // await cacheImages(images);

    await Exponent.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ appIsReady: true });
  }

  render() {
    if (!this.state.appIsReady) {
      // return <Exponent.C />;
      return (<Container><Text>Loading...</Text></Container>);
    }

    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={'login'} />
      </NavigationProvider>
    );
  }
}
