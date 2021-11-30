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

const PillcasePage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1,}}>
      <ImageBackground source={require("../images/background_sea.png")} style={styles.bgImage} >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom:50,
          }}>
          <NavigationDrawerStructure navigationProps={navigation} />
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            This is Pillcase Page under Pillcase Page Option
          </Text>
          </View>
          <ScrollView style={{ flex:4, }}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>Pill 1</Text>
            <TouchableOpacity style={styles.pillIcon} onPress={() => navigation.navigate('InfoPage')}>
                <Fontisto name="info" size={18}  />
            </TouchableOpacity>
            <TouchableOpacity style={styles.pillIcon} onPress={() => navigation.navigate('AlarmPage')}>
                <Fontisto name="bell" size={18}  />
            </TouchableOpacity>
          </View>
          <View style={styles.pill}>
            <Text>Pill 2</Text>
          </View>
          
        </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default PillcasePage;
