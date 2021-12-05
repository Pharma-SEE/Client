import React, { useEffect, useState } from 'react';
import { ScrollView, Button, View, Text, SafeAreaView, 
  TouchableOpacity, ImageBackground, 
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
                <Text
                  style={{...styles.smallText, color:"black", marginTop:"5%"}}>
                  안녕하세요,{"\n"}[모건]님! :) {"\n"}오늘 복용하실 약은
                </Text>
                <View style={{...styles.profile }}></View>
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
