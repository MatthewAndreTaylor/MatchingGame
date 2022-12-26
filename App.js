import * as React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import GameBoard from "./components/GameBoard";
import { name } from "./assets/random-name";

const App = () => {
  return (
    <View style={styles.container}>
      <View style={{ margin: StatusBar.currentHeight + 15 || 15 }} />
      <Text style={styles.paragraph}>🐢 User: {name} 🎯</Text>
      <GameBoard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },
  paragraph: {
    margin: 4,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FFFFFF",
    opacity: 0.87,
  },
});

export default App;
