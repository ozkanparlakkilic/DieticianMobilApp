import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export const useUserData = () => {
  return useContext(UserContext);
};
