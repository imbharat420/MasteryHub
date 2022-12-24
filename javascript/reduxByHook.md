Here's an example of how you can use the Context API and useReducer hook to create a Redux-like store for managing application state:

```js
import React, { createContext, useReducer } from 'react';

// Create a context for the state and a reducer for updating the state
const StoreContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
};

// Create a provider to wrap your components and provide the state and dispatch functions
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { todos: [] });

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// To use the state and dispatch functions, use the useContext hook
const TodoList = () => {
  const { state, dispatch } = useContext(StoreContext);
  return (
    <ul>
      {state.todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

// To add a todo, you can dispatch an action
const AddTodo = () => {
  const { dispatch } = useContext(StoreContext);
  const [todoText, setTodoText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'ADD_TODO', payload: { id: Date.now(), text: todoText } });
    setTodoText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoText}
        onChange={e => setTodoText(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

// To use the store, wrap your components with the StoreProvider
const App = () => (
  <StoreProvider>
    <AddTodo />
    <TodoList />
  </StoreProvider>
);
```

This example uses the useReducer hook to manage the application state, and the Context API to provide the state and dispatch function to components that need it. The StoreProvider wraps the components that need access to the state and dispatch function, and the useContext hook is used to retrieve the state and dispatch function from the context.

You can dispatch actions to update the state, just like in