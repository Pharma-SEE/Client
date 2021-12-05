import React, { useEffect, useState } from 'react';
import { ScrollView, Button, View, Text, SafeAreaView, 
  TouchableOpacity, ImageBackground, Image, 
FlatList, ActivityIndicator } from 'react-native';
import styles from '../style';
import {Fontisto} from "@expo/vector-icons";
import * as Font from 'expo-font';

const BASE_URL = "http://3.37.42.228/";

Font.loadAsync({
  'NanumSquareR': require('../assets/fonts/NanumSquareR.ttf'),

});

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
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getPills = async () => {
     try {
      const response = await fetch(BASE_URL+'pharmasee/search/');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPills();
  }, []);

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
        <View style={styles.container}>
            <View style={{flexDirection:"row"}}>
                <View>
                  <Text style={{...styles.verySmallText, marginTop:"20%"}}>안녕하세요, </Text>
                  <View style={{flexDirection:"row"}}>
                    <Text style={{...styles.specialText}}>미주</Text>
                    <Text style={{...styles.mainText, marginLeft:0}}>님! :)</Text>
                  </View>
                  <Text style={{...styles.mainText, marginTop:"10%"}}>오늘 복용하실 약은</Text>
                </View>
                <Image source={require("../images/user_profile.jpg")} style={styles.profile} />
                
            </View>
          {isLoading? <ActivityIndicator/> : (
            <FlatList data={data}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                <View style={styles.pillContainer}>
                <Text style={styles.pillText}>{item.name}</Text>
                <Text style={styles.pillDescription}>{item.effect}</Text>
              </View>
              )}
              />
          )}
          
        </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default MainPage;
