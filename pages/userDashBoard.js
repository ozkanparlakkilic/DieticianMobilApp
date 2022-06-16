import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import { useUserData } from "../hook/useUserData";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

const screen = Dimensions.get("window");

export function UserDashBoard({ navigation }) {
  const { user } = useUserData();
  const [question, setQuestion] = useState("");

  const checkForFields = () => {
    if (!question) return "Enter a question";
    else return true;
  };

  console.log(user);

  const sendQuestion = () => {
    if (checkForFields() == true) {
      axios({
        method: "post",
        url: `${baseUrl}/api/user/question`,
        headers: {},
        data: {
          question,
          user,
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log(checkForFields());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Question</Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        onChangeText={(newText) => setQuestion(newText)}
        defaultValue={question}
      />
      <TouchableOpacity style={styles.button} onPress={() => sendQuestion()}>
        <Text style={styles.text}>Send Question</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("User Program")}
      >
        <Text style={styles.text}>My Program</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: (screen.width / 5) * 3,
    height: 30,
    margin: 10,
    backgroundColor: "rgba(0,0,0,.05)",
    padding: 5,
    borderRadius: 5,
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
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
  question: {
    color: "black",
  },
});
