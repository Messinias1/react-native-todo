import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Button,
  TextInput,
  Modal,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./App.style";

const DATA = [
  {
    id: "1",
    title: "Gym",
    completed: false,
  },
  {
    id: "2",
    title: "Coding",
    completed: false,
  },
  {
    id: "3",
    title: "Journaling",
    completed: false,
  },
];

export default function App() {
  const [items, setItems] = useState(DATA);
  const [text, setText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addNewTodo = () => {
    let newTodo = {
      id: items.length + 1,
      title: text,
      completed: false,
      color: "#DF5E5F",
    };

    setItems([...items, newTodo]);
    setText("");
    setIsModalVisible(false);
  };

  const markItemCompleted = (item) => {
    const itemIndex = items.findIndex((currItem) => currItem.id === item.id);

    if (itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = { ...items[findIndex], completed: true };
      setItems(updatedItems);
    }
  };

  const TodoItem = (props) => (
    <TouchableOpacity
      style={(styles.item, { backgroundColor: props.item })}
      onPress={() => markItemCompleted(props.item.color)}
    >
      <Text
        style={
          props.item.completed ? styles.itemTextCompleted : styles.itemText
        }
      >
        {props.item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderAddButton = () => {
    return (
      <TouchableOpacity
        title="add an item"
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.icon}>
          <Ionicons name="add" size={24} color="#652E00" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}></View>
        </View>
        <TextInput style={styles.input} onChangeText={setText} value={text} />
        <Button title="Add Todo" onPress={addNewTodo} />
      </Modal>
      <StatusBar style="auto" />
      <FlatList
        style={styles.list}
        data={items}
        renderItem={({ item }) => <TodoItem item={item} />}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderAddButton}
      />
    </SafeAreaView>
  );
}
