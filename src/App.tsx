import React, { useCallback, useReducer, useRef, useState } from "react";
import "./App.css";



interface Todo {
  id: number;
  text: string;
}
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const [myState, setMyState] = useState<Todo>();


  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input type="text" ref={newTodoRef} placeholder="todo text" />
        </div>
        <button onClick={onAddTodo}>Add</button>
      </div>
      <div className="todoList">
        {todos.map((todo) => (
          <div key={todo.id}>
            <div className="task">
              <div className="content">
                <span>{todo.text}</span>
              </div>
              <button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
                Remove
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;