import React, {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, 
    TouchableOpacity, ImageBackground, TextInput,
    ActivityIndicator, FlatList, Alert } from 'react-native';
import styles from '../style';
import {Fontisto} from '@expo/vector-icons'

//const BASE_URL = "http://3.37.42.228/";
const BASE_URL = "http://4f84-221-165-24-163.ngrok.io/";

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
    const [none, setNone] = useState(false);

    useEffect(()=>{
        console.log(none);
      }, [none])

    
    const onChangeText = (texting) => setText(texting);

    const searchBohoja = async () => {
        try {
         const response = await fetch(BASE_URL+'accounts/search/?search='+text);
         const json = await response.json();
         if (Object.keys(json).length===0){
            setNone(true);
            setData([]);
          }
          else{
            setNone(false)
            setData(json);
          }
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
        Alert.alert("Follow 요청이 처리되었습니다.")
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
          {none && (
          <View style={{...styles.smallContainer, justifyContent:"space-between"}}>
            <Text style={{...styles.menuText, textAlign:"center"}}>찾으시는 보호자가 없습니다.</Text>
          </View>
        )}
        </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default BohojaPage;
