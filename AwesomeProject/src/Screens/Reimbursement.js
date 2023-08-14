import React, { useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView, SafeAreaView} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { ListItem, CheckBox, Button } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/core';

const Reimbursement = () => {
    const route = useRoute();
    const navigation = useNavigation();
    //立て替えの名前
    const [reimbursementName, setReimbursementName] = useState("");
    //立て替え合計
    const [total, setTotal] = useState(0);
    //プロジェクト名をパラメータとして受け取る
    const project = route.params.project;
    //立て替え者の名前
    const [ name, setName ] = useState("");
    //立て替えた人のID
    const [ id, setId] = useState(0);

    //data
    const [ data, setData ] = useState([]);//ここにはメンバーのid, nameが格納されている。
    const [ checkedItems, setCheckedItems ] = useState([]);//ここに、チェックされた人のインデックスが保持される
    const [ checkedNames, setCheckedNames ] = useState([]);//チェックされた人の名前を保持
    const [expanded, setExpanded] = useState(true);

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button
            title="完了"
            onPress={() => {
              navigation.navigate('Project',{ project: project});
              const db = SQLite.openDatabase('group.db');
              db.transaction((tx) => {
                const currentDate = new Date().toISOString(); // 現在の日付を取得
                tx.executeSql(
                  "INSERT INTO "+project+"History(reimbursementName, ammount, player, involves, date) VALUES(?, ?, ?, ?, ?);",
                  [reimbursementName, total, name, checkedNames.toString(), currentDate],
                  () => {
                    console.log(reimbursementName+"の登録に成功しました");
                  },
                  () => {
                    console.log(reimbursementName+"の登録に失敗しました");
                    return true;
                  }
                );
              },
              () => { console.log("失敗しました");},
              () => { console.log("成功しました")}
              );
              }}
          />
        ),
      });
    }, [reimbursementName, total, name, checkedNames]);

    //useEffectを用いると画面遷移した時に表示できるようになる。
    useEffect(() => {
      //open
      const db = SQLite.openDatabase('group.db');
      //fetch
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM '+project+"Member;",
          [],
          (_, resultSet) => {
            setData(resultSet.rows._array);
          },
          () => {
            console.log("メンバー表示に失敗しました。");
            return true;
          }
        );
      },
      () => { console.log("失敗しました");},
      () => { console.log("成功しました");}
      );
    },[]);

    useEffect(() => {
      navigation.setOptions({
        title: project + "の立て替え"
      })
    })
  

    const handleChecked = (item) => {
      const checkedIndex = checkedItems.indexOf(item.id);
      if (checkedIndex === -1){
        setCheckedItems([...checkedItems, item.id]);
      }else{
        setCheckedItems([...checkedItems.slice(0, checkedIndex), ...checkedItems.slice(checkedIndex + 1)]);
      }
    };

    const checkedName = (item) => {
      const checkedInd = checkedNames.indexOf(item.name);//ここをidにすると無限に積み重ねられた。
      if(checkedInd == -1){
        setCheckedNames([...checkedNames, item.name]);
      }else{
        setCheckedNames([...checkedNames.slice(0, checkedInd), ...checkedNames.slice(checkedInd + 1)]);
      }
    };
  return (
    <SafeAreaView style={styles.container}>
      <Text></Text>
      <TextInput
        style={{ height:40, borderColor: 'gray', borderWidth: 2, width: 400}}
        label="reimbursementName"
        value={reimbursementName}
        onChangeText={reimbursementName => setReimbursementName(reimbursementName)}
        placeholder="立て替え名 (例)昼ごはん"
      />
      <Text></Text>
      <TextInput
        style={{ height:40, borderColor: 'gray', borderWidth: 2, width: 400}}
        label="total"
        value={total}
        onChangeText={total => setTotal(total)}
        keyboardType="numeric"
        placeholder="金額 (例)5000"
      />
    <ScrollView>
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
      <FlatList
        data={data}
        renderItem={({ item }) => (
            <ListItem.Swipeable
            title={item.name}
            onPress={() => {
              setName(item.name)
              setId(item.id - 1)
            }}
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
      </ListItem.Accordion>
      </View>
      <Text>立て替えた人: {name}</Text>
      <Text>立て替えの対象者</Text>
      {data.map((item) => (
        <View key={item.id}>
          <CheckBox
            style={{justifyContent: 'flex-start'}}
            title={item.name}
            checked={checkedItems.includes(item.id)} //,checkedNames.includes(item.id) 
            onPress={() => {handleChecked(item)
                            ,checkedName(item)} }//無限ループの原因はここ{} で括らないと多分再マウントされる感じ？←よう調査
          />
        </View>
      ))}
    </View>
    </ScrollView>
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
    flex: 0.3,
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
  createReim: {
    position: 'absolute',
    top : 0,
    right : 1,
    zIndex: 1,
  }

});

export default Reimbursement;