import { useSelector } from "react-redux";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

export default function Tomorrow() {
  const tommorrowTodos = useSelector((state) =>
    state.todo.todos.filter((todo) => todo.day === "tomorrow")
  );
  const isOpen = useSelector((state) => state.todoForm.isOpen);

  return (
    <div className="w-full min-h-screen mx-auto">
      {isOpen && tommorrowTodos.length === 0 && <TodoForm day={"tomorrow"} />}
      {isOpen && <TodoForm day={"tomorrow"} />}
      <TodoList Todos={tommorrowTodos} day={"tomorrow"} />
    </div>
  );
}
