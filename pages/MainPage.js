// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';

const MainPage = ({ navigation }) => {
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
            안녕하세요,{"\n"}[모건]님! :) {"\n"}오늘 복용하실 약은
          </Text>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default MainPage;
