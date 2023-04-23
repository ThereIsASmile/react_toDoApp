import React from 'react';
import './App.css';

function Todo({ todo, index, completeTodo, removeTodo }) {
  // These are all the props in ToDO 
  //\ todo is an object found in function App return 
  // index is the index of the current todo item 
  // completeTodo is a function that marks a todo complete
  // removeTodo is a function that deletes it
  return (
    <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
    {/* this represents each individual todo */}
      {todo.text}
      <div>
        <input type="checkbox" onClick={() => completeTodo(index)}/>
        {/* an event handler listens for when the checkbox is clicked and then complete the line-through when is completed is true */}
        <button onClick={() => removeTodo(index)}>Delete</button>
      </div>
    </div>
  );
}
function TodoForm({ addTodo }) { 
  // \ToDOForm is a functional component that takes prop addToDo as an argument. When a new item is added inside a function, it MUST be added to props! (it will say undefined if it is not!)
  const [value, setValue] = React.useState("");
    // name the state, set the state! Value is now the state variable. setValue is how it is updated with new todos.
  const submitHandler = e => {
    // This is a function that is taking e for event as a form submission. 
    e.preventDefault();
    // This prevents default behavior which in this case is to submit the form
    if (!value) return;
    // This prevents users from creating empty todos! It checks to see if the variable value is falsey. If it is empty or null the function returns. If value is true meaning there is something inside of it, the function executes the rest of the code.
    addTodo(value);
    // this adds the new todo
    setValue("");
    // this resets the input field to blank or a custom message.
  };
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}
function App() {
  // This is the app component
  const [todos, setTodos] = React.useState([
      // name the state, set the state!
    { 
      text: "put something in",
      isCompleted: false
    }
  ])

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }
  
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }

  // removeTodo is a function that takes an index argument and removes it from the list of todos. 
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    // splice removes one element from newTodos at the specified index. This mutates the newTodos array and remove the item.
    setTodos(newTodos);
    // this updates the new array since there has been a deletion
  }

  ;
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          TO DO LIST
        </h1>
      </header>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
