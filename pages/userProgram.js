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

export function UserProgram({ navigation }) {
  const { user } = useUserData();
  const [program, setProgram] = useState([]);

  const getProgram = () => {
    axios({
      method: "get",
      url: `${baseUrl}/api/user/program/${user._id}`,
      headers: {},
    })
      .then(function (response) {
        console.log(response);
        setProgram(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getProgram();
  }, []);

  return (
    <View style={styles.container}>
      {program.map((item, index) => (
        <View key={index} style={styles.program}>
          <View style={[styles.questionBox, styles.underline]}>
            <Text style={styles.title}>Breakfast</Text>
            <Text style={styles.description}>{item.program.breakfast}</Text>
          </View>
          <View style={[styles.questionBox, styles.underline]}>
            <Text style={styles.title}>Lunch</Text>
            <Text style={styles.description}>{item.program.lunch}</Text>
          </View>
          <View style={styles.questionBox}>
            <Text style={styles.title}>Dinner</Text>
            <Text style={styles.description}>{item.program.dinner}</Text>
          </View>
          <View style={styles.dieticianBox}>
            <Text style={styles.dieticianName}>{item.dietician.fullName}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  program: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "white",
  },
  title: {
    color: "black",
    textAlign: "left",
    fontWeight: "700",
  },
  description: {
    color: "black",
    textAlign: "left",
  },
  questionBox: {
    width: "100%",
    paddingVertical: 10,
  },
  underline: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  dieticianBox: {
    width: "100%",
    paddingVertical: 10,
    marginTop: 10,
  },
  dieticianName: {
    textAlign: "right",
  },
});
