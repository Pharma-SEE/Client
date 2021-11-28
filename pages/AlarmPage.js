import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';

const AlarmPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            This is Alarm Page under Second Page Option
          </Text>
          <Button
            onPress={() => navigation.navigate('MainPage')}
            title="Go to Main Page"
          />
          <Button
            onPress={() => navigation.navigate('PillcasePage')}
            title="Go to Pillcase Page"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AlarmPage;
