import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Real-time listener for todos
  useEffect(() => {
    const todosRef = collection(db, 'todos');
    const q = query(todosRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const todosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          completed: doc.data().completed,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        setTodos(todosData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching todos:', err);
        setError('Failed to load todos');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Add a new todo
  const addTodo = async (title: string) => {
    try {
      await addDoc(collection(db, 'todos'), {
        title,
        completed: false,
        createdAt: Timestamp.now(),
      });
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo');
      throw err;
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        completed: !todo.completed,
      });
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError('Failed to update todo');
      throw err;
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    try {
      const todoRef = doc(db, 'todos', id);
      await deleteDoc(todoRef);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo');
      throw err;
    }
  };

  // Update todo title
  const updateTodo = async (id: string, title: string) => {
    try {
      const todoRef = doc(db, 'todos', id);
      await updateDoc(todoRef, {
        title,
      });
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo');
      throw err;
    }
  };

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  };
}
