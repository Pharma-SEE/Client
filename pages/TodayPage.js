import React, { useEffect, useState } from "react";
import { Button, View, Text, SafeAreaView, ScrollView,
    TouchableOpacity, ImageBackground, Image, Modal } from 'react-native';
import styles from '../style';
import {Fontisto} from '@expo/vector-icons'
import {Camera} from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'; 
import * as DocumentPicker from 'expo-document-picker';

const BASE_URL = "http://3.37.42.228//";

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

const TodayPage = ({ navigation }) => {
  const [image,setImage] = useState(null);
  const [camera, setCamera] = useState(false);

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
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, }}>
      <ImageBackground source={require("../images/background_sea.png")} style={styles.bgImage} >
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom:50,
          }} >
          <NavigationDrawerStructure navigationProps={navigation} />
        </View>
        <View style={{...styles.smallContainer, marginTop:"5%"}}>
          <Text style={{...styles.title, fontSize:33}}>
            오늘 먹을 약 인식
          </Text>
        </View>
        <TouchableOpacity onPress={() => {setCamera(true);}}>
          <Image style={{...styles.cameraIcon}} source={require("../assets/camera.png")}></Image>
        </TouchableOpacity>
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
        <Image
          source={{ uri: image }}
          style={{ width: 120, height: 120, }}
        />
        {camera && (
        <CameraModule
          showModal={camera}
          setModalVisible={() => setCamera(false)}
          setImage={(result) => setImage(result.uri)}
        />
      )}
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default TodayPage;
