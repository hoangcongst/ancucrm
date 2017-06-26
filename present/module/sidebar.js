import React, { Component } from 'react';
import { H3, Thumbnail, ListItem, Left, Body, Right } from 'native-base'
import { View, Text, StyleSheet, Image } from 'react-native';
export default class Sidebar extends Component {
    render() {
        return (
            <View style={styles.parentView}>
                <View style={styles.userInfo}>
                    <Thumbnail large source={require('../../images/avatar.png')} />
                    <H3 styly={{ marginTop: 10 }}>{this.props.name}</H3>
                    <Text>{this.props.email}</Text>
                </View>
                <View style={styles.container}>
                    <ListItem>
                        <Left>
                            <Thumbnail small source={require('../../images/icon-menu-flag.png')} />
                        </Left>
                        <Body>
                            <Text>Cơ hội</Text>
                        </Body>
                        <Right></Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Thumbnail small source={require('../../images/icon-menu-user.png')} />
                        </Left>
                        <Body>
                            <Text>Khách hàng</Text>
                        </Body>
                        <Right></Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Thumbnail small source={require('../../images/icon-menu-logout.png')} />
                        </Left>
                        <Body>
                            <Text>Đăng xuất</Text>
                        </Body>
                        <Right></Right>
                    </ListItem>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parentView: {
        flex: 1
    },
    userInfo: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#f4a742',
        alignItems: 'center'
    },
    container: {
        flex: 5,
        backgroundColor: '#fff',
    },
});
