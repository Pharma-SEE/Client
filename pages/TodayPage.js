import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView,
    TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../style';
import {Fontisto} from '@expo/vector-icons'
    
const NavigationDrawerStructure = (props) => {
    const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
    };

    return (
    <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={toggleDrawer}>
                <Fontisto style={styles.hamburger} name="nav-icon-a" size={28}  />
        </TouchableOpacity>
    </View>
    );
};

const TodayPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, }}>
      <ImageBackground source={require("../images/background_sea.png")} style={styles.bgImage} >
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom:50,
          }} >
          <NavigationDrawerStructure navigationProps={navigation} />
        </View>
        <View style={{...styles.smallContainer, marginTop:"5%"}}>
          <Text style={{...styles.title, fontSize:33}}>
            오늘 먹을 약 인식
          </Text>
        </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default TodayPage;
