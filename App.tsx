/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type Todo = {
  name: string;
  completed: boolean;
};

function RenderTodo({
  todo,
  index,
  handleDelete,
  handleUpdate,
}: {
  todo: Todo;
  index: number;
  handleDelete;
  handleUpdate;
}): JSX.Element {
  const toggleSwitch = () =>
    handleUpdate(index, {...todo, completed: !todo.completed});
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Text
        onLongPress={() => {
          handleDelete(index);
          console.log(index);
        }}
        style={[
          styles.todoInfo,
          {
            textDecorationLine: todo.completed ? 'line-through' : 'none',
          },
        ]}>
        {todo.name}
        <Switch
          value={todo.completed}
          onValueChange={toggleSwitch}
          style={{alignSelf: 'flex-end'}}
        />
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [todoName, onTodoTitleChangeText] = React.useState('New Item');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((todo, ix) => index !== ix));
  };

  const updateTodo = (index: number, todo: Todo) => {
    setTodos(todos.map((item, i) => (i === index ? todo : item)));
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <TextInput
        style={styles.input}
        onChangeText={onTodoTitleChangeText}
        value={todoName}
      />
      <Button
        title="ADD"
        onPress={() => addTodo({name: todoName, completed: false})}
      />
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <FlatList
        data={todos}
        renderItem={({item, index}) => (
          <RenderTodo
            todo={item}
            index={index}
            handleDelete={deleteTodo}
            handleUpdate={updateTodo}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  todoInfo: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: '400',
  },
  input: {
    height: 50,
    margin: 20,
    borderWidth: 2,
    padding: 10,
  },
});

export default App;
