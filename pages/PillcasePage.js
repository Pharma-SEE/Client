import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView,
TouchableOpacity } from 'react-native';
import styles from '../style';
import {Fontisto} from '@expo/vector-icons'

const PillcasePage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom:50,
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            This is Pillcase Page under Pillcase Page Option
          </Text>
          </View>
          <ScrollView style={{ flex:4, }}>
          <View style={styles.pill}>
            <Text style={{justifyContent:"flex-start"}}>Pill 1</Text>
            <TouchableOpacity style={{justifyContent:"flex-end"}} onPress={() => navigation.navigate('InfoPage')}>
                <Fontisto name="info" size={18}  />
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"flex-end"}} onPress={() => navigation.navigate('InfoPage')}>
                <Fontisto name="bell" size={18}  />
            </TouchableOpacity>
          </View>
          <View style={styles.pill}>
            <Text>Pill 2</Text>
          </View>
          
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PillcasePage;
