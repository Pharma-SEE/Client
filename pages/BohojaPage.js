import React, {useEffect, useState} from 'react';
import { Button, View, Text, SafeAreaView, ScrollView,
    TouchableOpacity, ImageBackground, TextInput,
    ActivityIndicator, FlatList } from 'react-native';
import styles from '../style';
import {Fontisto} from '@expo/vector-icons'

const BASE_URL = "http://3.37.42.228/";
//const BASE_URL = "http://06bc-2001-2d8-e993-e62-ec25-dd2a-3d6-382f.ngrok.io/";

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
    const [text, setText] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    
    const onChangeText = (texting) => setText(texting);

    const searchBohoja = async () => {
        try {
         const response = await fetch(BASE_URL+'accounts/search/?search='+text);
         const json = await response.json();
         setData(json);
         console.log(json);
       } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       }
     }

    const sendSearching = async () => {
        if (text === "") {
          return;
        }
        searchBohoja()
        console.log(text)
        setText("");
      };
    
    const follow = async () =>{
        //not yet.. ToDo
    }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1,}}>
        <ImageBackground source={require("../images/background_moon.png")} style={styles.bgImage} >
        <View style={{ alignItems: 'center', justifyContent: 'center',
            marginBottom:50, }} >
          <NavigationDrawerStructure navigationProps={navigation} />
        </View>
        <View style={{...styles.container}}>
          <Text style={styles.title}>
            보호자 검색
          </Text>
          <View style={styles.smallContainer}>
            <View style={{...styles.searching, flexDirection:"row"}}>
              <TextInput
              onSubmitEditing={sendSearching}
              onChangeText={onChangeText}
              returnKeyType="done"
              value={text}
              placeholder={"보호자 이름을 입력해주세요"}
              placeholderTextColor="black" />
              <TouchableOpacity onPress={sendSearching}>
                <Fontisto style={{...styles.menuIcon}} name="search" size={28} />
              </TouchableOpacity>
              </View>
          </View>
          {isLoading? <ActivityIndicator/> : (
            <FlatList data={data}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                <View style={styles.pillContainer}>
                <Text style={styles.pillText}>{item.username}</Text>
                
                <Text style={styles.pillDescription}>{item.email}</Text>
                <TouchableOpacity style={{...styles.connectBtn, alignSelf:"flex-end"}} onPress={follow}>
                  <Text>Follow</Text>
                </TouchableOpacity>
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

export default BohojaPage;
