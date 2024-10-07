import React from "react";

export default function Todolist({ todos, setTodos, setEditTodo }) {
  const loggedinuser = JSON.parse(sessionStorage.getItem("user"));

  const handleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );

    fetch(`http://localhost:8000/todolist/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todos.find((t) => t.id === id).completed,
      }),
    }).then(() => {
      fetchData();
    });
  };

  const handleEdit = (id) => {
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);
  };

  const handleDelete = (id) => {
    let c = window.confirm("Are you sure you want to delete this item?");
    if (c) {
      setTodos(todos.filter((todo) => todo.id !== id));

      fetch(`http://localhost:8000/todolist/${id}`, {
        method: "DELETE",
      }).then(() => {
        fetchData();
      });
    }
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

  return (
    <div className="container mt-4">
      {todos.map((todo) => (
        <div className="row mb-3 align-items-center" key={todo.id}>
          <div className="col">
            <input
              type="text"
              value={todo.task}
              className={`form-control ${
                todo.completed ? "text-decoration-line-through" : ""
              }`}
              readOnly
            />
          </div>
          <div className="col-auto py-2">
            <button
              className={`btn ${
                todo.completed ? "btn-secondary" : "btn-success"
              } me-2`}
              onClick={() => handleComplete(todo.id)}
            >
              {todo.completed ? (
                <i className="fas fa-undo"></i>
              ) : (
                <i className="fas fa-check"></i>
              )}
            </button>
            <button
              className="btn btn-primary me-2"
              onClick={() => handleEdit(todo.id)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(todo.id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
