import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import ReadStory from "./screens/readStory";
import WriteStory from "./screens/writeStory";
import LoginScreen from "./screens/loginScreen";

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const tabNavigator = createBottomTabNavigator(
  {
    WriteStory: { screen: WriteStory },
    ReadStory: { screen: ReadStory },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({}) => {
        const routeName = navigation.state.routeName;
        if (routeName === "WriteStory") {
          return (
            <Image
              style={{
                height: 40,
                width: 40,
              }}
              source={require("./assets/write.png")}
            />
          );
        } else if (routeName === "ReadStory") {
          return (
            <Image
              style={{
                height: 40,
                width: 40,
              }}
              source={require("./assets/read.png")}
            />
          );
        }
      },
    }),
  }
);

const switchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  TabNavigator: { screen: tabNavigator },
});

const AppContainer = createAppContainer(switchNavigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
