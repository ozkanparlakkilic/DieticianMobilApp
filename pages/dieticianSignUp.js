import axios from "axios";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ModalComponent from "../components/Modal";
import { useModal } from "../hook/useModal";
import { baseUrl } from "../utils/baseUrl";

const screen = Dimensions.get("window");

export function DieticianSignUp({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { showModal, setShowModal } = useModal();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkForFields = () => {
    if (fullName.trim() == "") return "Enter a fullname";
    else if (!validateEmail(email)) return "Enter a valid e-mail";
    else if (password.trim() == "") return "Enter a password";
    else return true;
  };

  const register = () => {
    if (checkForFields() === true) {
      axios({
        method: "post",
        url: `${baseUrl}/api/dietician/register`,
        headers: {},
        data: {
          fullName,
          email,
          password,
        },
      })
        .then(function (response) {
          console.log(response);
          navigation.navigate("Dietician Sign In");
        })
        .catch(function (error) {
          console.log(error);
          setShowModal(true);
          setError(error);
        });
    } else {
      console.log(checkForFields());
      setShowModal(true);
      setError(checkForFields());
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up</Text>
      <TextInput
        style={styles.textInput}
        placeholder="FullName"
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={() => register()}>
          Sign Up
        </Text>
      </TouchableOpacity>
      {showModal && <ModalComponent title={error} />}
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
  text: {
    fontSize: 20,
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
  buttonText: {
    color: "#FFF",
  },
});
