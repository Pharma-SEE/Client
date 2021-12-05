import { StyleSheet, Dimensions } from 'react-native';
import * as Font from 'expo-font';

Font.loadAsync({
  'NanumSquareR': require('./assets/fonts/NanumSquareR.ttf'),
  'NanumSquareB': require('./assets/fonts/NanumSquareB.ttf'),
});

const { width: SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get("window");



const styles = StyleSheet.create({
  pillContainer:{
    backgroundColor: "white",
    marginBottom: 10,
    marginHorizontal:10,
    paddingVertical: 20,
    paddingHorizontal:20,
    borderRadius: 10,
    flexDirection: "column",
  },

  pillFirstLine: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
  },

  pillText:{
    fontFamily:'NanumSquareB',
    fontSize:20,
    flex:1,
    marginBottom:"5%",
  },

  pillDescription:{
    fontFamily:'NanumSquareB',
    fontSize:15,
    flex:1,
  },

  pillIcon:{
    marginHorizontal:10,
  },

  sidebar:{
    color:'#96CEBC',
    marginLeft:SCREEN_WIDTH*0.05,
    marginTop:SCREEN_HEIGHT * 0.05,
  },

  hamburger:{
    color:'white',
    alignItems:"flex-start",
    justifyContent:"flex-start",
    marginEnd:SCREEN_WIDTH*0.8,
    marginTop:SCREEN_HEIGHT * 0.05
  },

  container:{
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    width:'90%',
    marginHorizontal:SCREEN_WIDTH*0.05,
  },

  smallContainer:{
    backgroundColor: "white",
    borderRadius:15,
    marginHorizontal: '5%',
    marginVertical: SCREEN_HEIGHT * 0.01,
    width:'90%',
  },

  bgImage:{
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,
    flex:1,
    resizeMode:'cover',
  },

  connectBtn:{
    width:SCREEN_WIDTH*0.2,
    backgroundColor:"#FFD966",
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    width:SCREEN_WIDTH*0.25,
    height:SCREEN_HEIGHT*0.05,
    marginTop:SCREEN_HEIGHT*0.05,
    alignSelf:"center",
  },

  uploadBtn:{
    width:SCREEN_WIDTH*0.2,
    backgroundColor:"#FFD966",
    borderRadius:5,
    alignItems:"center",
    justifyContent:"center",
    height:SCREEN_HEIGHT*0.03,
    alignSelf:"flex-end",
    marginLeft:"20%",
    marginBottom:"2%",
  },
  

  connectText:{
    fontSize:25,
    color:"white",
    fontFamily:'NanumSquareB',
  },

  bigText:{
    color:"white",
    fontSize:45,
    marginLeft:SCREEN_WIDTH*0.1,
    fontFamily:'NanumSquareB',
  },

  smallText:{
    color:"white",
    fontFamily:'NanumSquareR',
    fontSize:25,  
    marginLeft:SCREEN_WIDTH*0.1,
  },

  verySmallText:{
    color:"black",
    fontFamily:'NanumSquareB',
    fontSize:20,  
    marginLeft:SCREEN_WIDTH*0.1,
    marginTop:"20%",
  },

  specialText:{
    color:"#81BFB3",
    fontFamily:'NanumSquareB',
    fontSize:25,  
    marginLeft:SCREEN_WIDTH*0.1,
    marginVertical:"3%",
  },

  mainText:{
    color:"black",
    fontFamily:'NanumSquareB',
    fontSize:25,  
    marginLeft:SCREEN_WIDTH*0.1,
    marginVertical:"3%",
  },

  menuText:{
    fontFamily:'NanumSquareB',
    fontSize:19,
    marginVertical:8,
  },
  
  menuIcon:{
    color:'black',
    marginVertical:"3%",
    marginHorizontal:10,
  },

  plusIcon:{
    color:'green',
    marginVertical:"10%",
    marginHorizontal:"10%",
  },

  minusIcon:{
    color:'red',
    marginVertical:"3%",
    marginHorizontal:"10%",
  },

  alarmText:{
    fontFamily:'NanumSquareB',
    fontSize:17,
    marginLeft:"10%",
  },

  title:{
    color:"black",
    fontSize:38,
    marginLeft:SCREEN_WIDTH*0.05,
    fontFamily:'NanumSquareB',
    marginBottom:SCREEN_HEIGHT*0.02,
    marginTop:SCREEN_HEIGHT*0.02,
  },

  searching:{
    borderRadius:15,
    borderColor:"black",
    width:"90%",
    marginHorizontal:"5%",
    justifyContent:"space-between",
    paddingLeft:"5%",
    backgroundColor: '#D8D8D8',
    marginVertical:"3%",
  },

  cameraIcon:{
    tintColor:"#FFD966",
  },

  outerCircle:{ 
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
  },

  innerCircle:{
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
  },

  profile:{
    borderWidth: 5,
    borderRadius: 50,
    borderColor: "#FFD966",
    height: 90,
    width: 90,
    backgroundColor: "#FFD966",
    marginStart:"10%",
    marginVertical:"5%",
  },

  
});


export default styles;