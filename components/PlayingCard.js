import React, { useCallback, useRef, useEffect } from "react";
import { View, Animated } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { ref, update, child } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { db } from "../assets/firebase.config";

const gameRef = ref(db, `game`);
const cardStates = { 0: "#ffeb3b", 1: "#FFB300", 2: "#f15f5f", 3: "#1fd655" };
const map = {
  d: "beach-access",
  p: "icecream",
  z: "local-bar",
  a: "cake",
  c: "celebration",
  w: "color-lens",
  s: "fastfood",
  t: "free-breakfast",
};

const PlayingCard = ({ index, cardIcon, cardColour }) => {
  const anim = useRef(new Animated.ValueXY());

  const [counter] = useObjectVal(child(gameRef, "counter"));

  // Process a move
  const move = useCallback(() => {
    if (counter === 0) {
      update(gameRef, { card1: index, counter: 1 });
    } else {
      update(gameRef, { card2: index, counter: 0 });
      update(gameRef, { card1: {}, card2: {} });
    }
  }, [counter]);

  useEffect(() => {
    // Shake if the card is red
    if (cardColour === 2) Animated.loop(shake, { iterations: 1 }).start();
  }, [cardColour]);

  // Shake animation sequence
  const shake = Animated.sequence(
    [
      Animated.timing(anim.current, {
        toValue: { x: 1, y: 2 },
        duration: 60,
        useNativeDriver: false,
      }),
      Animated.timing(anim.current, {
        toValue: { x: -1, y: 2 },
        duration: 60,
        useNativeDriver: false,
      }),
      Animated.timing(anim.current, {
        toValue: { x: -3, y: 0 },
        duration: 60,
        useNativeDriver: false,
      }),
      Animated.timing(anim.current, {
        toValue: { x: 1, y: 0 },
        duration: 60,
        useNativeDriver: false,
      }),
      Animated.timing(anim.current, {
        toValue: { x: 3, y: 2 },
        duration: 60,
        useNativeDriver: false,
      }),
      Animated.timing(anim.current, {
        toValue: { x: 1, y: -1 },
        duration: 60,
        useNativeDriver: false,
      }),
      Animated.timing(anim.current, {
        toValue: { x: -1, y: 2 },
        duration: 60,
        useNativeDriver: false,
      }),
      Animated.timing(anim.current, {
        toValue: { x: -3, y: 1 },
        duration: 60,
        useNativeDriver: false,
      }),
      Animated.timing(anim.current, {
        toValue: { x: 3, y: 1 },
        duration: 60,
        useNativeDriver: false,
      }),
    ],
    { useNativeDriver: false }
  );

  return (
    <View>
      <Animated.View
        style={{
          transform: [
            { translateX: anim.current.x },
            { translateY: anim.current.y },
          ],
        }}
      >
        <Card
          onPress={move}
          style={{ backgroundColor: cardStates[cardColour] }}
        >
          <MaterialIcons
            name={cardColour != 0 ? map[cardIcon] : ""}
            style={{ transform: [{ scale: 2 }] }}
          />
        </Card>
      </Animated.View>
    </View>
  );
};

const Card = styled.Pressable`
    margin: 5px;
    padding:24px
    border-radius: 10px;
    place-items: center;
    cursor: pointer;
    min-width: 60px;
    min-height: 60px;
    transition: 0.3s all ease;
`;

export default PlayingCard;
