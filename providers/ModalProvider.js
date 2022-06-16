import React, { useState } from "react";
import ModalContext from "../contexts/ModalContext";

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <ModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </ModalContext.Provider>
  );
};
