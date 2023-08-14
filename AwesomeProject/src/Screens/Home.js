import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem , Button } from '@rneui/themed';
import { useFocusEffect } from '@react-navigation/core';

const Home = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [state, setState] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const db = SQLite.openDatabase('group.db');
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS eventNames(id integer primary key not null, eventName text not null unique, date text);",
          null,
          () => {
            console.log("eventNamesテーブルは問題なく存在します。");
          },
          () => {
            console.log("eventNamesテーブルの作成に失敗しました。");
          }
        );
        tx.executeSql(
          "SELECT * FROM eventNames;",
          null,
          (_, resultSet) => {
            setItems(resultSet.rows._array);
          },
          () => {
            console.log('イベント一覧の表示に失敗しました。')
            return true;//ロールバック
          });
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS eventNameToGroupID(id integer primary key not null, eventName text not null unique, groupID text);",
          null,
          () => {
            console.log("eventNameToGroupIDテーブルは問題なく存在します。");
          },
          () => {
            console.log("eventNameToGroupIDテーブルの作成に失敗しました。");
            return true;
          }
        );
      },
      () => { console.log("失敗しました。");},
      () => { console.log("成功しました。")}
    )
    }, [state])
  );
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="＋"
          type="clear"
          size="md"
          onPress={() => {
            // ボタンが押されたときの処理
            navigation.navigate('NewProjectCreate');
            setState(!state)
          }}
        />
      ),
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.newEv}>
      <Button
        title = "＋"
        onPress={() => {
            setState("")
            navigation.navigate('NewProjectCreate');
        }}
        />
      </View> */}
    <View style={styles.container}>
      <View style={styles.flatList}>
      <FlatList
      data={items}
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
              setState(!state);
              const db = SQLite.openDatabase('group.db')
              db.transaction((tx) => {
                tx.executeSql(
                  "DELETE FROM eventNames WHERE id="+item.id+";",
                  null,
                  () => {
                    console.log(item.eventName+"の削除に成功");
                    setState(item.id)
                  },
                  () => {
                    console.log(item.eventName+"の削除に失敗");
                    return true;
                  }
                );
                tx.executeSql(
                  "DROP TABLE " + item.eventName + "Member;",
                  null,
                  () => {
                    console.log(item.eventName + "Memberテーブルの削除に成功しました");
                  },
                  () => {
                    console.log(item.eventName + "Memberテーブルの削除に失敗しました");
                    return true;
                  }
                );
                tx.executeSql(
                  "DROP TABLE " + item.eventName + "History;",
                  null,
                  () => {
                    console.log(item.eventName + "Historyテーブルの削除に成功しました");
                  },
                  () => {
                    console.log(item.eventName + "Historyテーブルの削除に失敗しました。");
                    return true;
                  }
                );
          },
              () => { console.log("失敗")},
              () => { console.log("成功")})
            }}
          />
        )}
        title={item.eventName}
        onPress={() => {
          // navigation.navigate('ProjectStackScreen',{
          //   screen: 'Project',
          //   params: {project:item.eventName},
          // })
          navigation.navigate('Project',{project:item.eventName});
        }}
        >
          <ListItem.Content>
            <ListItem.Title>{item.eventName}</ListItem.Title>
            <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem.Swipeable>
      )}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      keyExtractor={item => item.id}
      />
      </View>  
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  flatList: {
    flex: 1,
    width: 350,
    borderWidth: 0,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
  },
  newEv: {
    position: 'absolute',
    top: 0,
    right: 1,
    zIndex: 1,
  }
});

export default Home;