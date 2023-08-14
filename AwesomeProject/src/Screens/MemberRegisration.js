import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, SafeAreaView} from 'react-native';
// import { useRoute } from '@react-navigation/routers';
import { useNavigation,useRoute, useFocusEffect } from '@react-navigation/core';
import { FlatList } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
// import { SwipeListView } from 'react-native-swipe-list-view';
// import * as FileSystem from 'expo-file-system';
import { ListItem, Button } from '@rneui/themed';

const MemberRegisration = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const project = route.params?.project;//NewProjectCreateから受け取ったパラメータ
    const [user, setUser] = useState("");//参加者を一時的に入力するためのもの
    const [userError, setUserError] = useState("");
    const [items, setItems] = useState([]);//メンバー一覧が表示される
    const [state, setState] = useState(false);
    const [groupID, setGroupID] = useState("");
    const [dummy, setDummy] = useState();
    const memberAdd = () => {
      if (user == ''){
        setUserError("参加者の名前を入力してください");
      }else{
        setState(!state)
        setUserError("")
            setUser("")
            const db = SQLite.openDatabase('group.db');
            db.transaction((tx) => {
                tx.executeSql(
              "INSERT INTO "+project+"Member(name) VALUES(?);",
              [user],
              () => {
                  console.log(user+"の登録に成功しました");
              },
              () => {
                  console.log(user+"の登録に失敗しました");
                  return true;//ロールバック
              });
            
          },
          () => { console.log("失敗")},
          () => { console.log("成功")},
    );
      }
    }
    const addGroupID = () => {
      const db = SQLite.openDatabase('group.db');
      db.transaction((tx) => {
        // tx.executeSql(
        //   "SELECT * FROM eventNameToGroupID;",
        //   [],
        //   (_, resultSet) => {
        //     setDummy(resultSet.rows._array);
        //     console.log(dummy);
        //   },
        //   () => {
        //     console.log('失敗したぜ')
        //     return true;
        //   }
        // );
        // tx.executeSql(
        //   "INSERT INTO eventNameToGroupID(eventName, groupID) VALUES(?, ?);",
        //   [project, groupID],
        //   () => {
        //     console.log(project + "と" + groupID + "の組を登録しました。");
        //   },
        //   () => {
        //     console.log(project + "と" + groupID + "の組を登録できませんでした。");
        //     return true;
        //   }
        // );
        tx.executeSql(
          "UPDATE eventNameToGroupID SET groupID = ? WHERE eventName = ?;",
          [groupID, project],
          (_, resultSet) => {
            console.log("グループIDが正常に更新されました。");
            setDummy(groupID);
          },
          (_, error) => {
            console.log("グループIDが正常に更新されませんでした。");
          }
        )
        
      },
      () => { console.log("失敗しました。")},
      () => { console.log("成功しました。")}
      );
    }

    useFocusEffect(
      React.useCallback(() => {
        //open
        const db = SQLite.openDatabase('group.db');
        //fetch
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM '+project+"Member;",
            null,
            (_, resultSet) => {
              setItems(resultSet.rows._array);
            },
            () => {
              console.log("メンバー表示に失敗しました。")
              return true;
            }
          );
          tx.executeSql(
            "SELECT groupID FROM eventNameToGroupID WHERE eventName=(?);",
            [project],
            (_, resultSet) => {
              const result = resultSet.rows._array
              setGroupID(result[0].groupID)
            },
            () => {
              console.log("groupIDの表示に失敗しました。")
              return true;
            }
          );
        },
        () => { console.log("失敗しました");},
        () => { console.log("成功しました");}
        )
      },[state])
    )


    //useEffectを用いると画面遷移した時に表示できるようになる。
    // useEffect(() => {

    //   },[state]);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <Text>参加者を入力してください</Text>
            <TextInput
            style={{height:40, borderColor: 'gray', borderWidth: 2, width: 400}}
            label="user"
            value={user}
            onChangeText={user => setUser(user)}
            />
            <Button
            title="追加"
            style={{ top: 20, width: 400, height: 100}}
            onPress={memberAdd}/>
            {userError !== '' && <Text>{userError}</Text>}
            <Text>LINEと連携する {dummy}</Text>
            <TextInput
            style={{height:40, borderColor: 'gray', borderWidth: 2, width: 400}}
            label="groupID"
            value={groupID}
            onChangeText={groupID => setGroupID(groupID)}
            />
            <Button
            title="追加"
            style={{ top: 20, width: 400, height: 100}}
            onPress={addGroupID}/>
        </View>
        <View style={styles.flatList}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
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
                            "DELETE FROM "+project+"Member WHERE id ="+item.id+";",
                            null,
                            () => {
                                console.log(item.name+"の削除に成功");
                            },
                            () => {
                                console.log(item.name+"の削除に失敗");
                                return true;
                            }
                        )},
                        () => { console.log("失敗しました");},
                        () => { console.log("成功しました")}
                        ) 
                }}
              />
            )}
            title={item.name}
            >
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem.Swipeable>
          ) }
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
      </View>
        
        <Button
        style={{width:400}}
        title="イベントに登録する"
        onPress={() => {
            navigation.navigate('Project',{project: project});
            const db = SQLite.openDatabase('group.db');
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM "+project+"Member;",
                    [],
                    (_, resultSet) => {
                        setItems(resultSet.rows._array);
                    },
                    () => { 
                        console.log("失敗しました")
                        return true;
                    });
            },
            () => { console.log("プロジェクト登録に失敗しました"); },
            () => { console.log("プロジェクト登録に成功しました"); }
            )
        }}
        />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  }

});

export default MemberRegisration;