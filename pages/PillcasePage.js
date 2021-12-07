import React, { useEffect, useState, useRef } from "react";
import { Button, View, Text, SafeAreaView, ScrollView,
TouchableOpacity, ImageBackground, Modal
,ActivityIndicator, Image, FlatList, Alert } from 'react-native';

import styles from '../style';
import {Fontisto} from '@expo/vector-icons'

//const BASE_URL = "http://3.37.42.228/";

const BASE_URL = "http://06bc-2001-2d8-e993-e62-ec25-dd2a-3d6-382f.ngrok.io/";


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
  const [info, setInfo] = useState(false);
  const [alarm, setAlarm] = useState(false);

  const [userId,setUserId] = useState("5");
  const [isLoading, setLoading] = useState(true);
  
  const [remindData, setRemindData] = useState([]);
  const [pillData, setPillData] = useState([]);
  const resetting = useRef(false);

  const [alarms, setAlarms] = useState({});

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
    //setLoading(true);
    //getPills();
  }
 }

 const getPills = async () => {
  try {
    for(let i=1; i<2; i++){
      console.log("RD\n",remindData[i-1].pill_id);
      const pillResponse = await fetch(BASE_URL+'pharmasee/api/pills/'+ JSON.stringify(remindData[i-1].pill_id),{
        headers: {
          'Accept': 'application/json',  
          'Content-Type': 'application/json'
        },
      });
      const pillJson = await pillResponse.json();
      setLoading(false);
      setPillData(pillData => [...pillData, pillJson]);
    }
    
  } catch (error) {
    console.error("GEtPIll err",error);
  } finally {
    console.log("final",pillData);
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
  }, [pillData])

  useEffect(()=>{
    console.log("loading",isLoading);
  }, [isLoading])
  
  const infoOn = () => {
    setInfo(true);
    setAlarm(false);
  }

  const off = () =>{
    setInfo(false);
    setAlarm(false);
  }

  const alarmOn = () => {
    setAlarm(true);
    setInfo(false);
  }

  const minusAlarm = (key) => {
    Alert.alert("Delete Alarm", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newAlarms = { ...alarms };
          delete newAlarms[key];
          setAlarms(newAlarms);
        },
      },
    ]);
  };

  const plusAlarm =() => {
    Alert.prompt(
      "새로운 알람을 입력해주세요",
      "AM 10:00과 같은 형태로 입력해주세요.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          //onPress: password => console.log("OK Pressed, password: " + password)
          onPress: newAlarm =>{
            if (newAlarm === ""){
              return;
            }
            const newAlarms = {
              ...alarms,
              [Date.now()]: {newAlarm},
            };
            console.log("new",newAlarm);
            setAlarms(newAlarms);
            
            console.log("Alarms",alarms);
          }
        }
      ],
    );
  };

  

  

   
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
          {isLoading? <ActivityIndicator/> : (
            
              
            <FlatList data={pillData} 
              keyExtractor={({id}) => id}
              renderItem={({item}) => {return (
                
                <View style={{...styles.pillContainer}}>
                  <View style={styles.pillFirstLine}>
                    <Text style={{...styles.pillText, fontsize:25}}>{item.name}</Text>
                    <TouchableOpacity style={styles.pillIcon} onPress={info? off: infoOn}>
                        <Fontisto name="info" size={18} style={{ color:info? "green":"black"}}  />
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.pillIcon}} onPress={alarm? off: alarmOn}>
                        <Fontisto name="bell" size={18} style={{ color:alarm? "green":"black"}} />
                    </TouchableOpacity>
                  </View>
                  {!alarm && !info && <View>
                    <Text style={styles.pillDescription}>{item.effect}</Text>
                  </View>}
                  
                  {alarm && 
                  <View>
                    <View style={{flexDirection:"row"}}>
                      <Fontisto style={{...styles.menuIcon, color:"green"}} name="check" size={15} />
                      <Text style={{...styles.menuText}}>복용 시간</Text>
                      <TouchableOpacity>
                        <Fontisto style={{...styles.plusIcon, color:"green"}} onPress={plusAlarm} name="plus-a" size={17} />
                      </TouchableOpacity>
                    </View> 
                    <ScrollView>
                      {Object.keys(alarms).map((key)=>
                        (
                          <View key={key}>
                            <View style={{flexDirection:"row"}}>
                              <Text style={{...styles.alarmText}}> {alarms[key].newAlarm}</Text>
                              <TouchableOpacity>
                                <Fontisto style={{...styles.minusIcon}} onPress={()=>minusAlarm(key)} name="minus-a" size={17} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        )
                      )}
                      </ScrollView>       
                    <View style={{flexDirection:"row"}}>
                      <Text style={{...styles.alarmText}}> PM 02:00 </Text>
                      <TouchableOpacity>
                        <Fontisto style={{...styles.minusIcon}} name="minus-a" size={17} />
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <Text style={{...styles.alarmText}}> PM 11:00 </Text>
                      <TouchableOpacity>
                        <Fontisto style={{...styles.minusIcon}} name="minus-a" size={17} />
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row"}}>
                      <Fontisto style={{...styles.menuIcon, color:"green"}} name="check" size={15} />
                      <Text style={{...styles.menuText}}>복용 기간</Text>
                    </View>
                    <Text style={{...styles.alarmText}}> 2021.12.01 ~ 2021.12.31 </Text>
                  </View>}
                  {info && 
                  <View>

                    <Text style={{...styles.menuText}}>부작용</Text>
                    <Text>{item.side_effect}</Text>

                  </View>
                  
                  }
                </View>

              );}}
              />
          )}

                </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default PillcasePage;



