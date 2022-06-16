import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import Icon from "react-native-vector-icons/AntDesign";
import { useUserData } from "../hook/useUserData";

const screen = Dimensions.get("window");

export function DieticianDashBoard({ navigation }) {
  const [questionData, setQuestionData] = useState([]);
  const { user } = useUserData();

  const getQuestions = () => {
    axios({
      method: "get",
      url: `${baseUrl}/api/user/question`,
      headers: {},
    })
      .then(function (response) {
        console.log(response);
        setQuestionData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <View style={styles.container}>
      {questionData.length != 0 ? (
        questionData.map((question, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() =>
              navigation.navigate("Dietician Create Program", {
                questionId: question._id,
                user: question.user,
                dietician: user,
              })
            }
          >
            <View>
              <Icon name="questioncircleo" size={30} color="#fff" />
            </View>
            <View>
              <View style={styles.userQuestion}>
                <Text style={styles.userText}>
                  <Text style={styles.title}>Question :</Text>
                  {question.question}
                </Text>
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.userText}>
                  <Text style={styles.title}>Name :</Text>
                  {question.user.fullName}
                </Text>
                <Text style={styles.userText}>
                  <Text style={styles.title}>Email :</Text>
                  {question.user.email}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.question}>There are no questions right now</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    fontWeight: "700",
    fontSize: 17,
  },
  textInput: {
    width: (screen.width / 5) * 3,
    height: 30,
    margin: 10,
    backgroundColor: "rgba(0,0,0,.05)",
    padding: 5,
    borderRadius: 5,
  },
  card: {
    display: "flex",
    width: "80%",
    maxWidth: 900,
    paddingTop: 4,
    paddingBottom: 4,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#1365a6",
    borderRadius: 5,
  },
  text: {
    textAlign: "left",
    color: "white",
  },
  question: {
    color: "black",
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  userQuestion: {
    width: "100%",
  },
  userText: {
    margin: 5,
    color: "white",
  },
});
