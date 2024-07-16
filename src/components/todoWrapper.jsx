import React, { useState } from "react";
import TodoForm from "./todoForm";
import Todo from "./todo";
import EditTodoForm from "./EditTodoForm";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const notify = () => toast.success("Successfully toasted!");

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    notify();
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>To do List</h1>

      <TodoForm addTodo={addTodo} />

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} tasks={todo} editTask={editTask} />
        ) : (
          <Todo
            key={todo.id}
            tasks={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}

      <Toaster position="bottom-center" reverseOrder={true} />
    </div>
  );
};

export default TodoWrapper;
