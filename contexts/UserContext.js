import { createContext } from "react";

const user = JSON.parse(localStorage.getItem("user"));
// const checkUser = localStorage.getItem("user");

export default createContext({
  user: "",
  setUser: () => {},
});
