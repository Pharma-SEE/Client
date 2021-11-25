import React from "react";
import { View, Text, Button } from "react-native";

function Main({ navigation }) {
  return (
    <View>
      <Text>Main!</Text>
      <Button
        title="Go to Conversation"
        onPress={() => navigation.navigate("Conversation")}
      />
    </View>
  );
}

export default Main;