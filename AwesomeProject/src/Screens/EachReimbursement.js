import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView, TextInput} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite';
import { ListItem, CheckBox, Button } from '@rneui/themed'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';

const EachReimbursement = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const {id, project, reimbursementName, ammount, name, involves, data} = route.params; //本来のデータ
    // console.log(ammount)
    // const [data, setData] = useState([]);//メンバーのデータ
    const [needToReceive, setNeedToReceive] = useState([]);
    //const [reimbursementName, setReimbursementName] = useState("");
    const [names, setNames] = useState([]);
    const [history, setHistory] = useState([]);
    const checkedIds = data.reduce((acc, item) => {
        if (involves.includes(item.name)){
            acc.push(item.id)
        }
        return acc;
    }, [])
    const [ checkedItems, setCheckedItems ] = useState(checkedIds);//ここに、チェックされた人のインデックスが保持される
    const [ checkedNames, setCheckedNames ] = useState(involves.split(','));//チェックされた人の名前を保持
    const [expanded, setExpanded] = useState(true);
    //新しい立て替え者の名前
    const [ newname, setNewName ] = useState(name);
    //新しい立て替えた人のID
    const [ newid, setNewId] = useState(id);
    //新しい立替名
    const [newReimbursementName, setNewReimbursementName] = useState(reimbursementName);
    //新しい金額
    const [newAmmount, setNewAmmount] = useState(ammount);
    // console.log(data);
    useFocusEffect(
        React.useCallback(() => {
            const db = SQLite.openDatabase("group.db");
            db.transaction((tx) => {
                // r
                // tx.executeSql(
                //     "SELECT"
                // )
                tx.executeSql(
                    "SELECT * FROM "+project+"History WHERE id=(?);",
                    [id],
                    (_, resultSet) => {
                        setHistory(resultSet.rows._array);
                    },
                    () => {
                        console.log("Historyの読み込みに失敗しました。");
                        return true;
                    }
                )
            },
            () => { console.log("失敗しました");},
            () => { console.log("成功しました");})
        },[])
    )

    useEffect(() => {
        navigation.setOptions({
            title: reimbursementName + "(" + project + ")"
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
        value={newReimbursementName}
        onChangeText={newReimbursementName => setNewReimbursementName(newReimbursementName)}
        placeholder="立て替え名 (例)昼ごはん"
      />
      <Text></Text>
      <TextInput
        style={{ height:40, borderColor: 'gray', borderWidth: 2, width: 400}}
        label="ammount"
        value={newAmmount.toString()}//textInputのvalueにはstring型しか無理みたい。
        onChangeText={newAmmount => setNewAmmount(newAmmount)}
        keyboardType="numeric"
        placeholder="金額 (例)5000"
      />
        <ScrollView>
            {/* <Text>{project}</Text> */}
            {/*}
            <Text>{JSON.stringify(members)}</Text>
            <Text>{JSON.stringify(needToPay)}</Text>
    */}
            {/* <Text>立替名:{reimbursementName}</Text> */}
            {/* <Text>合計金額:{ammount}</Text> */}
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
              setNewName(item.name)
              setNewId(item.id - 1)
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
      <Text>立て替えた人: {newname}</Text>
      {/* <Text>{involves}</Text> */}
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
            <Button
        title="変更"
        onPress={() => {
          const db = SQLite.openDatabase("group.db");
          db.transaction((tx) => {
              tx.executeSql(
                  "UPDATE " + project + "History SET reimbursementName = ?, ammount = ?, player = ?, involves = ? WHERE id = ?;",
                  [newReimbursementName, newAmmount, newname, checkedNames.toString(), id],
                  (_, resultSet) => {
                      console.log("データが更新されました。");
                  },
                  (_, error) => {
                      console.log("データの更新に失敗しました。", error)
                  }
              );
          });
          navigation.goBack();
        }}/>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    flatList: {
        flex: 0.3,
        width: 350,
        borderWidth: 0,
      },
  });
  
  export default EachReimbursement;