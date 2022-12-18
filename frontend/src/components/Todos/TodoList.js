import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Container, Card } from "reactstrap";

const TodoList = () => {

  const [todo, setTodo] = useState([]);

  const fetchTodosData = async () => {
    const res = await axios.get("/getTodos");
    if (res.data.todos.length >= 0) {
    setTodo(res.data.todos);
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, [todo]);


  const handleEdit = async (todo) => {
    const todoTitle = prompt("Enter new Title");
    const todoTask = prompt("Enter new Task");

    if (!todoTitle || !todoTask) {
      alert("Please enter both field");
    } else {
      const res = await axios.put(`/editTodo/${todo._id}`, {
        ...todo,
        title: todoTitle,
        tasks: todoTask,
      });
      console.log(res);
      fetchTodosData();
    }
  };

  const handleDelete = async (todoId) => {
    const canDelete = window.confirm("Are your Sure?");
    if (canDelete) {
      const res = await axios.delete(`/deleteTodo/${todoId}`);
      console.log(res);
      fetchTodosData();
    }
  };

  // const taskCompleted = async (todo) => {
  //   const res = await axios.put(`/taskCompleted/${todo._id}`);
  //   console.log(res); 
  // }

  return (
    <>
      <Container>
        <Card className="border border-2 border-warning">
          {/* <CardBody> */}
          <div className="d-flex justify-content-around mb-4 mt-2">
          <div style={{ width: "25rem" }} className="mx-5">
              <h3>Completed</h3>
            </div>
            <div style={{ width: "25rem" }}>
              <h3>Title</h3>
            </div>
            <div style={{ width: "25rem" }}>
              <h3>Task</h3>
            </div>
            <div style={{ width: "25rem" }}>
              <h3>Status</h3>
            </div>
          </div>
          {/* </CardBody> */}
        </Card>
      </Container>
      { todo && todo.length > 0 ? (
        todo.map((todo) => (
          <Container key={todo._id}>
            <Card className="border border-2 border-warning mt-1">
              {/* <CardBody> */}
              <div className="d-flex justify-content-around mt-2" key={todo._id}>
              <div style={{ width: "25rem" }} className="mx-5">
              <input class="form-check-input mx-4" type="checkbox" id="flexCheckChecked" />
                </div>
                <div className="mt-2" style={{ width: "25rem" }}>
                  <h4>{todo.title}</h4>
                </div>
                <div  className="mt-2" style={{ width: "25rem" }}>
                  <h4>{todo.tasks}</h4>
                </div>
                <div style={{ width: "25rem" }}>
                  <button
                    className="btn btn-secondary sm:col-12 mx-3"
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger sm:col-12"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* </CardBody> */}
            </Card>
          </Container>
        ))
      ) : (
        <Container  style={{ width: "18rem" }}>
          <Card className="border border-2 border-warning mt-2 text-center">No data to todos, add one!</Card>
        </Container>
      )
      }
    </>
  );
};

export default TodoList;
