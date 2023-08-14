import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { ListItem, Button } from '@rneui/themed';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/core';

const Project = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //パラメータ
  const project = route.params.project;//ここにイベント名が格納されている。
  const [ data, setData ] = useState([]);//ここに参加メンバーのデータが入っている。
  
  const [ reimbursement, setReimbursement ] = useState([]);//history立て替えのidと名前、合計、支払った人、参加者
  const [state, setState ] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(true);
  //名前が与えられると支払った金額の合計を返す関数
  const totalAmmountForPayer = (payerName) => {
    const filterdData = reimbursement.filter(item => item.player === payerName);
    const totalAmmount = filterdData.reduce((total, item) => total + parseInt(item.ammount), 0);
    return totalAmmount;
  };
  useFocusEffect(
    React.useCallback(() => {
      const db = SQLite.openDatabase('group.db');
    db.transaction((tx) => {
      //参加メンバーの表示
      tx.executeSql(
        "SELECT * FROM "+project+"Member;",
        [],
        (_, resultSet) => {
          setData(resultSet.rows._array);
        },
        () => {
          console.log('参加メンバーの表示に失敗');
          return true;
        });
        //historyの取得
        tx.executeSql(
          "SELECT * FROM "+project+"History;",
          null,
          (_, resultSet) => {
            setReimbursement(resultSet.rows._array);
          },
          () => {
            console.log("historyの表示に失敗しました。");
            return true;
          }
        )
    },
    () => { console.log("参加メンバー一覧の表示に失敗しました");},
    () => { console.log("参加メンバー一覧の表示に成功しました");}
  );
    },[state])
  )

  useEffect(() => {
    navigation.setOptions({
      title: project
    })
  })

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="+"
          type="clear"
          size="md"
          onPress={() => {
            // ボタンが押されたときの処理
            navigation.navigate('Reimbursement',{project: project});
            setState(!state)
          }}
        />
      ),
    });
  }, [state]);
  // console.log(reimbursement)
  // console.log(totalAmmountForPayer("高橋"))
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.backButton}>
      <Button
        title="＜"
        onPress={() => {
          navigation.goBack();
        }}/>
      </View> */}
      {/* <View style={styles.newReim}>
      <Button
        title="＋"
        onPress={() => {
          // navigation.navigate('ReimbursementStackScreen', {
          //   screen: 'Reimbursement',
          //   params: {project: project},
          // })
          
        }}
        />
      </View> */}
      {/* <View style={styles.addMem}>
      
      </View> */}
    <View style={styles.container}>
      
      <View style={styles.flatList}>
      <ListItem.Accordion
            content={
              <ListItem.Content>
                <ListItem.Title>メンバー</ListItem.Title>
              </ListItem.Content>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
            }}
            >
      {/* <Button
      title="メンバー追加"
      onPress={() => {
        navigation.navigate("MemberRegisration", {project: project});
        setState("")
      }}
      /> */}
      
      <FlatList
        data={data}
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
            onPress={() => {
              navigation.navigate('EachMember',{id:item.id, 
                                                player: item.name,  //ユーザの名前
                                                project: project,
                                                history: reimbursement, //その時点でのhistoryデータごと持っていく。
                                              });
              setState("")
            }}
            >
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{totalAmmountForPayer(item.name)}円</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
          ) }
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
      
      
      </ListItem.Accordion>
      </View>
      <Text>
      </Text>
      <Text></Text>
      <Text></Text>
      <Button
      title="メンバー追加"
      style={{width:400}}
      onPress={() => {
        navigation.navigate("MemberRegisration", {project: project});
        setState("")
      }}
      />
      
        <View style={styles.flatList}>
          <ListItem.Accordion
            content={
              <ListItem.Content>
                <ListItem.Title>立て替え一覧</ListItem.Title>
              </ListItem.Content>
            }
            isExpanded={expanded2}
            onPress={() => {
              setExpanded2(!expanded2);
            }}
            >
          <FlatList
            data={reimbursement}
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
    </View>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Button
        title="最終精算"
        style={{width: 400}}
        onPress={() => {
          navigation.navigate('Result',{project: project});
        }}
        />
    </SafeAreaView>
  );
};

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
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 1,
    zIndex: 1,
  },
  newReim: {
    position: 'absolute',
    top: 0,
    right: 1,
    zIndex: 1,
  },
  addMem: {
    position: 'absolute',
    top: 700,
    right: 1,
    zIndex: 1,
  }
});

export default Project;