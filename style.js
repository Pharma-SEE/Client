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

  menuText:{
    fontFamily:'NanumSquareB',
    fontSize:19,
    marginVertical:8,
  },
  
  menuIcon:{
    color:'black',
    marginVertical:4,
    marginHorizontal:10,
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
  }
  
});


export default styles;