import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { useUserData } from "../hook/useUserData";
import ModalComponent from "../components/Modal";
import { useModal } from "../hook/useModal";

const screen = Dimensions.get("window");

export function UserSignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserData();
  const [error, setError] = useState("");
  const { showModal, setShowModal } = useModal();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkForFields = () => {
    if (!validateEmail(email)) return "Enter a valid e-mail";
    else if (password.trim() == "") return "Enter a password";
    else return true;
  };

  const login = () => {
    if (checkForFields() === true) {
      axios({
        method: "post",
        url: `${baseUrl}/api/user/login`,
        headers: {},
        data: {
          email,
          password,
        },
      })
        .then(function (response) {
          console.log(response);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
          navigation.navigate("User DashBoard");
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
      <Text style={styles.text}>Sign In</Text>
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
        <Text style={styles.buttonText} onPress={() => login()}>
          Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => navigation.navigate("User Sign Up")}
        >
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
