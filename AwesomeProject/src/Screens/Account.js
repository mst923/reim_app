import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const Account = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Account;