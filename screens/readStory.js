import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SearchBar } from "react-native-elements";
import db from "../config";

export default class ReadStory extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      dataSource: [],
      search: "",
    };
  }
  componentDidMount() {
    this.retriveStories();
  }
  retriveStories = async () => {
    var stories = [];
    const query = await db
      .collection("writeStory")
      .get()
      .then((story) => {
        story.forEach((doc) => {
          stories.push(doc.data());
        });
        this.setState({
          allStories: stories,
          dataSource: stories,
        });
      });
  };
  searchFilter = (search) => {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = search.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: search,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          style={styles.searchBar}
          placeholder="Search the Title"
          onChangeText={(search) => {
            this.searchFilter(search);
          }}
          onClear={(search) => {
            this.searchFilter("");
          }}
          value={this.state.search}
        />
        <FlatList
          data={
            this.state.search === ""
              ? this.state.allStories
              : this.state.dataSource
          }
          renderItem={({ item }) => (
            <View>
              <Text>Title:{item.title}</Text>
              <Text>Author:{item.author}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    //  alignItems: "center",
    //  justifyContent: "center",
  },
  searchBar: {
    width: 300,
    height: 15,
    marginTop: 10,
    paddingTop: 20,
  },
});
