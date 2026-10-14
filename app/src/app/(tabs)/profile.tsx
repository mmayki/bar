import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { spacing } from "../../constants/dimensions";

const profile = () => {
  return (
    <View style={styles.container}>
      {/*profile image*/}
      <View style={styles.profileImageContainer}>
        <Image
          source={require("../../assets/dp.png")}
          style={styles.ProfileImage}
        />
      </View>
      <Text>3213212</Text>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  profileImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacing.md,
  },
  ProfileImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
  },
});
