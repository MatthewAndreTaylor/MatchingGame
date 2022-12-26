import React, { useCallback, useRef } from "react";
import { View, Animated } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

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

  const move = useCallback(() => {
    console.log("clicked", index);
    Animated.loop(shake, { iterations: 1 }).start();
  }, []);

  // Shake animation sequencec
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
