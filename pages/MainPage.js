import * as React from 'react';
import { ScrollView, Button, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../style';
import {Fontisto} from "@expo/vector-icons";

const MainPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'left',
              marginBottom: 50,
            }}>
            안녕하세요,{"\n"}[모건]님! :) {"\n"}오늘 복용하실 약은
          </Text>
        </View>
        <ScrollView style={{ flex:4, }}>
          <View style={styles.pill}>
            <Text>Pill 1</Text>
          </View>
          <View style={styles.pill}>
            <Text>Pill 2</Text>
          </View>
          
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MainPage;
