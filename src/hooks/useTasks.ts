import { Dispatch, SetStateAction, useCallback } from "react";
import { TTodoItem } from "../components/TodoList/TodoList";

type TUseTodosParams = {
  todoItems: TTodoItem[];
  updateTodoItems: Dispatch<SetStateAction<TTodoItem[]>>;
};

export const useTasks = ({ todoItems, updateTodoItems }: TUseTodosParams) => {
  const onClickAddTask = useCallback(
    (id: string) => {
      updateTodoItems([
        ...todoItems.map((todo) => ({
          ...(todo.id === id
            ? {
                ...todo,
                tasks: [
                  ...todo.tasks,
                  {
                    title: "new task",
                    description: "description",
                    isDone: false,
                    id: crypto.randomUUID(),
                  },
                ],
              }
            : todo),
        })),
      ]);
    },
    [todoItems]
  );

  const onClickDoneTask = useCallback(
    (todoId: string, taskId: string) => {
      updateTodoItems([
        ...todoItems.map((todo) => ({
          ...(todo.id === todoId
            ? {
                ...todo,
                tasks: [
                  ...todo.tasks.map((task) =>
                    task.id === taskId
                      ? { ...task, isDone: !task.isDone }
                      : task
                  ),
                ],
              }
            : todo),
        })),
      ]);
    },
    [todoItems]
  );

  const onClickDeleteTask = useCallback(
    (todoId: string, taskId: string) => {
      updateTodoItems([
        ...todoItems.map((todo) => ({
          ...(todo.id === todoId
            ? {
                ...todo,
                tasks: [...todo.tasks.filter((task) => task.id !== taskId)],
              }
            : todo),
        })),
      ]);
    },
    [todoItems]
  );

  const onChangeTaskTitle = useCallback(
    (value: string, id: string, taskId: string) => {
      updateTodoItems([
        ...todoItems.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                tasks: [
                  ...todo.tasks.map((task) =>
                    task.id === taskId ? { ...task, title: value } : task
                  ),
                ],
              }
            : todo
        ),
      ]);
    },
    [todoItems]
  );

  const onChangeTaskDescription = useCallback(
    (value: string, id: string, taskId: string) => {
      updateTodoItems([
        ...todoItems.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                tasks: [
                  ...todo.tasks.map((task) =>
                    task.id === taskId ? { ...task, description: value } : task
                  ),
                ],
              }
            : todo
        ),
      ]);
    },
    [todoItems]
  );

  return {
    onClickAddTask,
    onClickDoneTask,
    onChangeTaskTitle,
    onChangeTaskDescription,
    onClickDeleteTask,
  };
};
