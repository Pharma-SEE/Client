// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainPage from './pages/MainPage';
import PillcasePage from './pages/PillcasePage';
import InfoPage from './pages/InfoPage';
import AlarmPage from './pages/AlarmPage';

// Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function mainScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="MainPage">
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{
          title: 'Main Page', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
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
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="PillcasePage"
        component={PillcasePage}
        options={{
          title: 'Pillcase Page', //Set Header Title
        }}
      />
      <Stack.Screen
        name="InfoPage"
        component={InfoPage}
        options={{
          title: 'Info Page', //Set Header Title
        }}
      />
      <Stack.Screen
        name="AlarmPage"
        component={AlarmPage}
        options={{
          title: 'Alarm Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="MainPage"
          options={{ drawerLabel: '메인 페이지' }}
          component={mainScreenStack}
        />
        <Drawer.Screen
          name="FindPage"
          options={{ drawerLabel: '약 찾기/등록하기' }}
          component={pillcaseScreenStack}
        />
        <Drawer.Screen
          name="PillcasePage"
          options={{ drawerLabel: '약통' }}
          component={pillcaseScreenStack}
        />
        <Drawer.Screen
          name="TodayPage"
          options={{ drawerLabel: '오늘의 약' }}
          component={pillcaseScreenStack}
        />
        <Drawer.Screen
          name="BohojaPage"
          options={{ drawerLabel: '보호자 연결' }}
          component={pillcaseScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
