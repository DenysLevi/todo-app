import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TTodoItem } from "../components/TodoList/TodoList";

const updateTodo = async (todo: TTodoItem) => {
  return await updateDoc(doc(db, "todos", "items"), {
    items: arrayUnion(todo),
  });
};

export const todoActions = {
  updateTodo,
};
