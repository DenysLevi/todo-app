import { Dispatch, SetStateAction, useCallback } from "react";
import { TTodoItem } from "../components/TodoList/TodoList";

type TUseTodosParams = {
  todoItems: TTodoItem[];
  updateTodoItems: Dispatch<SetStateAction<TTodoItem[]>>;
};

export const useTodos = ({ todoItems, updateTodoItems }: TUseTodosParams) => {
  const onClickDeleteTodo = useCallback(
    (id: string) => {
      updateTodoItems([...todoItems.filter((todo) => todo.id !== id)]);
    },
    [todoItems]
  );

  const onClickDoneTodo = useCallback(
    (id: string) => {
      updateTodoItems([
        ...todoItems.map((todo) => ({
          ...(todo.id === id ? { ...todo, isDone: !todo.isDone } : todo),
        })),
      ]);
    },
    [todoItems]
  );

  const onChangeTodoTitle = useCallback(
    (value: string, id: string) => {
      updateTodoItems([
        ...todoItems.map((todo) =>
          todo.id === id ? { ...todo, title: value } : todo
        ),
      ]);
    },
    [todoItems]
  );

  return {
    onClickDoneTodo,
    onChangeTodoTitle,
    onClickDeleteTodo,
  };
};
