import React, { Component } from 'react';
import {
    Container, Content, ListItem, Text, Button, Icon, Title,
    CheckBox, Header, Left, Right, Body
} from 'native-base';
import { withNavigation } from '@expo/ex-navigation';

@withNavigation
export default class HeaderModule extends Component {
    leftButton() {
        if (this.props.openDrawer !== undefined)
            return <Button transparent onPress={this.props.openDrawer}>
                <Icon name='menu' />
            </Button>
        else
            return <Button transparent onPress={() => this.props.navigator.pop()}>
                <Icon name='arrow-back' />
            </Button>
    }
    render() {
        return (
            <Header>
                <Left>
                    {this.leftButton()}
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
                {/*<Right>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Right>*/}
            </Header>
        );
    }
}