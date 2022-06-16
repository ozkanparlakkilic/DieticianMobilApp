import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import Icon from "react-native-vector-icons/AntDesign";

const screen = Dimensions.get("window");

export function DieticianCreateProgram({ route, navigation }) {
  //   const [questionData, setQuestionData] = useState([]);
  const { questionId, user, dietician } = route.params;
  const [answer, setAnswer] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });
  console.log(questionId, user, dietician);

  const createProgram = () => {
    axios({
      method: "post",
      url: `${baseUrl}/api/user/program`,
      headers: {},
      data: {
        program: answer,
        user,
        dietician,
      },
    })
      .then(function (response) {
        console.log(response);
        updateAnswer();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateAnswer = () => {
    axios({
      method: "put",
      url: `${baseUrl}/api/user/question/${questionId}`,
      headers: {},
    })
      .then(function (response) {
        console.log(response);
        navigation.navigate("Dietician DashBoard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Breakfast</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4}
          onChangeText={(newText) =>
            setAnswer({ ...answer, breakfast: newText })
          }
        />
      </View>
      <View>
        <Text>Lunch</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4}
          onChangeText={(newText) => setAnswer({ ...answer, lunch: newText })}
        />
      </View>
      <View>
        <Text>Dinner</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4}
          onChangeText={(newText) => setAnswer({ ...answer, dinner: newText })}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => createProgram()}>
        <Text style={styles.text}>Create Program</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
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
    textAlign: "left",
    color: "white",
  },
});
