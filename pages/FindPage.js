import * as React from 'react';
import { Button, View, Text, SafeAreaView, 
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

const FindPage = ({ navigation }) => {
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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'left',
              marginBottom: 16,
            }}>
            FindPage입니다
          </Text>
          
        </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default FindPage;
