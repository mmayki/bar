import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { spacing } from "../../constants/dimensions";

const profile = () => {
  return (
    <View style={styles.container}>
      {/*profile image*/}
      <View style={styles.ProfileImageContainer}>
        <Image source={require("../../assets/dp.png")} />
      </View>
      <Text>profile</Text>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  ProfileImageContainer: {
    alignSelf: "center",
    marginBottom: spacing.sm,
  },
});
