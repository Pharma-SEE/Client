import 'react-native-gesture-handler';

import React, {useEffect, useState, Component} from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {AppLoading} from 'expo'
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera'
import * as Font from 'expo-font';

import MainPage from './pages/MainPage';
import FindPage from './pages/FindPage';
import PillcasePage from './pages/PillcasePage';
import TodayPage from './pages/TodayPage';
import BohojaPage from './pages/BohojaPage';

import CustomSidebarMenu from './CustomSidebarMenu';
import styles from './style';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function mainScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="MainPage" screenOptions={{ headerShown:false}}>
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

function findScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="FindPage">
      <Stack.Screen
        name="FindPage"
        component={FindPage}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

function pillcaseScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="PillcasePage"
      screenOptions={{
        headerShown:false
      }}>
      <Stack.Screen
        name="PillcasePage"
        component={PillcasePage}
        options={{
          title: 'Pillcase Page', //Set Header Title
        }}
      />
      
    </Stack.Navigator>
  );
}

function todayScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="TodayPage">
      <Stack.Screen
        name="TodayPage"
        component={TodayPage}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

function bohojaScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="BohojaPage">
      <Stack.Screen
        name="BohojaPage"
        component={BohojaPage}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

/*
function fetchFonts() {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/NanumSquareR.ttf'),
  });
}
*/

export class App extends React.Component {
  state={
    hasPermission: null,
    fontsLoaded: false,
  }
  async loadFonts() {
    await Font.loadAsync({
      NanumSquareR: require('./assets/fonts/NanumSquareR.ttf'),
      NanumSquareB: {
        uri: require('./assets/fonts/NanumSquareB.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }


  componentDidMount = async () => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.loadFonts();
  }
  render(){
    if (this.state.fontsLoaded){
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{...styles.smallText,
          activeTintColor: '#96CEBC',
          itemStyle: { marginVertical: 15 },
        }}
        screenOptions={{ headerShown:false }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="MainPage"
          options={{ drawerLabel: '메인 페이지' }}
          component={mainScreenStack}
        />
        <Drawer.Screen
          name="FindPage"
          options={{ drawerLabel: '약 찾기/등록하기' }}
          component={findScreenStack}
        />
        <Drawer.Screen
          name="PillcasePage"
          options={{ drawerLabel: '약통' }}
          component={pillcaseScreenStack}
        />
        <Drawer.Screen
          name="TodayPage"
          options={{ drawerLabel: '오늘의 약' }}
          component={todayScreenStack}
        />
        <Drawer.Screen
          name="BohojaPage"
          options={{ drawerLabel: '보호자 연결' }}
          component={bohojaScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );}
  else{ return null;}
  }
}

export default App;
