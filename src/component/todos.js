import React from "react";
import "../component/todos.css";
import { Card, Grid, ListItemButton, ListItemText, Checkbox} from "@mui/material";

// 1. This component formats and returns the list of todos.
// 2. Treat the question mark like an if statement.
// If the todos array has items in the list [todos.length], we want to return the list
// Else, return a message saying "You have no todo's left"
// 3. The map function is called to assign each array item with a key
// 4. Think of lines 14-23 as a loop. For each todo in the todo list, we want to give the list item
// a key, and it's own card shown in the UI
const Todos = ({ todos, deleteTodo }) => {
  const todoList = todos.length ? (
    todos.map((todo) => {
      let color = "#ffffffff";
      let textStyle = {};
      if (todo.due) {
        let due = new Date(todo.due);
        let today = new Date();
        if (due < today) {
          color = "red";
          textStyle = { fontWeight: 'bold' };
        }
      }
      return (
        <Grid key={todo.id}>
          <Card data-testid={todo.content} style={{marginTop:10, backgroundColor: color}}>
            <ListItemButton component="a" href="#simple-list">
              <Checkbox style={{paddingLeft:0}} color="primary" onClick={() => deleteTodo(todo.id)}/>
              <ListItemText primary={<span style={textStyle}>{todo.content}</span>} secondary={<span style={textStyle}>{todo.due}</span>}/>
            </ListItemButton>
          </Card>
        </Grid>
      );
    })
  ) : (
    <p>You have no todo's left </p>
  );
  // Lastly, return the todoList constant that we created above to show all of the items on the screen.
  return (
    <div className="todoCollection" style={{ padding: "10px" }}>
      {todoList}
    </div>
  );
};

export default Todos;
