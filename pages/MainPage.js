import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, 
  TouchableOpacity, ImageBackground, Image, 
FlatList, ActivityIndicator } from 'react-native';
import styles from '../style';
import {Fontisto} from "@expo/vector-icons";
import * as Font from 'expo-font';

const BASE_URL = "http://3.37.42.228/";
//const BASE_URL = "http://e185-221-165-24-163.ngrok.io/";

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

  const [remindData, setRemindData] = useState([]);
  const [pillData, setPillData] = useState([]);
  const resetting = useRef(false);

 const getReminds = async () => {
  try {
    const response = await fetch(BASE_URL+'pharmasee/api/reminders/');
    const json = await response.json();
    resetting.current = true;
    setRemindData(json);
    console.log("remind",remindData);
    
  } catch (error) {
    console.error(error);
  } finally {
  }
 }

 const getPills = async () => {
  try {
    for(let i=0; i<Object.keys(remindData).length; i++){
      const pillResponse = await fetch(BASE_URL+'pharmasee/api/pills/'+ JSON.stringify(remindData[i].pill_id)+'/',{
        headers: {
          'Accept': 'application/json',  
          'Content-Type': 'application/json'
        },
      });
      const pillJson = await pillResponse.json();
      console.log(pillJson);
      setLoading(false);
      resetting.current = true;
      setPillData(pillData => [...pillData, pillJson]);
    }
    
  } catch (error) {
    console.error("GEtPIll err",error);
  } finally {
    console.log("final",pillData);
  }
 }

 const setTimes = () => {
   console.log("pilldata in setTimes", Object.keys(pillData).length, pillData);
    for (let i=0; i<Object.keys(pillData).length; i++){
      pillData[i].when_to_take = remindData[i].when_to_take;
      pillData[i].is_taken_today = remindData[i].is_taken_today;
    }
    
 }

 useEffect(() => {
    getReminds();
    
  },[]);

  useEffect(()=>{
    console.log("remindData",remindData);
    if (resetting.current){
      resetting.current=false;
      getPills();
    }
  }, [remindData])

  useEffect(()=>{
    console.log("pillData",pillData);
    if (resetting.current){
      resetting.current=false;
      setTimes();
    }
  }, [pillData])

  useEffect(()=>{
    console.log("loading",isLoading);
  }, [isLoading])

 const again = () => {
    setRemindData([]);
    setPillData([]);
    getReminds();
 }
  

 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1,}}>
        <ImageBackground source={require("../images/background_mt.png")} style={styles.bgImage} >
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom:30,
          }} >
          <NavigationDrawerStructure navigationProps={navigation} />
        </View>
        <View style={{...styles.container}}>
            <View style={{flexDirection:"row"}}>
                <View style={{width:"70%"}}>
                  <Text style={{...styles.verySmallText, marginTop:"20%"}}>안녕하세요, </Text>
                  <View style={{flexDirection:"row"}}>
                    <Text style={{...styles.specialText}}>일남</Text>
                    <Text style={{...styles.mainText, marginLeft:0}}>님! :)</Text>
                  </View>
                  <View style={{flexDirection:"row"}}>
                  <Text style={{...styles.mainText, marginTop:"10%"}}>오늘 복용하실 약은</Text>
                  <TouchableOpacity style={{marginTop:"10%", marginLeft:"20%"}} onPress={again}>
                      <Fontisto name="redo" size={20}  />
                  </TouchableOpacity>
                  </View>
                </View>
                <Image source={require("../images/user_ilnam.png")} style={{...styles.profile}} />
                
            </View>

            {isLoading? <ActivityIndicator/> : (
            
              
            <FlatList data={pillData} 
              keyExtractor={({id}) => id}
              renderItem={({item}) => {return (
                
                <View style={{...styles.pillContainer}}>
                  <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <Text style={{...styles.pillText, fontsize:25}}>{item.name}</Text>
                    <Text style={{...styles.pillDescription}}>복용시간: {String(item.when_to_take).substr(0,5)}</Text>
                    {item.is_taken_today &&  <Fontisto style={{color: "green"}} name="check" size={15} /> }
                  </View>
                  <Text style={{...styles.pillDescription}}>{item.effect}</Text>
                </View>

              );}}
              />
          )}
          
        </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default MainPage;
