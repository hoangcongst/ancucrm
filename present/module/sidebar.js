import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default class Sidebar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Sidebar</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
