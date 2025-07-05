import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Empty Task', 'Please enter a task!');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask('');
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={{ flex: 1 }}>
        <Text
          style={[
            styles.taskText,
            item.completed && { textDecorationLine: 'line-through', color: 'gray' },
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 My Todo App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />

      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks added yet!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 5,
    marginBottom: 8,
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
  },
  deleteButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    fontStyle: 'italic',
  },
});
