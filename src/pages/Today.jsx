import { useSelector } from "react-redux";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Welcome from "./Welcome";
import Greeting from "../components/Greeting";
import { useNavigate } from "react-router-dom";

export default function Today() {
  const navigation = useNavigate();
  const todayTodos = useSelector((state) =>
    state.todo.todos.filter((todo) => todo.day === "today")
  );
  const isOpen = useSelector((state) => state.todoForm.isOpen);
  if (!isOpen && todayTodos.length === 0) {
    navigation("/welcome");
  }
  return (
    <div className="w-full min-h-screen mx-auto bg-gray-100">
      {todayTodos.length > 0 && <Greeting />}
      {!isOpen && todayTodos.length === 0 && <Welcome />}
      {todayTodos.length === 0 && isOpen && <TodoForm day={"today"} />}
      {todayTodos.length > 0 && <TodoList Todos={todayTodos} day={"today"} />}
      {isOpen && <TodoForm day={"today"} />} {/* Corrected line */}
    </div>
  );
}
