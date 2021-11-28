import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';

const BohojaPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 100,
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'left',
              marginBottom: 16,
            }}>
            Bohoja Page
          </Text>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default BohojaPage;
