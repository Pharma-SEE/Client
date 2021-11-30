import React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView,
  TouchableOpacity, ImageBackground } from 'react-native';

import { DrawerContentScrollView, DrawerItemList,
  DrawerItem } from '@react-navigation/drawer';

import styles from './style';
import {Fontisto} from '@expo/vector-icons'

/*
const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.closeDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Fontisto style={styles.sidebar} name="nav-icon-a" size={28}  />
      </TouchableOpacity>
    </View>
  );
};


  <NavigationDrawerStructure navigationProps={navigation} />
*/

const CustomSidebarMenu = (props, { navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Fontisto style={styles.sidebar} name="nav-icon-a" size={28}  />
      </TouchableOpacity>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        
      </DrawerContentScrollView>
      
    </SafeAreaView>
  );
};


export default CustomSidebarMenu;
