import React, {useState} from 'react';
// import {View, StyleSheet, StatusBar, Platform, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//tab area


//pages
import Home from '../Screens/Home';
import Indivisual from '../Screens/Indivisual';
import NewProjectCreate from '../Screens/NewProjectCreate';
import Account from '../Screens/Account';
import Notification from '../Screens/Notification';
import Project from '../Screens/Project';
import Reimbursement from '../Screens/Reimbursement';
import MemberRegisration from '../Screens/MemberRegisration';
import EachReimbursement from '../Screens/EachReimbursement';
import Result from '../Screens/Result';
import EachMember from '../Screens/EachMember';
// import { Button } from 'react-native';

//stack画面
const HomeStack = createNativeStackNavigator();

//Home画面のstack
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" 
                        component={Home} 
                        options={{
                          title: 'ホーム'
                        }}
                        headerMode="screen" 
                        screenOptions={{ headerShown: false }}/>
      {/* <HomeStack.Screen name="NewProjectCreateStackScreen" component={NewProjectCreateStackScreen} headerMode="screen" screenOptions={{ headerShown: false }}/> */}
      {/* <HomeStack.Screen name="ProjectStackScreen" component={ProjectStackScreen}　screenOptions={{ headerShown: true }}/> */}
      <HomeStack.Screen name="NewProjectCreate" 
                        component={NewProjectCreate}
                        options={{
                          title: '新規イベント作成'
                        }}/>
      <HomeStack.Screen name="MemberRegisration" 
                        component={MemberRegisration}
                        options={{
                          title: '参加者登録'
                        }}
                        />
      <HomeStack.Screen name="Project" component={Project}/>
      <HomeStack.Screen name="Reimbursement" component={Reimbursement}/>
      <HomeStack.Screen name="EachReimbursement" component={EachReimbursement}/>
      <HomeStack.Screen name="EachMember" component={EachMember}/>
      <HomeStack.Screen name="Result" 
                        component={Result}
                        options={{
                          title: '最終結果'
                        }}
                        />
      {/*<HomeStack.Screen name="Reimbursement" component={Reimbursement}/>*/}
    </HomeStack.Navigator>
  );
};

//NewProjectCreate画面のstack
// const NewProjectCreateStack = createNativeStackNavigator();

// const NewProjectCreateStackScreen = () => {
//   return (
//     <NewProjectCreateStack.Navigator　screenOptions={{ headerShown: false }}>
//       <NewProjectCreateStack.Screen name="NewProjectCreate" component={NewProjectCreate} screenOptions={{ headerMode: "float" }}/>
//       <NewProjectCreateStack.Screen name="MemberRegisrationStackScreen" component={MemberRegisrationStackScreen} headerMode="screen" screenOptions={{ headerShown: false }}/>
//       {/*<NewProjectCreateStack.Screen name="ProjectStack" component={ProjectStackScreen}/>*/}
//     </NewProjectCreateStack.Navigator>
//   );
// };

// const MemberRegisrationStack = createNativeStackNavigator();

// const MemberRegisrationStackScreen = () => {
//   return (
//     <MemberRegisrationStack.Navigator screenOptions={{ headerShown: false }}>
//       <MemberRegisrationStack.Screen name="MemberRegisration" component={MemberRegisration} headerMode="screen"/>
//       <MemberRegisrationStack.Screen name="ProjectStackScreen" component={ProjectStackScreen} headerMode="screen"/>
//     </MemberRegisrationStack.Navigator>
//   )
// }

// //Project画面のstack
// const ProjectStack = createNativeStackNavigator();

// const ProjectStackScreen = () => {
//   return (
//   <ProjectStack.Navigator screenOptions={{ headerShown: false }}>
//     <ProjectStack.Screen name="Project" component={Project} screenOptions={{ headerShown: true }}/>
//     <ProjectStack.Screen name="ReimbursementStackScreen" component={ReimbursementStackScreen} headerMode="screen"/>
//     <ProjectStack.Screen name="EachReimbursementStackScreen" component={EachReimbursementStackScreen} headerMode="screen"/>
//     <ProjectStack.Screen name="ResultStackScreen" component={ResultStackScreen} headerMode="screen"/>
//     <ProjectStack.Screen name="EachMemberStackScreen" component={EachMemberStackScreen} headerMode="screen" screenOptions={{ headerShown: false }}/>
//     <ProjectStack.Screen name="MemberRegisrationStackScreen" component={MemberRegisrationStackScreen}/>
//   </ProjectStack.Navigator>
//   );
// }

// const ResultStack = createNativeStackNavigator();

// const ResultStackScreen = () => {
//   return (
//     <ResultStack.Navigator screenOptions={{ headerShown: false }}>
//       <ResultStack.Screen name = "Result" component={Result}/>
//     </ResultStack.Navigator>
//   )
// }
// //各立て替えのStack
// //これも作成する必要がないように感じかが、パラメータの受け渡しが不可能で合った。
// const EachReimbursementStack = createNativeStackNavigator();

// const EachReimbursementStackScreen = () => {
//   return (
//     <EachReimbursementStack.Navigator screenOptions={{ headerShown: false }}>
//       <EachReimbursementStack.Screen name="EachReimbursement" component={EachReimbursement}/>
//     </EachReimbursementStack.Navigator>
//   )
// }

// //Reimbursementのstack
// //作成する必要がないように感じたが、そうしないとパラメータの受け渡しができなかった。
// const ReimbursementStack = createNativeStackNavigator();

// const ReimbursementStackScreen = () => {
//   return (
//     <ReimbursementStack.Navigator screenOptions={{ headerShown: false }}>
//       <ReimbursementStack.Screen name="Reimbursement" component={Reimbursement} screenOptions={{ headerMode: "screen"}}/>
//       <ReimbursementStack.Screen name="ProjectStackScreen" component={ProjectStackScreen} headerMode="screen"/>
//     </ReimbursementStack.Navigator>
//   )
// }

// const EachMemberStack = createNativeStackNavigator();

// const EachMemberStackScreen = () => {
//   return (
//     <EachMemberStack.Navigator screenOptions={{ headerShown: false }}>
//       <EachMemberStack.Screen name="EachMember" component={EachMember}/>
//     </EachMemberStack.Navigator>
//   )
// }

const IndivisualStack = createNativeStackNavigator();

//indivisual画面のstack
const IndivisualStackScreen = () => {
  return (
    <IndivisualStack.Navigator>
      <IndivisualStack.Screen name="Indivisual" component={Indivisual}/>
    </IndivisualStack.Navigator>
  );
};

//Notification画面のstack
const NotificationStack = createNativeStackNavigator();

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen name="Notification" component={Notification}/>
    </NotificationStack.Navigator>
  );
};

//Account画面のStack
const AccountStack = createNativeStackNavigator();

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={Account}/>
    </AccountStack.Navigator>
  )
}

//tab画面
const Tab = createBottomTabNavigator();

const TabScreen = () => {

  const [swipeEnabled, setSwipeEnabled] = useState(true);

  return (
    <NavigationContainer>
      <Tab.Navigator headerMode="screen" screenOptions={{ headerShown: false}}>
        <Tab.Screen name="HomeStackScreen" 
                    component={HomeStackScreen} 
                    options={{
                      title: "ホーム"
                    }}
                    headerMode="screen"/>
        <Tab.Screen name="IndivisualStackScreen" component={IndivisualStackScreen}/>
        <Tab.Screen name="Notification" component={Notification}/>
        <Tab.Screen name="Account" component={Account}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabScreen;
