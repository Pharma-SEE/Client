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

const BohojaPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1,}}>
      <ImageBackground source={require("../images/background_moon.png")} style={styles.bgImage} >
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
            marginTop: 100,
          }}>
          <Text style={styles.bigText}>
            보호자{"\n"}연결하기
          </Text>
          
          <Text style={styles.smallText}>
              내 기기의 Pin code / 연결된 보호자
          </Text>

          <TouchableOpacity style={styles.connectBtn}>
              <Text style={styles.connectText}>연결 하기</Text>
          </TouchableOpacity>
          
        </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default BohojaPage;
