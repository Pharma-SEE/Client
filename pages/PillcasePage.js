import React, { useEffect, useState } from "react";
import { Button, View, Text, SafeAreaView, ScrollView,
TouchableOpacity, ImageBackground, Modal } from 'react-native';

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
  const [info, setInfo] = useState(false);
  const [alarm, setAlarm] = useState(false);
  
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
              <View style={{flexDirection:"row"}}>
                <Fontisto style={{...styles.menuIcon, color:"green"}} name="check" size={15} />
                <Text style={{...styles.menuText}}>복용 요일</Text>
              </View>
              <Text style={{...styles.alarmText}}> [월 화 수 목 금 토 일] </Text>
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
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default PillcasePage;
