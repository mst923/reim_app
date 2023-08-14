import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView, Linking, Switch, TextInput} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { ListItem , Button } from '@rneui/themed';
import { useRoute } from '@react-navigation/core';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import * as Notifications from 'expo-notifications';
import axios from 'axios';
// import RNBackgroundTimer from 'react-native-background-timer';
// let timer = null;
// import { AppRegistry } from 'react-native';


const Result = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const project = route.params.project;
    const [history, setHistory] = useState([]);
    const [groupID, setGroupID] = useState([]);
    let final = "";
    const [timerId, setTimerId] = useState(null);
    // AppRegistry.registerHeadlessTask('MyBackgroundTask', () => require('./MyBackgroundTask'));



    // const startTimer = () => {
    //     if (timerId === null) {
    //       const newTimerId = BackgroundTimer.setInterval(() => {
    //         // ここに定期実行したい処理を記述
    //         console.log('定期実行中');
    //       }, 60 * 1000); // 24時間
    //       setTimerId(newTimerId);
    //     }
    //   };

    // const stopTimer = () => {
    // if (timerId !== null) {
    //     BackgroundTimer.clearInterval(timerId);
    //     setTimerId(null);
    // }
    // };
    // useEffect(() => {
    //     return () => {
    //       // コンポーネントがアンマウントされる際にタイマーをクリアする
    //       stopTimer();
    //     };
    //   }, []);
    
    // const scheduleNotificationAsync = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //       content: {
    //         body: '催促し忘れていませんか？',
    //         title: project
    //       },
    //       trigger: {
    //         //repeats: isEnabled,
    //         // // hour: 15,
    //         // // minute: 0
    //         // seconds: 60
    //         seconds: 3
    //       }
    //     })
    //   }
    // const [isEnabled, setIsEnabled] = useState(false);

    // const toggleSwitch = () => {
    // setIsEnabled((previousState) => !previousState);
    // // if(!isEnabled){scheduleNotificationAsync()}
    // };

    //多分データベースにアクセスするのが遅くて、先にこのしたの命令が実行されてしまい、undefinedのエラーに長らく悩まされた。
    // useEffect(() => {
    //     const db = SQLite.openDatabase('group.db');
        // db.transaction((tx) => {
        //     tx.executeSql(
        //         "SELECT * FROM "+project+"History;",
        //         [],
        //         (_, resultSet) => {
        //             setHistory(resultSet.rows._array);
        //         },
        //         () => {
        //             console.log('Historyの取得に失敗しました。');
        //             return true;
        //         }
        //     );
        // },
        // () => {console.log("色々失敗しました。");},
        // () => {console.log("色々成功しました");})
    // },[]);

    // const sendMessageToGas = async (message) => {
    //     try {
    //       const response = await fetch('https://script.google.com/macros/s/AKfycbyifzH32GCJvGFyJpGw_sIMyBoUB9P-Bil-DpWtRQeVRjOev8MmvzCy8ddl5oNQyMZdKg/exec', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: `message=${encodeURIComponent(message)}`,
    //       });
    //       if (response.ok) {
    //         console.log('Message sent successfully!');
    //       } else {
    //         console.error('Failed to send message.');
    //       }
    //     } catch (error) {
    //       console.error('Error sending message:', error);
    //     }
    //   };

    // コンポーネントのライフサイクルメソッドなどで以下を実行
    // const intervalId = BackgroundTimer.setInterval(() => {
    //     // ここに定期的に実行したい関数のコードを記述
    //     console.log("Function executed at regular intervals.");
    //     sendTextAndGroupIdToGas();
    // }, 1000);
    // const interval = setInterval(() => {
    //     // ここに定期的に実行したい関数のコードを記述
    //     // console.log("Function executed at regular intervals.");
    //     sendTextAndGroupIdToGas();
    //   }, 10000); // 1000ミリ秒（1秒）ごとに実行
    //   // もし必要なら、適当なタイミングで clearInterval(interval); を呼んでインターバルを停止できます。      

    const sendTextAndGroupIdToGas = async () => {
        try {
          const response = await axios.post('https://script.google.com/macros/s/AKfycbyrdn0MIVGz1qbecIJl5FcwfXGehfVUH2QeVbhwAKloJpX2-z02JQI1iNP58sr4pN7-lw/exec', {
            message: final,
            groupId: groupID[0].groupID,
          })
          console.log(response.data);
        } catch (error) {
          console.error('Error sending message to GAS:', error);
        }
      };
    useFocusEffect(
        React.useCallback(() => {
            const db = SQLite.openDatabase('group.db');
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM "+project+"History;",
                    [],
                    (_, resultSet) => {
                        setHistory(resultSet.rows._array);
                    },
                    () => {
                        console.log('Historyの取得に失敗しました。');
                        return true;
                    }
                );
                tx.executeSql(
                    "SELECT groupID FROM eventNameToGroupID WHERE eventName=(?);",
                    [project],
                    (_, resultSet) => {
                        setGroupID(resultSet.rows._array);
                        console.log(groupID[0]?.groupID)
                    },
                    () => {
                        console.log("groupIDの取得に失敗しました。");
                        return true;
                    }
                )
            },
            () => {console.log("色々失敗しました。");},
            () => {console.log("色々成功しました");});
        },[])
    )

    useEffect(() => {
        navigation.setOptions({
            title: project + " 最終精算"
        })
    })
        //if(history.length > 0){
            const init = { balance: 0, consumption: 0 };
            Map.prototype.fetch = function (id) {
            return (
                this.get(id) || this.set(id, Object.assign({ name: id }, init)).get(id)
            );
            };
            const data = new Map();

            for (const { id, reimbursementName ,ammount, player, involves } of history) {
                const involvesArray = involves.split(",");
                const record = data.fetch(player);//その立て替えの人物を取得
                record.balance += ammount;//その立て替えの単純な支出を取得
                const debt = Math.ceil(ammount / involvesArray.length);//一人当たりの料金
                // actual payer should not owe extra debt coming from rounded up numbers
                const payerDebt = ammount - debt * (involvesArray.length - 1);//これも単純に一人当たりの料金では？？
                for (const debtor of involvesArray.map((i) => data.fetch(i))) {
                const cost = Math.round(ammount / involvesArray.length);
                debtor.balance -= cost;
                debtor.consumption += cost;
                
                }
            }
            console.log(data);

            console.log("\n# History");
            for (const { id, reimbursementName ,ammount, player, involves } of history) {
                const involvesArray = involves.split(",");
                if (involvesArray.length === 1) {
                    console.log(`${player} lent ¥${ammount} to ${involvesArray[0]}`);
                } else {
                    console.log(`${player} paid ¥${ammount} for ${involvesArray.join(", ")}`);
                }
            }
            const transaction = [];
            let paidTooMuch, paidLess;
            var counter = 0;
            while (counter < 10) {
                for (const [_, tbl] of data) {
                if (tbl.balance >= (paidTooMuch?.balance || 0)) {
                    paidTooMuch = tbl;//過払い
                    console.log(paidTooMuch)
                    console.log("toomach")
                }
                if (tbl.balance <= (paidLess?.balance || 0)) {
                    paidLess = tbl;//過小払い
                    console.log(paidLess)
                    console.log("less")
                }
                }
                if (paidLess?.balance == 0 || paidTooMuch?.balance == 0) break;//精算なし
                counter++;
            
                const amount = Math.min(paidTooMuch?.balance, Math.abs(paidLess?.balance));
                console.log(amount);
            
                transaction.push({
                sender: paidLess?.name,
                receiver: paidTooMuch?.name,
                amount,
                });
                //多分
                if(paidTooMuch && paidLess){//paidToomuchが
                paidTooMuch.balance -= amount;
                paidLess.balance += amount;
                }
            }
            console.log("\n# Transaction table");
            for (const ev of transaction) {
                console.log(`「${ev.sender}」 が 「${ev.receiver}」 に ¥${ev.amount}　支払ってください。`);
                final = final + `「${ev.sender}」 が 「${ev.receiver}」 に ¥${ev.amount}　支払ってください。\n`;
            }
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.container}>
            {/* <Text>{project}</Text> */}
            <Text>{final}</Text>
            </View>
            {/* <TextInput
        style={{height:40, borderColor: 'gray', borderWidth: 2, width: 400}}
        label="group_id"
        value={groupID}
        onChangeText={groupID => setGroupID(groupID)}
        >
        </TextInput> */}
        </ScrollView>
        <Button
            onPress={sendTextAndGroupIdToGas}
            title= "グループにメッセージを定期的に送信する"
            />
            {/* <Text>{groupID[0]?.groupID}</Text> */}
        <View style={styles.container}>
        {/* <Button
            onPress={() => {
            const text = final
            const url = `https://line.me/R/share?text=${text}`
            Linking.canOpenURL(url)
                .then(supported => {
                    if (supported) {
                        return Linking.openURL(url)
                }
        })
                .catch(err => console.error('URLを開けませんでした。', err))
            }}
        title="LINEでシェアする"
        /> */}
        </View>

        {/* <View style={styles.container}>
            <Button
                title="3秒後にプッシュ通知"
                onPress={scheduleNotificationAsync}
                />
        </View> */}
        {/* <View> */}
        {/* <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      /> */}
        {/* </View> */}
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
      flex: 1.3,
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
    
    


export default Result;