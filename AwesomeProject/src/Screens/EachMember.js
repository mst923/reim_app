import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { ListItem, Button } from '@rneui/themed';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/core';

const EachMember = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id, player, project, history} = route.params;
  const [expanded, setExpanded] = useState(true);
  const filterDataArray = () => {
    return history.filter(item => item.player === player)
  }

  useEffect(() => {
    navigation.setOptions({
        title: player + "(" + project + ")"
    })
});

  console.log(history)
  return (
    <View style={styles.flatList}>
    <ListItem.Accordion
      content={
        <ListItem.Content>
          <ListItem.Title>立て替え一覧</ListItem.Title>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
      >
    <FlatList
      data={filterDataArray}
      renderItem={({item}) => (
        <ListItem.Swipeable
        rightWidth={90}
        minSlideWidth={40}
        rightContent={() => (
          <Button
            title={""}
            containerStyle={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#f4f4f4',
            }}
            type="clear"
            icon={{ name: 'delete-outline' }}
            onPress={() => {
                setState(!state)
                const db = SQLite.openDatabase('group.db')
                db.transaction((tx) => {
                    tx.executeSql(
                        "DELETE FROM "+project+"History WHERE id ="+item.id+";",
                        null,
                        () => {
                            console.log(item.reimbursementName+"の削除に成功");
                        },
                        () => {
                            console.log(item.reimbursementName+"の削除に失敗");
                            return true;
                        }
                    )},
                    () => { console.log("失敗しました");},
                    () => { console.log("成功しました")}
                    ) 
            }}
          />
        )}
        title={item.reimbursementName}
        onPress={() => {
          navigation.navigate('EachReimbursement',{id:item.id, 
                                                   project: project,
                                                   reimbursementName: item.reimbursementName,
                                                   ammount: item.ammount,
                                                   name: item.player,
                                                   involves: item.involves,
                                                   data: data
                                                  });
        }}
        >
          <ListItem.Content>
            <ListItem.Title>{item.reimbursementName}</ListItem.Title>
            <ListItem.Subtitle>{item.player + "が" + item.ammount + '円の支払い'}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem.Swipeable>
      )}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      />
      </ListItem.Accordion>
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

export default EachMember;