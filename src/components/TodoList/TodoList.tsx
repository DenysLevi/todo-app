import { Button } from "@mui/material";
import TodoItem from "./TodoItem/TodoItem";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useState } from "react";
import EmptyList from "../EmptyList/EmptyList";

export type TTask = {
  id: string;
  title: string;
  isDone: boolean;
  description: string;
};

export type TTodoItem = {
  title: string;
  isDone: boolean;
  id: string;
  tasks: TTask[];
};

const TodoList = () => {
  const [todoItems, setTodoItems] = useState(() => {
    const todos = localStorage.getItem("todos");
    return todos ? (JSON.parse(todos) as TTodoItem[]) : [];
  });

  // useEffect(() => {
  //   const getTodos = async () => {
  //     try {
  //       const todos = await getDocs(collection(db, "todos"));

  //       const newData = todos.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }))[0].items;

  //       setTodoItems(newData);
  //       console.log(newData);
  //     } catch (error: any) {
  //       console.log(error?.message);
  //     }
  //   };

  //   getTodos();
  // }, []);

  // const updateTodo = async () => {
  //   try {
  //     await todoActions.updateTodo({
  //       id: crypto.randomUUID(),
  //       isDone: false,
  //       title: "some title",
  //       description: "small description",
  //     });
  //   } catch (error: any) {
  //     console.error(error?.message);
  //   }
  // };

  const onClickAddTodo = useCallback(() => {
    setTodoItems([
      ...todoItems,
      {
        title: "New list",
        isDone: false,
        id: crypto.randomUUID(),
        tasks: [],
      },
    ]);
  }, [todoItems]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <div className="px-10">
      <div className="p-5">
        <Button
          onClick={onClickAddTodo}
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Add Todo
        </Button>
      </div>
      <table className="table-auto bg-white rounded-xl w-full">
        <tbody>
          {todoItems.map((todo) => (
            <TodoItem
              key={todo.id}
              item={todo}
              todoItems={todoItems}
              updateTodoItems={setTodoItems}
            />
          ))}
        </tbody>
      </table>

      {!todoItems.length && <EmptyList />}
    </div>
  );
};

export default TodoList;
