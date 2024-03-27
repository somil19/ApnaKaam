/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "../features/Todo/todoSlice";
import UpdateForm from "../components/updateForm";
import delSound from "../assets/delete.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePen,
  faMagnifyingGlass,
  faPlusCircle,
  faTrashAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { closeUpdateForm, openForm } from "../features/Todo/todoFormSlice";

import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import CheckBox from "../ui/CheckBox";
import Notification from "../ui/Notification";
const deleteSound = new Audio(delSound);
export default function TodoList({ todayTodos, day }) {
  const isUpdateForm = useSelector((state) => state.todoForm.isUpdateForm);
  const showNotification = useSelector(
    (state) => state.todoForm.showNotification
  );
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState(null); // State to store selected todo
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [sortBy, setSortBy] = useState("aplhabetical"); // State to store sort by option

  const todosLength = todayTodos.length;

  const filteredTodos = todayTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleUpdateTodo = (todo) => {
    setSelectedTodo(todo); // Set the selected todo when update button is clicked
    dispatch(closeUpdateForm());
  };

  function handleDeteleTodo(id) {
    dispatch(removeTodo(id));
    deleteSound.play();
  }
  const sortTodos = (a, b) => {
    if (sortBy === "priority") {
      return b.priority - a.priority;
    } else if (sortBy === "incompleted") {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    } else if (sortBy === "completed") {
      return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
    } else if (sortBy === "aplhabetical") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "inputOrder") {
      return a.id - b.id; // Compare based on original input order
    }
    // Add more sorting criteria if needed
    return 0;
  };
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col justify-start items-center ">
      <h1 className="text-xl items-left md:text-2xl font-semibold capitalize mt-4  ">
        Your {day}&apos;s Kaam
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-baseline w-full md:w-1/2 mt-6 justify-center ">
        {" "}
        <label
          className="text-gray-700 md:mr-4 md:text-right"
          htmlFor="sort-by"
        >
          {" "}
          Sort By{" "}
        </label>{" "}
        <select
          className="md:mr-4  px-4 py-2 md:w-1/3 rounded-md bg-gradient-to-br from-red-200 to-red-300 focus:outline-none focus:ring-2 focus:ring-blue-300 w-2/5"
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {" "}
          <option value="alphabetical">Alphabetical </option>{" "}
          <option value="priority">Priority</option>{" "}
          <option value="completed">Completed</option>{" "}
          <option value="incompleted">Uncompleted</option>{" "}
          <option value="inputOrder">Input Order</option>{" "}
        </select>{" "}
        <div className="flex w-3/4 md:w-1/2 mt-4 items-center placeholder:items-start rounded-full bg-gradient-to-br from-blue-300 to-blue-200">
          {" "}
          <input
            className=" px-4 py-2 placeholder-gray-500 w-full bg-gradient-to-br from-blue-300 to-blue-200 rounded-full outline-none focus:bg-gradient-to-br focus:from-blue-200"
            placeholder="Search your todos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />{" "}
          {searchQuery ? (
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => setSearchQuery("")}
              className="mr-4 pl-2 cursor-pointer"
            />
          ) : (
            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-4 pl-2" />
          )}
        </div>
      </div>
      <ul className="list-none w-full md:w-1/2 ">
        {" "}
        {todosLength > 0 ? (
          filteredTodos.sort(sortTodos).map((todo) => (
            <li
              className={`mt-4  flex flex-col md:flex-row justify-between items-center bg-gray-50  px-4 py-2 rounded-lg shadow-md transition-transform ease-out duration-100 transform hover:translate-x-1`}
              key={todo.id}
            >
              {" "}
              <div className="flex items-center">
                {" "}
                {/* Checkbox */} <CheckBox id={todo.id} day={day} />{" "}
                {/* Title */}{" "}
                <div
                  className={`${
                    todo.completed ? "line-through text-gray-400" : ""
                  } font-medium text-gray-800 dark:text-white ml-4`}
                >
                  {" "}
                  {todo.title}{" "}
                </div>{" "}
                {todo.priority ? (
                  <FontAwesomeIcon
                    icon={solidStar}
                    style={{ color: "gold" }}
                    className="ml-2"
                  />
                ) : (
                  " "
                )}
              </div>{" "}
              <div className="flex items-center md:ml-4 mt-4 md:mt-0">
                {" "}
                {/* Date style "Thursday, February 25, 2024, 11:37:01 AM". */}{" "}
                <div className="text-gray-500 dark:text-gray-400">
                  {" "}
                  {todo.date}{" "}
                </div>{" "}
                {/* Update button */}{" "}
                <button
                  onClick={() => handleUpdateTodo(todo)}
                  className="text-gray-500  bg-blue-100  border border-gray-100 py-1 px-3 focus:outline-none hover:bg-blue-200 ml-4 rounded-lg"
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faFilePen}
                    size="lg"
                    style={{ color: "gray" }}
                  />{" "}
                </button>{" "}
                {/* Delete button */}{" "}
                <button
                  onClick={() => handleDeteleTodo(todo.id)}
                  className="text-gray-500  bg-red-200  border border-gray-100  py-1 px-3 focus:outline-none hover:bg-red-300  ml-2 md:ml-4 rounded-lg "
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    size="lg"
                    style={{ color: "gray" }}
                  />{" "}
                </button>{" "}
              </div>{" "}
            </li>
          ))
        ) : (
          <li className="mt-8 flex items-center justify-center">
            {" "}
            <button
              onClick={() => dispatch(openForm())}
              className="text-white flex items-center justify-center bg-green-500 hover:bg-green-600 w-full md:w-1/3 py-3 rounded-lg"
            >
              {" "}
              <span className="text-md">Add Your First Todo</span>{" "}
              <FontAwesomeIcon icon={faPlusCircle} size="lg" className="ml-2" />{" "}
            </button>{" "}
          </li>
        )}{" "}
        {todosLength >= 1 && (
          <li className="mt-8 flex items-center justify-center">
            {" "}
            <button
              onClick={() => dispatch(openForm())}
              className="text-white flex items-center justify-center bg-green-500 hover:bg-green-600 w-full md:w-1/3 py-3 rounded-lg"
            >
              {" "}
              <span className="text-md">Add More Todo's</span>{" "}
              <FontAwesomeIcon icon={faPlusCircle} size="lg" className="ml-2" />{" "}
            </button>{" "}
          </li>
        )}
      </ul>
      {selectedTodo && !isUpdateForm && (
        <UpdateForm todoToUpdate={selectedTodo} />
      )}
      {showNotification && <Notification title={todayTodos.title} />}
    </div>
  );
}
