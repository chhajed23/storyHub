import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { SearchBar } from "react-native-elements";
import AppHeader from "../appHeader";
import db from "../config";
import firebase from "firebase";

export default class SearchScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      story: "",
    };
  }

  checkingStoryAvailability = async () => {
    db.collection("writeStory")
      .doc(this.state.title)
      .get()
      .then((doc) => {
        var story = doc.data();
        if (story.title) {
          this.submitStory();
          Alert.alert("Story has been submitted");
           ToastAndroid.show("Story is issued",ToastAndroid.SHORT);
        } else {
          Alert.alert("This book is written by someone else!!");
          ToastAndroid.show("Story has been written !!",ToastAndroid.SHORT);
        }
      });
  };

  submitStory = async () => {
    db.collection("writeStory").add({
      author: this.state.author,
      title: this.state.title,
      date: firebase.firestore.Timestamp.now().toDate(),
      story: this.state.story,
    });
    Alert.alert("your story has been submitted");
  };

  render() {
    return (
      <View style={styles.container}>
        <AppHeader />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TextInput
              style={styles.inputBox}
              placeholder="Story Title"
              onChangeText={(txt) => {
                this.setState({
                  title: txt,
                });
              }}
            />

            <TextInput
              style={styles.inputBox}
              placeholder="Author"
              onChangeText={(txt) => {
                this.setState({
                  author: txt,
                });
              }}
            />
            <TextInput
              style={styles.StoryWriting}
              placeholder="Write Your Story"
              multiline={true}
              onChangeText={(txt) => {
                this.setState({
                  story: txt,
                });
              }}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                this.submitStory();
              }}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: 200,
    height: 50,
    margin: 10,
    borderWidth: 1.5,

    fontSize: 20,
  },
  StoryWriting: {
    width: 200,
    height: 100,
    borderWidth: 1.5,

    fontSize: 20,
  },
  submitButton: {
    marginTop: 50,
    backgroundColor: "orange",
    width: 200,
    borderWidth: 1.5,
  },
  submitText: { fontSize: 30, textAlign: "center", fontWeight: "bold" },
});
