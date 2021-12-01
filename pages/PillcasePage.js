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
          <View style={{...styles.smallContainer, marginTop:"10%"}}>
          <Text style={{...styles.title, fontSize:33}}>
            나의 약통
          </Text>
          </View>
          </View>
          <ScrollView style={{ flex:4, }}>
          <View style={{...styles.pillContainer}}>
            <View style={styles.pillFirstLine}>
              <Text style={styles.pillText}>[디오솔탄트] [50mg]</Text>
              <TouchableOpacity style={styles.pillIcon} onPress={() => navigation.navigate('InfoPage')}>
                  <Fontisto name="info" size={18}  />
              </TouchableOpacity>
              <TouchableOpacity style={styles.pillIcon} onPress={() => navigation.navigate('AlarmPage')}>
                  <Fontisto name="bell" size={18}  />
              </TouchableOpacity>
            </View>
            <Text style={styles.pillDescription}>[타원형, 흰색 캡슐]</Text>
            <Text style={styles.pillDescription}>[항암치료제]</Text>
          </View>
          <View style={{...styles.pillContainer}}>
            <View style={styles.pillFirstLine}>
              <Text style={styles.pillText}>[콘스탄티누스] [1정]</Text>
              <TouchableOpacity style={styles.pillIcon} onPress={() => navigation.navigate('InfoPage')}>
                  <Fontisto name="info" size={18}  />
              </TouchableOpacity>
              <TouchableOpacity style={styles.pillIcon} onPress={() => navigation.navigate('AlarmPage')}>
                  <Fontisto name="bell" size={18}  />
              </TouchableOpacity>
            </View>
            <Text style={styles.pillDescription}>[원형, 주황색 캡슐]</Text>
            <Text style={styles.pillDescription}>[비타민 B 보조제]</Text>
          </View>
          
          
        </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default PillcasePage;
