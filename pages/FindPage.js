import React, { useEffect, useState } from "react";
import { Button, View, Text, SafeAreaView, 
    TouchableOpacity, ImageBackground, TextInput } from 'react-native';
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
  const [name, setSearchName] = useState(false);
  const [text, setText] = useState("");

  const searchName = () => setSearchName(true);
  const searchSymptom = () => setSearchName(false);
  const onChangeText = (texting) => setText(texting);

  const sendSearching = async () => {
    if (text === "") {
      return;
    }
    //send searching info to Server
    console.log(text)
    setText("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1,}}>
      <ImageBackground source={require("../images/background_mt.png")} style={styles.bgImage} >
        <View style={{ alignItems: 'center', justifyContent: 'center',
            marginBottom:50, }} >
          <NavigationDrawerStructure navigationProps={navigation} />
        </View>
        <View style={{...styles.container}}>
          <Text style={styles.title}>
            약 검색
          </Text>
          <View style={styles.smallContainer}>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={searchSymptom}>
                <Fontisto style={{...styles.menuIcon, color: name? "black" : "green"}} name="check" size={18} />
              </TouchableOpacity>
              <Text style={styles.menuText}>증상 검색</Text>
            </View>
            <View style={{flexDirection:"row"}}>
              
            <TouchableOpacity onPress={searchName}>
              <Fontisto style={{...styles.menuIcon, color: !name? "black" : "green"}} name="check" size={18} />
            </TouchableOpacity>
              <Text style={styles.menuText}>이름 / 사진으로 검색</Text>
            </View>
            
            <View style={{...styles.searching, flexDirection:"row"}}>
            <TextInput
              onSubmitEditing={sendSearching}
              onChangeText={onChangeText}
              returnKeyType="done"
              value={text}
              placeholder={name? "이름을 입력해주세요" : "증상을 입력해주세요"}
              placeholderTextColor="black" />
              <TouchableOpacity onPress={sendSearching}>
                <Fontisto style={{...styles.menuIcon}} name="search" size={28} />
              </TouchableOpacity>
              </View>
          </View>
        </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default FindPage;
