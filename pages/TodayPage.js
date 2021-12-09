import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView,
    TouchableOpacity, ImageBackground, Image, Modal,
  Alert } from 'react-native';
import styles from '../style';
import {Fontisto} from '@expo/vector-icons'
import {Camera} from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'; 
import axios from "axios";

//const BASE_URL = "http://3.37.42.228";
const BASE_URL = "http://4f84-221-165-24-163.ngrok.io";

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
  const [res, setRes] = useState([]);

  const uploadImage = async () => {
    if (singleFile != null) {
      const fileToUpload = singleFile;
      console.log(singleFile);
      const data = new FormData();
      
      
      data.append('image', {
        name: "test.jpg",
        uri: 
        fileToUpload.uri.replace("file://",""),
        type: "image/jpg",
      });
      
      console.log(JSON.stringify(data));
      
      const res = await axios.post(BASE_URL+'/pill_ai/img_upload/', data);
      setRes(res.data.output_image);
      Alert.alert(res.data.status_mesg);
      
      if (res.status == 201) {
        Alert.alert(res.data.status_mesg);
      }
     else {
        Alert.alert('Please Select File first');
    }}
  };

  const uploadPhoto = async () => {
    if (image != null) {
      const fileToUpload = image;
      console.log("image",image);
      const data = new FormData();
      
      
      data.append('image', {
        name: "test.jpg",
        uri: 
        fileToUpload.replace("file://",""),
        type: "image/jpg",
      });
      

      
      console.log(JSON.stringify(data));
      
      const res = await axios.post(BASE_URL+'/pill_ai/img_upload/', data);
      setRes(res.data.output_image);
      
      if (res.status == 201) {
        Alert.alert(res.data.status_mesg);
      }
     else {
        Alert.alert('Please Select File first');
    }}
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
        Alert.alert('Canceled');
      } else {
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
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
        <View style={{...styles.container, marginTop:"5%"}}>
          <Text style={{...styles.title, fontSize:33}}>
            오늘 먹을 약 인식
          </Text>

          <View style={{...styles.smallContainer}}>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={() => {setCamera(true);}}>
              <Fontisto style={{...styles.menuIcon, }} name="camera" size={21} />
            </TouchableOpacity >
              <Text style={styles.menuText}>사진 찍어 검색</Text>
              <TouchableOpacity
              activeOpacity={0.5}
              onPress={uploadPhoto} style={{...styles.uploadBtn, width:100}}>
              <Text>Upload Photo</Text>
            </TouchableOpacity>  
          </View>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={selectFile}>
              <Fontisto style={{...styles.menuIcon, }} name="picture" size={21} />
            </TouchableOpacity >
              <Text style={styles.menuText}>갤러리에서 검색</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={uploadImage} style={{...styles.uploadBtn}}>
              <Text>Upload File</Text>
            </TouchableOpacity>  
          </View>
        </View>
        </View>
        
        {res && <Image
          //source={{uri: BASE_URL + res.data.input_image}}
          source = {{uri: BASE_URL + res}}
          style={{...styles.returnImage}}
        />}
        
        
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
