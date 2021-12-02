import React, { useEffect, useState } from "react";
import { Button, View, Text, SafeAreaView, ScrollView,
    TouchableOpacity, ImageBackground, Image, Modal } from 'react-native';
import styles from '../style';
import {Fontisto} from '@expo/vector-icons'
import {Camera} from 'expo-camera'
    
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
