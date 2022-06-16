import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useModal } from "../hook/useModal";

function ModalComponent(props) {
  const { showModal, setShowModal } = useModal();

  console.log(props);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        style={{
          borderColor: "transparent",
          borderWidth: 0,
          alignSelf: "center",
        }}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowModal(!showModal);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{props.title}</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setShowModal(!showModal)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    transform: "translate(-50%,-50%)",
    left: "50%",
    top: "68%",
    height: "calc(100vh - 64px)",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalComponent;
