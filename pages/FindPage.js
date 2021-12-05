import React, { useEffect, useState } from "react";
import { Button, View, Text, SafeAreaView, 
    TouchableOpacity, ImageBackground, TextInput, Modal,
  ActivityIndicator, FlatList, Image } from 'react-native';
import styles from '../style';
import {Fontisto} from "@expo/vector-icons";
import {Camera} from 'expo-camera'
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';


const BASE_URL = "http://3.37.42.228/";

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

const CameraModule = (props) => {
  const [cameraRef, setCameraRef] = useState(null);

return (
   <Modal
     animationType="slide"
     transparent={true}
     visible={true}
     onRequestClose={() => {
       props.setModalVisible();
     }}
   >
     <Camera
       style={{ flex: 1 }}
       ratio="16:9"
       ref={(ref) => {
         setCameraRef(ref);
       }}
     >
       <View
         style={{
           flex: 1,
           backgroundColor: "transparent",
           justifyContent: "flex-end",
         }}
       >
         <View
           style={{
             backgroundColor: "black",
             flexDirection: "row",
             alignItems: "center",
           }}
         >
           <TouchableOpacity style={{marginLeft: 12}} onPress={() => {props.setModalVisible();}} >
             <Text style={{color:"white", marginEnd:"35%"}}>Close</Text>
            </TouchableOpacity>
           
          <TouchableOpacity
             onPress={async () => {
               if (cameraRef) {
                 let photo = await cameraRef.takePictureAsync();
                 props.setImage(photo);
                 props.setModalVisible();
               }
             }}
           >
             <View style={{...styles.outerCircle}} >
               <View style={{...styles.innerCircle}}>
               </View>
             </View>
           </TouchableOpacity>
      
         </View>
       </View>
     </Camera>
   </Modal>
 );
};

const FindPage = ({ navigation }) => {
  const [name, setSearchName] = useState(false);
  const [text, setText] = useState("");
  const [image,setImage] = useState(null);
  const [camera, setCamera] = useState(false);
  
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [singleFile, setSingleFile] = useState(null);

  const uploadImage = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      // Please change file upload URL
      let res = await fetch(
        BASE_URL+'pill_ai/identify/',
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.getDocumentAsync({
      });
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (res.cancelled) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const searchPills = async () => {
     try {
      if (name){
        setSearch("name");
      }
      
      else{
        setSearch("effect");
      }
      const response = await fetch(BASE_URL+'pharmasee/search/?'+search+'='+text);
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  const searchName = () => setSearchName(true);
  const searchSymptom = () => setSearchName(false);
  const onChangeText = (texting) => setText(texting);

  const sendSearching = async () => {
    if (text === "") {
      return;
    }
    //send searching info to Server
    searchPills()
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
              <Text style={styles.menuText}>이름으로 검색</Text>
            </View>
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={() => {setCamera(true);}}>
              <Fontisto style={{...styles.menuIcon, }} name="camera" size={21} />
            </TouchableOpacity >
              <Text style={styles.menuText}>사진으로 검색</Text>
            </View>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity
                onPress={selectFile}>
                <Text style={styles.menuText}>Select File</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={uploadImage}>
              <Text>Upload File</Text>
            </TouchableOpacity>
            
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
          {camera && (
        <CameraModule
          showModal={camera}
          setModalVisible={() => setCamera(false)}
          setImage={(result) => setImage(result.uri)}
          
        />
      )}
      {isLoading? <ActivityIndicator/> : (
            <FlatList data={data}
              keyExtractor={({id}, index) => id}
              renderItem={({item}) => (
                <View style={styles.pillContainer}>
                <Text style={styles.pillText}>{item.name}</Text>
                <Image
                    source={{ uri: item.image_dir }}
                    style={{ width: 120, height: 120, }}
                        />
                <Text style={styles.pillDescription}>{item.effect}</Text>
                <TouchableOpacity style={{...styles.connectBtn}}>
                  <Text>약통에 추가</Text>
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

export default FindPage;
