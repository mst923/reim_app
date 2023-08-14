import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import {StyleSheet, View, Text, TextInput, SafeAreaView} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Button } from '@rneui/themed';
import { Portal } from 'react-native-paper';

const NewProjectCreate = () => {
  const navigation = useNavigation();
  const [project, setProject] = useState("");//プロジェクト名が格納される
  const [error, setError] = useState('');
  const handleSubmit = () => {
    if (project == ""){
      setError('イベント名を入力して下さい');
    } else{
      setError("");
      navigation.navigate('MemberRegisration', {project:project});
          const db = SQLite.openDatabase('group.db');
          db.transaction((tx) => {
            //メンバーテーブルの作成
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS " +project+ "Member(id integer primary key not null, name text not null unique);",
              null, 
              () => {
                console.log(project + "Memberテーブルの作成に成功しました");
              },
              () => {
                console.log(project + "Memberテーブルの作成に失敗しました");
                return true;
              });
            //historyテーブルの作成
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS " +project+ "History(id integer primary key not null, reimbursementName text not null unique, ammount integer not null, player text not null, involves text not null, date text);",
              null,
              () => {
                console.log(project + "Historyテーブルの作成に成功しました");
              },
              () => {
                console.log(project + "Historyテーブルの作成に失敗");
              }
            )
            const currentDate = new Date().toISOString(); // 現在の日付を取得
            //イベント名の登録
            tx.executeSql(
              "INSERT INTO eventNames(eventName, date) VALUES(?, ?);",
              [project, currentDate],
              () => {
                console.log(project+"の登録に成功しました");
              },
              () => {
                console.log(project+"の登録に失敗しました。");
                return true;
              });
            tx.executeSql(
              "INSERT INTO eventNameToGroupID(eventName) VALUES(?);",
              [project],
              () => {
                console.log(project + "のグループIDテーブルへの登録に成功しました。");
              },
              () => {
                console.log(project + "のグループIDテーブルへの登録に失敗しました。");
                return true;
              }
            )
          },
          () => { console.log("失敗しました"); },
          () => { console.log("成功しました"); }
          );
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.backButtun}>
      <Button
        title="戻る"
        onPress={() => {
        navigation.goBack();
        }}
      />
      </View> */}
    <View>
    <Text>イベント名を入力して下さい</Text>
      <TextInput
        style={{ height:50, borderColor: 'gray', borderWidth: 2, width: 400}}
        label="project"
        value={project}
        onChangeText={project => setProject(project)}
      />
      <View>
      <Button
        title="イベントを作成"
        style={{ top: 20, height: 100}}
        onPress={handleSubmit}/>
        {error !== '' && <Text>{error}</Text>}
        </View>
       
    </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,

  },
  backButtun: {
    position: 'absolute',
    top: 0,
    left: 1,
  },

});

export default NewProjectCreate;