import logo from './logo.svg';
import './App.css';
import React from "react";
import { Button, Card, Form } from 'react-bootstrap';
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Axios from "axios";
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdDone } from 'react-icons/md'

const gitHubUrl = "http://localhost:3000/get_items";

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div
      className="todo"

    >
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      console.log("empty value");
      return;
    }
    else {
      console.log("non-empty value");
    }

    const payload = {
      // id: 111,
      title: value,
      isDone: false,
    }
    axios({
      method: 'post',
      url: 'http://localhost:3000/post_item',
      data: payload, // you are sending body instead
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    // setValue("");
    window.location.reload();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label><b>Add Todo</b></Form.Label>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo" />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
    </Button>
    </Form>
  );
}

function App() {
  // const [userData, setUserData] = useState({});

  const [Data, setData] = useState({
    title: '',
    isDone: false
  })
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await Axios.get(
      gitHubUrl
    );
    const products = data;
    setTodos(products);
    console.log(products);
  };

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  function removeItem(id) {
    console.log('remove called', id);
    const payload = {
      id: id,
    }
    axios({
      method: 'post',
      url: 'http://localhost:3000/remove_item',
      data: payload, // you are sending body instead
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    // setValue("");
    window.location.reload();
  }

  function updateItem(id) {
    console.log('update called', id);
    const payload = {
      id: id,
    }
    axios({
      method: 'post',
      url: 'http://localhost:3000/update_item',
      data: payload, // you are sending body instead
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    window.location.reload();
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo) => (
            <Card>
              <Card.Body className="card_body">
                {todo.isDone ? (
                  <p className="crossed_line" key={todo.id}>{todo.title}</p>
                ) : (
                  <p key={todo.id}>{todo.title}</p>
                )}
                <div>
                  <MdDone className="margin_right" onClick={() => updateItem(todo.id)}></MdDone>
                  <RiDeleteBin6Line onClick={() => removeItem(todo.id)}></RiDeleteBin6Line>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
