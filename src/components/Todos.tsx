import React, { useEffect, useState } from "react";
import { ref, onValue, db } from "../firebase";

const Todos = () => {
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const query = ref(db, "todos");
    return onValue(query, (snapshot) => {
      const data: { [id: string]: string } = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((project: string) => {
          setTodos((projects) => [...projects, project]);
        });
      }
    });
  }, []);

  console.log({ todos });
  return <div>Todo</div>;
};

export default Todos;
