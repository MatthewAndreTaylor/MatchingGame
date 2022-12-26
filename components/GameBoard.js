import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PlayingCard from "../components/PlayingCard";
import { newBoard } from "../assets/board";

const GameBoard = () => {
  const board = newBoard();
  const [cards, setCards] = useState(Array(16).fill(0));

  const renderItem = ({ index }) => (
    <PlayingCard
      index={index}
      cardIcon={board[index]}
      cardColour={cards[index]}
    />
  );

  return (
    <View>
      <FlatList
        style={styles.container}
        data={board}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={(index) => index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400,
  },
});

export default GameBoard;
