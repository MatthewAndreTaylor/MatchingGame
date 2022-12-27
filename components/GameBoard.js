import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import PlayingCard from "../components/PlayingCard";
import { newBoard } from "../assets/board";
import { ref, onValue, update, child, set } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { db } from "../assets/firebase.config";

const gameRef = ref(db, `game`);

const GameBoard = () => {
  const [board] = useObjectVal(child(gameRef, "board"));
  const [cards, setCards] = useState(Array(16).fill(0));

  const renderItem = ({ index }) => (
    <PlayingCard
      index={index}
      cardIcon={board[index]}
      cardColour={cards[index]}
    />
  );

  useEffect(() => {
    onValue(gameRef, (snapshot) => {
      // Setup the game if it does not exist
      if (!snapshot.exists()) {
        set(gameRef, {
          correct: "0000000000000000",
          board: newBoard(),
          counter: 0,
        });
      }

      let game = snapshot.val() || {};
      let pos1 = game.card1;
      let pos2 = game.card2;

      setCards((current) =>
        current.map((c, i) => {
          if (pos1 === i) return 1;
          if (game.correct[i] === "1") return 3;
          return c;
        })
      );

      if (pos1 != null && pos2 != null) {
        if (game.board[pos1] == game.board[pos2] && pos1 != pos2) {
          update(gameRef, {
            correct: replace(replace(game.correct, pos1), pos2),
            card1: {},
            card2: {},
          });
        } else {
          setCards((current) =>
            current.map((c, i) => {
              if (pos1 === i || pos2 === i) return 2;
              if (c == 1) return 0;
              return c;
            })
          );
          setTimeout(() => {
            setCards((current) =>
              current.map((c, i) => {
                if (c == 2) return 0;
                return c;
              })
            );
          }, 600);
        }
      }

      // Reset the board when complete
      if (game.correct == "1111111111111111") {
        setTimeout(() => {
          update(gameRef, { correct: "0000000000000000", board: newBoard() });
          setCards(Array(16).fill(0));
        }, 1000);
      }
    });
  }, []);

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

function replace(str, i) {
  return str.substring(0, i) + "1" + str.substring(i + 1);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400,
  },
});

export default GameBoard;
