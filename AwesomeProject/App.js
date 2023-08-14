import React, {useEffect} from 'react';
import TabScreen from './src/Navigations/';
import * as Notifications from 'expo-notifications';


const App = () => {
  useEffect(() => {
    requestPermissionsAsync();
  })
  return (
<TabScreen />
  );
}

const requestPermissionsAsync = async () => {
  const { granted } = await Notifications.getPermissionsAsync();
  if (granted) { return }

  await Notifications.requestPermissionsAsync();
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default App;
/*
const Stack = createNativeStackNavigator();


const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigater>
        <Stack.Screen
        name = "Home" 
        component= {Home}
        />
      </Stack.Navigater>
    </NavigationContainer>
  );
}

export default App;


/*
export default function App() {

  //global state(アプリ内でどこからでもアクセスできる変数？？)

  //navigation

  return (
    <View style={styles.container}>
      <View style={styles.projectContainer}>
        <Text style={styles.black}>検索</Text>
      </View>
      <ScrollView>
      <View　style={styles.projectContainer}>
        <Text style={styles.black}>広島旅行！！</Text>
      </View>

      <View　style={styles.projectContainer}>
        <Text style={styles.black}>バイト先忘年会!!</Text>
      </View>

      <View　style={styles.projectContainer}>
        <Text style={styles.black}>サークルスウェット代金立て替え</Text>
      </View>
      <View　style={styles.projectContainer}>
        <Text style={styles.black}>サークルスウェット代金立て替え</Text>
      </View>
      <View　style={styles.projectContainer}>
        <Text style={styles.black}>サークルスウェット代金立て替え</Text>
      </View>
      <View　style={styles.projectContainer}>
        <Text style={styles.black}>サークルスウェット代金立て替え</Text>
      </View>
      <View　style={styles.projectContainer}>
        <Text style={styles.black}>サークルスウェット代金立て替え</Text>
      </View>
      <View　style={styles.projectContainer}>
        <Text style={styles.black}>サークルスウェット代金立て替え</Text>
      </View>



      <View　style={styles.projectContainer}>
        <Text style={styles.black}>サークルスウェット代金立て替え</Text>
      </View>
      <View　style={styles.projectContainer}>
        <Text style={styles.black}>サークルスウェット代金立て替え</Text>
      </View>
      <View　style={styles.projectContainer}>
        <Text style={styles.black}>サークルスウェット代金立て替え</Text>
      </View>
      <View　style={styles.projectContainer}>
        <Text style={styles.black}>サークルスウェット代金立て替え</Text>
      </View>
      
      </ScrollView>
      <View style={styles.projectContainer}>
        <Text style={styles.black}>各項目</Text>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serchBer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'start',
    justifyContent: 'center',
  },
  projectContainer: {
    height: 90,
    width: "80%",
    borderColor: "gray",
    borderWidth: 3, 
    flexDirection: 'row' 
  },
  red: {
    color: "red"
  },
  black: {
    color: "black",
    fontSize: 20
  }
});

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};
*/