import { writable } from 'svelte/store';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import type TaskEntity from '../models/entity/TaskEntity';

const todos = writable<TaskEntity[]>([]);

const loadTodos = async () => {
  const querySnapshot = await getDocs(collection(db, "todos"));
  const loadedTodos = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      description: data.description,
      done: data.done
    };
  });
  todos.set(loadedTodos);
};

const addTodo = async (task: TaskEntity) => {
  const docRef = await addDoc(collection(db, "todos"), task);
  todos.update(current => [...current, { ...task, id: docRef.id }]);
};

const removeTodo = async (id: string) => {
  await deleteDoc(doc(db, "todos", id));
  todos.update(current => current.filter(todo => todo.id !== id));
};

const updateTodo = async (id: string, updatedTask: TaskEntity) => {
  await updateDoc(doc(db, "todos", id), { ...updatedTask });
  todos.update(current => current.map(todo => todo.id === id ? { ...updatedTask, id } : todo));
};

export { todos, loadTodos, addTodo, removeTodo, updateTodo };
