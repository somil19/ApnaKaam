/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/Todo/todoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faSquarePlus, faBell } from "@fortawesome/free-solid-svg-icons";
import clockSound from "../assets/alarm-sound.mp3";
import cute from "../assets/cute.mp3";
import { nanoid } from "@reduxjs/toolkit";
import {
  closeForm,
  setNotification,
  setNotificationTime,
  setTodoTitle,
} from "../features/Todo/todoFormSlice";
const alarmSound = new Audio(cute);
export default function TodoForm({ day }) {
  const [title, setTitle] = useState("");
  const [dueReminder, setDueReminder] = useState("");
  const [showRemBtn, setShowRemBtn] = useState(true);
  const [priority, setPriority] = useState(false);
  const [category, setCategory] = useState("work");
  const [notes, setNotes] = useState("");

  const dispatch = useDispatch();
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  function handleAddTodo(e) {
    e.preventDefault();
    alarmSound.play();
    dispatch(
      addTodo({
        id: nanoid(),
        day: day,
        title: title,
        completed: false,
        reminder: dueReminder,
        priority: priority,
        date: new Date().toLocaleDateString("en-US", options),
        notes: notes,
        category: category,
      })
    );
    dispatch(closeForm());
    setTitle("");
    setDueReminder("");
    setCategory("");
    setNotes("");
    scheduleReminder(dueReminder);
  }

  const handlePriority = () => {
    setPriority((priority) => !priority);
  };
  const scheduleReminder = (reminderDateTime) => {
    const reminderTime = new Date(reminderDateTime).getTime();
    const currentTime = new Date().getTime();
    const timeUntilReminder = reminderTime - currentTime;
    const newTime = new Date(reminderDateTime);

    // Get hours and minutes from the date
    const hours = newTime.getHours();
    const minutes = newTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formatedTime = `${hours}:${minutes}${ampm}`;
    dispatch(setTodoTitle(title));
    dispatch(setNotificationTime(formatedTime));
    if (timeUntilReminder > 0) {
      setTimeout(() => {
        dispatch(setNotification());
        playAlarmSound();
      }, timeUntilReminder);
    }
  };

  const playAlarmSound = () => {
    const alarmSound = new Audio(clockSound);
    alarmSound.play();
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex  items-center justify-center z-50 `}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-4">
        <div className="flex items-center justify-between py-6">
          <h2 className="text-2xl font-bold text-gray-800">Add a new todo</h2>
          <FontAwesomeIcon
            icon={priority ? solidStar : regularStar}
            size="2x"
            onClick={handlePriority}
            style={{ color: "gold", cursor: "pointer" }}
          />
        </div>
        <div className="flex flex-col space-y-2 w-1/3">
          {" "}
          <span
            className={` text-center rounded-full border border-gray-300  px-2 py-2 text-sm font-semibold mx-2 `}
          >
            Tags
          </span>
          <div>
            {priority && <Tag text={"priority"} />}
            {category && <Tag text={`${category}`} />}
          </div>
        </div>
        <form onSubmit={handleAddTodo} className="space-y-4 ">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              placeholder="I want to ..."
            />
          </div>
          <div className="flex items-center space-x-4">
            {showRemBtn ? (
              <button
                className="bg-red-400 text-black px-4 py-2 rounded-full hover:bg-red-300 w-full focus:ring-3 focus:ring-red-500"
                onClick={() => setShowRemBtn(false)}
              >
                Remind Me at..
                <FontAwesomeIcon
                  icon={faBell}
                  size="1x"
                  style={{ marginLeft: "5px", color: "purple" }}
                  shake={true}
                />
              </button>
            ) : (
              <>
                <label htmlFor="category" className="text-gray-600">
                  Add Date and Time
                </label>
                <input
                  type="datetime-local"
                  id="dueDate"
                  name="dueDate"
                  value={dueReminder || ""}
                  onChange={(e) => setDueReminder(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{
                    // Style the calendar picker indicator
                    WebkitAppearance: "none", // Disable default appearance
                    appearance: "none",
                    paddingLeft: "0.5rem", // Adjust padding to prevent overlap with the indicator
                    color: "black",
                    backgroundColor: "lightblue",
                  }}
                />
                <button
                  onClick={() => setShowRemBtn(true)}
                  className="bg-gray-200 px-2 py-1 rounded-full"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="category" className="text-gray-600">
              Add Tags
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="grocery">Grocery List</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label htmlFor="notes" className="text-gray-600">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => dispatch(closeForm())}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FontAwesomeIcon
                icon={faSquarePlus}
                style={{ marginRight: "5px" }}
                size="2x"
              />
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Tag = ({ text }) => {
  let bgColor;
  switch (text) {
    case "priority":
      bgColor = "bg-yellow-400";
      break;
    case "personal":
      bgColor = "bg-red-400";
      break;
    case "work":
      bgColor = "bg-blue-400";
      break;
    case "grocery":
      bgColor = "bg-green-400";
      break;
  }
  return (
    <span
      className={`  rounded-full ${bgColor}  px-3 py-1 text-sm font-semibold mx-2 `}
    >
      {text}
    </span>
  );
};