/*
<ScrollView style={{  }}>
          <View style={{...styles.pillContainer}}>
            <View style={styles.pillFirstLine}>
              <Text style={styles.pillText}>[디오솔탄트] [50mg]</Text>
              <TouchableOpacity style={styles.pillIcon} onPress={info? off: infoOn}>
                  <Fontisto name="info" size={18} style={{ color:info? "green":"black"}}  />
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.pillIcon}} onPress={alarm? off: alarmOn}>
                  <Fontisto name="bell" size={18} style={{ color:alarm? "green":"black"}} />
              </TouchableOpacity>
            </View>
            {!alarm && !info && <View>
              <Text style={styles.pillDescription}>[타원형, 흰색 캡슐]</Text>
            <Text style={styles.pillDescription}>[항암치료제]</Text>
            </View>}
            
            {alarm && 
            <View>
              <View style={{flexDirection:"row"}}>
                <Fontisto style={{...styles.menuIcon, color:"green"}} name="check" size={15} />
                <Text style={{...styles.menuText}}>복용 시간</Text>
                <TouchableOpacity>
                  <Fontisto style={{...styles.plusIcon, color:"green"}} name="plus-a" size={17} />
                </TouchableOpacity>
              </View>            
              <View style={{flexDirection:"row"}}>
                <Text style={{...styles.alarmText}}> [PM 10:00] </Text>
                <TouchableOpacity>
                  <Fontisto style={{...styles.minusIcon}} name="minus-a" size={17} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row"}}>
                <Text style={{...styles.alarmText}}> [PM 11:00] </Text>
                <TouchableOpacity>
                  <Fontisto style={{...styles.minusIcon}} name="minus-a" size={17} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:"row"}}>
                <Fontisto style={{...styles.menuIcon, color:"green"}} name="check" size={15} />
                <Text style={{...styles.menuText}}>복용 기간</Text>
              </View>
              <Text style={{...styles.alarmText}}> [2021.11.01 ~ 2021.11.11] </Text>
            </View>}
            {info && <Text>Info: 부작용, 색, 크기, 복용처, 앞뒷면 글씨 등</Text>}
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

        */
