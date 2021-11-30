import { StyleSheet, Dimensions } from 'react-native';
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

  hamburger:{
    color:'white',
    alignItems:"flex-start",
    justifyContent:"flex-start",
    marginEnd:SCREEN_WIDTH-100,
  },

  container:{
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    marginBottom:150,
    width:'90%',
    marginHorizontal:10,
  },

  bgImage:{
    width:SCREEN_WIDTH,
    height:SCREEN_HEIGHT,
    flex:1,
    resizeMode:'cover',
  }


  
});


export default styles;