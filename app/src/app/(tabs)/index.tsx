import React from "react";
import {
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  View,
} from "react-native";

const ImageButton = () => {
  const handlePress = () => {
    console.log("Кнопка нажата!");
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1.0 }]}
    >
      <Image
        source={require("../assets/Rectangle111141437.png")}
        style={styles.image}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 100,
    resizeMode: "contain",
  },
  background: {
    flex: 1, // растянуть на весь экран
    width: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
  },
});

export default ImageButton;
