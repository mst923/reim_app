import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const Notification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>通知</Text>
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

export default Notification;