import Header from "../Header";
import Form from "./Form";
import { useEffect, useState } from "react";
import Todolist from "./Todolist";

function UserPage() {
  const [input, setInput] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [usertodo, setusertodo] = useState([]);
  const loggedinuser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (loggedinuser) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:8000/todolist");
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          const userdata = data.filter((d) => d.userid === loggedinuser.id);
          setusertodo(userdata);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);
  {
    if (loggedinuser) {
      return (
        <>
          <div>
            <Header />
          </div>
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-12">
                <Form
                  input={input}
                  setInput={setInput}
                  todos={usertodo}
                  setTodos={setusertodo}
                  setEditTodo={setEditTodo}
                  editTodo={editTodo}
                />
              </div>
              <div className="col-md-12">
                <Todolist
                  todos={usertodo}
                  setTodos={setusertodo}
                  setEditTodo={setEditTodo}
                />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <div>user not found!!!</div>;
    }
  }
}

export default UserPage;
