import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Form({ todos, setTodos, setEditTodo, editTodo }) {
  const [input, setInput] = useState("");
  const loggedinuser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.task || "");
    } else {
      setInput("");
    }
  }, [editTodo]);

  function onInputChange(e) {
    setInput(e.target.value);
  }

  const updateTodo = (title, id, completed, userid) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task: title } : todo
    );
    setTodos(newTodos);
    fetch(`http://localhost:8000/todolist/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: title }),
    }).then(() => {
      fetchData();
    });
    setEditTodo(null);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/todolist");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const userdata = data.filter((d) => d.userid === loggedinuser.id);
      setTodos(userdata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function onFormSubmit(e) {
    e.preventDefault();
    if (!editTodo) {
      if (input.trim()) {
        const newTodo = {
          id: uuidv4(),
          task: input,
          completed: false,
          userid: loggedinuser.id,
        };

        fetch(`http://localhost:8000/todolist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        }).then(() => {
          fetchData();
        });

        setInput("");
      } else {
        alert("Input cannot be empty");
        setInput("");
      }
    } else {
      updateTodo(input, editTodo.id, editTodo.completed, editTodo.userid);
    }
  }

  return (
    <form onSubmit={onFormSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter todo..."
          className="form-control py-3"
          value={input}
          onChange={onInputChange}
          required
        />
        <button className="btn btn-primary" type="submit">
          {editTodo ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
