import * as React from "react";
import { Platform, AppState, Text, View, StyleSheet, StatusBar } from "react-native";
import GameBoard from "./components/GameBoard";
import { name } from "./assets/random-name";
import { remove } from 'firebase/database';

const App = () => {
  // From the react naive docs
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = React.useState(appState.current);

  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        if(Platform.OS === 'web') location.reload();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if(appState.current == 'background') remove(playerRef);
    });
    return () => {subscription.remove()};
  }, []);

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
