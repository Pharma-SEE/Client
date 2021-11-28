// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';

const FindPage = ({ navigation }) => {
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
            FindPage입니다
          </Text>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default FindPage;
