import * as React from 'react';
import { ScrollView, Button, View, Text, SafeAreaView, 
  TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../style';
import {Fontisto} from "@expo/vector-icons";

const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
          <Fontisto style={styles.hamburger} name="nav-icon-a" size={28} />
      </TouchableOpacity>
    </View>
  );
};

const MainPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1,}}>
        <ImageBackground source={require("../images/background_mt.png")} style={styles.bgImage} >
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom:50,
          }} >
          <NavigationDrawerStructure navigationProps={navigation} />
        </View>
        <View style={{...styles.container, flex:1}}>
              <Text
                  style={{
                    fontSize: 25,
                    textAlign: 'left',
                    marginBottom: 50,
                  }}>
                  안녕하세요,{"\n"}[모건]님! :) {"\n"}오늘 복용하실 약은
                </Text>
          <ScrollView style={{ }}>
              <View style={styles.pill}>
                <Text>Pill 1</Text>
              </View>
              <View style={styles.pill}>
                <Text>Pill 2</Text>
              </View>
          </ScrollView>
        </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default MainPage;
