import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { UserDashBoard } from "./pages/userDashBoard";
import { Start } from "./pages/start";
import { DieticianSignIn } from "./pages/dieticianSignIn";
import { UserSignIn } from "./pages/userSignIn";
import { UserSignUp } from "./pages/userSignUp";

import { UserProvider } from "./providers/UserProvider";
import { UserProgram } from "./pages/userProgram";
import { DieticianDashBoard } from "./pages/dieticianDashBoard";
import { DieticianSignUp } from "./pages/dieticianSignUp";
import { DieticianCreateProgram } from "./pages/dieticianCreateProgram";
import { ModalProvider } from "./providers/ModalProvider";

const Stack = createStackNavigator();

function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Start">
            <Stack.Screen name="User DashBoard" component={UserDashBoard} />
            <Stack.Screen name="User Program" component={UserProgram} />
            <Stack.Screen name="User Sign In" component={UserSignIn} />
            <Stack.Screen name="User Sign Up" component={UserSignUp} />
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen
              name="Dietician Sign In"
              component={DieticianSignIn}
            />
            <Stack.Screen
              name="Dietician Sign Up"
              component={DieticianSignUp}
            />
            <Stack.Screen
              name="Dietician DashBoard"
              component={DieticianDashBoard}
            />
            <Stack.Screen
              name="Dietician Create Program"
              component={DieticianCreateProgram}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
