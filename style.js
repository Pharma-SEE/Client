import { StyleSheet, Dimensions } from 'react-native';
import * as Font from 'expo-font';

Font.loadAsync({
  'NanumSquareR': require('./assets/fonts/NanumSquareR.ttf'),
});

const { width: SCREEN_WIDTH, height:SCREEN_HEIGHT } = Dimensions.get("window");



const styles = StyleSheet.create({
  pill: {
    backgroundColor: "white",
    marginBottom: 10,
    marginHorizontal:10,
    paddingVertical: 20,
    paddingHorizontal:20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
  },

  pillText:{
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
    marginBottom:SCREEN_HEIGHT*0.2,
    width:'90%',
    marginHorizontal:SCREEN_WIDTH*0.05,
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
    fontFamily:'NanumSquareR',
  },

  bigText:{
    color:"white",
    fontSize:45,
    marginLeft:SCREEN_WIDTH*0.1,
    fontFamily:'NanumSquareR',
    fontWeight:"bold",
  },

  smallText:{
    color:"white",
    fontSize:25,  
    marginLeft:SCREEN_WIDTH*0.1,
  },
  
});


export default styles;