import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screen = Dimensions.get("window");

export function Start({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("User Sign In")}
      >
        <Text style={styles.buttonText}>User Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Dietician Sign In")}
      >
        <Text style={styles.buttonText}>Dietician Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: screen.height / 4,
  },
  button: {
    width: (screen.width / 5) * 3,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1365a6",
  },
  buttonText: {
    color: "#FFF",
  },
});
